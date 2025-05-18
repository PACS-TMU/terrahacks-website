import { subscribeToNewsletterAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";

export default async function NewsletterPage({ 
  searchParams 
}: { 
  searchParams: Promise<Message> 
}) {
  const message = await searchParams;
  
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Newsletter</h1>
        
        <form className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email_address">Email Address</Label>
            <Input
              type="email"
              id="email_address"
              name="email_address"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Your first name"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Your last name"
              required
            />
          </div>
          
          <SubmitButton formAction={subscribeToNewsletterAction}>
            Subscribe
          </SubmitButton>
          
          <FormMessage message={message} />
        </form>
      </div>
    </div>
  );
}