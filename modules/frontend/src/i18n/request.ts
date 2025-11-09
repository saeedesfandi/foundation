import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "fa"; // Set your default locale here (or dynamically from cookies/headers if needed)

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default, // Adjust path to your translation files
  };
});

// export default getRequestConfig(async ({ locale }) => ({
//   messages: (await import(`./messages/${locale}.json`)).default,
// }));
