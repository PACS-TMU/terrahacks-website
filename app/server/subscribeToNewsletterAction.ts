"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

export async function subscribeToNewsletterAction(formData: FormData) {
  const email = formData.get("email_address")?.toString();
  const first = formData.get("first_name")?.toString();
  const last = formData.get("last_name")?.toString();

  if (!email || !first || !last) {
    encodedRedirect("error", "/newsletter", "All fields are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter").insert([{
    email_address: email,
    first_name: first,
    last_name: last,
  }]);

  if (error?.code === "23505") { // unique violation - duplicate email
    encodedRedirect("error", "/newsletter", "You've already subscribed!");
  } else if (error) {
    console.error(error);
    encodedRedirect("error", "/newsletter", "Unexpected error.");
  }

  encodedRedirect("success", "/newsletter", "Thanks for subscribing!");
}
