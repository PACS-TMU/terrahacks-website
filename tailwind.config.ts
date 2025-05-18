import type { Config } from "tailwindcss";

const config = {
  extend: [
    {
      colors: {
        background: "#fafafa",
        foreground: "#1e1e1e",
      }
    }
  ]
} satisfies Config;

export default config;
