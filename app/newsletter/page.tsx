import { subscribeToNewsletterAction } from "@/server/subscribe-to-newsletter";
import { Message, FormMessage } from "@/components/form/form-message";
import InputField from "@/components/newsletter/input-field";
import { SubmitButton } from "@/components/form/submit-button";
import Image from "next/image";
import Footer from "@/components/footer";

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;

  let message: Message | null = null;
  if (params.success) {
    message = { success: decodeURIComponent(params.success) };
  } else if (params.error) {
    message = { error: decodeURIComponent(params.error) };
  }

  return (
    <section className="relative w-full min-h-[95vh] overflow-hidden flex flex-col items-center justify-center px-4 pt-24 md:pt-32 lg:pt-40">
      {/* Background image */}

      <Image
        fill
        src={`/assets/background.png`}
        alt="TerraHacks background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full max-w-xl bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-xl px-6 md:px-10 py-10 flex flex-col gap-6">
        <h1 className="font-semibold text-center text-2xl md:text-3xl lg:text-4xl text-gray-800">
          Dig into our Newsletter
        </h1>

        <form action={subscribeToNewsletterAction} className="flex flex-col gap-y-4">
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
          >
            Dig in!
          </SubmitButton>

          <FormMessage message={message ?? undefined} />
        </form>
      </div>
      <Footer />
    </section>
  );
}
