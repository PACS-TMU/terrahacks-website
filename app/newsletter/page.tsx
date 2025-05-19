import { subscribeToNewsletterAction } from "@/app/server/subscribeToNewsletterAction";
import { FormMessage, Message } from "@/components/form/form-message";
import { SubmitButton } from "@/components/form/submit-button";
import InputField from "@/components/newsletter/input-field";


export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;

  return (
    <div className="w-[90%] md:w-4/5 max-w-[768px] mx-auto bg-gray-200 rounded-lg flex flex-col gap-6 px-4 md:px-8 lg:px-12 py-10 mt-12 md:mt-24 justify-center">
      <h1 className="font-semibold text-center text-xl md:text-2xl lg:text-3xl mb-4">
        Dig into our Newsletter
      </h1>
      
      <form className="flex flex-col gap-y-4">
        {/* Email Address input field */}
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

        {/* First Name input field */}
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
        
        {/* Last Name input field */}
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

        {/* Submit Button */}
        <SubmitButton 
          className="text-base lg:text-lg mx-auto w-4/5 md:w-3/5 lg:w-2/5 font-semibold text-background bg-green-600 hover:bg-green-700 ease-in-out duration-300"
          pendingText="Digging..."
          formAction={subscribeToNewsletterAction}
        >
          Dig in!
        </SubmitButton>

        {/* Form Message - for error handling */}
        <FormMessage message={message} />
      </form>
    </div>
  );
}
