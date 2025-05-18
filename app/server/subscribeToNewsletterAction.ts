"use server"

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";

export const subscribeToNewsletterAction = async (formData: FormData) => {
    "use server";
    
    const emailAddress = formData.get("email_address")?.toString();
    const firstName = formData.get("first_name")?.toString();
    const lastName = formData.get("last_name")?.toString();
    const supabase = await createClient();
    
    if (!emailAddress || !firstName || !lastName) {
      return encodedRedirect(
        "error",
        "/newsletter",
        "All fields are required."
      );
    }
    
    try {
      // Insert into NEWSLETTER table
      const { error } = await supabase
        .from("newsletter")
        .insert([{ 
          email_address: emailAddress, 
          first_name: firstName,
          last_name: lastName
        }]);
        
      if (error) {
        if (error.code === "23505") { // Unique violation error code
          return encodedRedirect(
            "error", 
            "/newsletter", 
            "You've already subscribed!"
          );
        }
        console.error("Supabase error:", error);
        throw error;
      }
      
      return encodedRedirect(
        "success",
        "/newsletter",
        "Thanks for subscribing to our newsletter!"
      );
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      return encodedRedirect(
        "error",
        "/newsletter",
        "Failed to subscribe. Please try again."
      );
    }
  };