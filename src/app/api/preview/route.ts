import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  const url = searchParams.get("url");
  const status = searchParams.get("status");

  const slug =
    searchParams.get("slug") ?? process.env.STRAPI_HOME_SLUG ?? "home";
  console.log(`Status: ${status}`);
  if (secret != process.env.STRAPI_PREVIEW_SECRET ) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  if (status === "published") {
    console.log("➡️ DISABLE preview mode");
    draft.disable();
  } else if (status === "draft") {
    console.log("➡️ ENABLE preview mode");
    draft.enable();
  }

  // Можно сохранить slug в query, если вдруг используешь в рендере
  return Response.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/`, 307);
}
