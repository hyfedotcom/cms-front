import { NextRequest, NextResponse } from "next/server";
import { getOrUploadToBlob } from "src/lib/server/blob-internal";

export const runtime = "nodejs"; // важно: не edge, нужен Node для @vercel/blob

export async function GET(req: NextRequest) {
  const src = new URL(req.url).searchParams.get("src");
  if (!src) return NextResponse.json({ error: "Missing src" }, { status: 400 });

  try {
    const url = await getOrUploadToBlob(src);

    return NextResponse.json({ url });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json(
      { error: err?.message || "Blob op failed", url: "" },
      { status: 502 }
    );
  }
}
