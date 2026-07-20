export const dynamic = "force-static";

export function GET() {
  return new Response(
    "# Add your Google AdSense publisher line after account verification.\n",
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    },
  );
}
