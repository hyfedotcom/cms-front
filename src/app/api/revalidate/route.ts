import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();
  const model = body.model;
  const entry = body.entry;
  const siteSlug = entry?.site?.slug;

  console.log("📦 Incoming webhook:", body);

  try {
    if (model === "global") {
      console.log(`🌍 Global content updated for site: ${siteSlug}`);
      // ISR revalidation по тегу (если ты кэшируешь по siteSlug)
      revalidateTag(`global-${siteSlug}`);
      return NextResponse.json({ type: "global", site: siteSlug });
    }

    if (model === "page") {
      const pageSlug = entry.slug;
      console.log(`📄 Page updated: ${siteSlug}/${pageSlug}`);
      // ISR revalidation по конкретному пути
      revalidateTag(`page-${siteSlug}/${pageSlug}`);
      return NextResponse.json({
        type: "page",
        site: siteSlug,
        slug: pageSlug,
      });
    }

    return NextResponse.json({ message: "Unhandled model", model });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
