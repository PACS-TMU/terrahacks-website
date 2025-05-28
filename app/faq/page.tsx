import { createClient } from "@/utils/supabase/server";

// Define FAQ type based on the database schema
interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}

export default async function FAQPage() {
  const supabase = await createClient();
  
  // Fetch all FAQs from the database
  const { data: faqs, error } = await supabase
    .from("faq")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching FAQs:", error);
    return (
      <div className="main min-h-screen py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-red-600">
            Error loading FAQs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="main min-h-screen py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-gray-600">No FAQs found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h1>
        
        <p className="text-lg text-center text-gray-600 mb-12">
          Got questions? We've got answers! Here are some common questions about TerraHacks.
        </p>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-100 rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@terrahacks.ca"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              Email Us
            </a>
            <a
              href="#" // Replace with actual Discord link when available
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-colors duration-300"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}