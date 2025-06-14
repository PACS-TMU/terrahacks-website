"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function subscribeToNewsletterAction(formData: FormData) {
  const email = formData.get("email_address")?.toString();
  const first = formData.get("first_name")?.toString();
  const last = formData.get("last_name")?.toString();

  const redirectWithMessage = (type: "success" | "error", message: string) => {
    const encoded = new URLSearchParams({ [type]: message }).toString();
    return redirect(`/newsletter?${encoded}`);
  };

  if (!email || !first || !last) {
    return redirectWithMessage("error", "All fields are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter").insert([
    {
      email_address: email,
      first_name: first,
      last_name: last,
    },
  ]);

  if (error?.code === "23505") {
    return redirectWithMessage("error", "You've already subscribed!");
  } else if (error) {
    console.error(error);
    return redirectWithMessage("error", "Unexpected error.");
  }

  return redirectWithMessage("success", "Thanks for subscribing!");
}
