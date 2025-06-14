export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message?: Message }) {
  if (!message) return null;

  return (
    <div className="flex flex-col gap-2 w-full text-sm md:text-base mt-2 font-medium">
      {"success" in message && (
        <div className="text-foreground bg-green-500/10 border-l-2 border-green-500 rounded-r-md px-4">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-foreground bg-red-500/10 border-l-2 border-red-500 rounded-r-md px-4 animate-[bounce_0.8s_ease-in-out_2.5]">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}