const NEXT_PUBLIC_UMAMI_SCRIPT_URL =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ?? "";
const NEXT_PUBLIC_UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";

export function Analytics() {
  if (!NEXT_PUBLIC_UMAMI_SCRIPT_URL || !NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
    return null;
  }
  return (
    <>
      <script
        defer
        src={NEXT_PUBLIC_UMAMI_SCRIPT_URL}
        data-website-id={NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
    </>
  );
}
