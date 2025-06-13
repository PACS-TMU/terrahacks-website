import Newsletter from "@/components/newsletter/newsletter";
import { Message } from "@/components/form/form-message";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const message = await searchParams;
  return <Newsletter message={message} />;
}
