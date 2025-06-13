"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { subscribeToNewsletterAction } from "@/server/subscribe-to-newsletter";
import { FormMessage, Message } from "@/components/form/form-message";
import { SubmitButton } from "@/components/form/submit-button";
import InputField from "@/components/newsletter/input-field";

interface NewsletterProps {
  message: Message;
}

export default function Newsletter({ message }: NewsletterProps) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const { data } = supabase.storage.from("main").getPublicUrl("Background.png");
    setBackgroundUrl(data.publicUrl);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-4 py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-blue-50 animate-pulse" />
        )}
        {backgroundUrl && (
          <img
            src={backgroundUrl}
            alt="TerraHacks background"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-xl bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-xl px-6 md:px-10 py-10 flex flex-col gap-6">
        <h1 className="font-semibold text-center text-2xl md:text-3xl lg:text-4xl text-gray-800">
          Dig into our Newsletter
        </h1>

        <form className="flex flex-col gap-y-4">
          <InputField
            htmlFor="email_address"
            fieldTitle="Email Address"
            fieldType="email"
            fieldId="email_address"
            fieldName="email_address"
            fieldPlaceholder="Enter your email address"
            fieldRequired={true}
            fieldAutocomplete="email"
          />
          <InputField
            htmlFor="first_name"
            fieldTitle="First Name"
            fieldType="text"
            fieldId="first_name"
            fieldName="first_name"
            fieldPlaceholder="Enter your first name"
            fieldRequired={true}
            fieldAutocomplete="given-name"
          />
          <InputField
            htmlFor="last_name"
            fieldTitle="Last Name"
            fieldType="text"
            fieldId="last_name"
            fieldName="last_name"
            fieldPlaceholder="Enter your last name"
            fieldRequired={true}
            fieldAutocomplete="family-name"
          />
          <SubmitButton
            className="text-base lg:text-lg mx-auto w-4/5 md:w-3/5 font-semibold text-background bg-green-600 hover:bg-green-700 ease-in-out duration-300"
            pendingText="Digging..."
            formAction={subscribeToNewsletterAction}
          >
            Dig in!
          </SubmitButton>

          <FormMessage message={message} />
        </form>
      </div>
    </section>
  );
}
