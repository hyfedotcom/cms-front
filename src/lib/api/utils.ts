import { Button } from "../types/ui/button";

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

export const normalizeCTA = (cta?: Button[]) =>
  (cta ?? []).map((c) => ({
    label: c.label,
    link: c.link,
    type: c.type,
    color: c.color,
    variant: c.variant,
  }));

export const assetsUrl = (raw?: string | null): string | null => {
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  const base = (BASE ?? "").replace(/\/+$/, "");
  const path = raw.replace(/^\/+/, "");
  return `${base}/${path}`;
};

export const normalizeImage = (m?: {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}) => {
  if (!m?.url) return undefined;
  const url = assetsUrl(m.url);
  if (!url) return undefined;

  return {
    url,
    alt: m.alt ?? "",
    width: m.width ?? 0,
    height: m.height ?? 0,
  };
};

export async function normalizeVideo(m?: {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}) {
  if (!m?.url) return undefined;

  // ⚙️ Просто вызываем ensureBlobUrl (оно само решает — SSR это или client)
  const strapiUrl = assetsUrl(m.url) ?? "";

  return {
    url: strapiUrl,
    alt: m.alt ?? "",
    width: m.width ?? 0,
    height: m.height ?? 0,
  };
}

// const blobCache = new Map<
//   string,
//   { url: string; checkedAt: number; exists: boolean }
// >();

// export async function ensureBlobUrl(
//   strapiUrl?: string
// ): Promise<string | undefined> {
//   if (!strapiUrl) return undefined;

//   const fileName = strapiUrl.split("/").pop();
//   const blobUrl = `${process.env.BLOB_READ_URL}${fileName}`;

//   // --- SSR / BUILD ---
//   if (typeof window === "undefined") {
//     // 🚫 никаких fetch — билд-окружение может быть без сети

//     console.warn("⚠️ Skip upload during SSR/build:", fileName);
//     return blobUrl;
//   }

//   // --- Клиент ---
//   // 🚧 Предохранитель: если уже Blob URL — просто вернуть -
//   if (strapiUrl.includes("vercel-storage.com")) {
//     console.log(`🚧 Blob URL : ${strapiUrl}`);
//     return strapiUrl;
//   }

//   const now = Date.now();

//   // Проверяем, есть ли файл в Blob
//   const head = await fetch(blobUrl, { method: "HEAD" }).catch(() => null);
//   const exists = !!head?.ok;

//   if (exists) {
//     blobCache.set(strapiUrl, { url: blobUrl, checkedAt: now, exists: true });
//     console.log("✅ Exists in Blob:", blobUrl);
//     return blobUrl;
//   }

//   // --- Нет в Blob — заливаем заново ---
//   console.log("⬆️ Uploading to Blob:", fileName);
//   try {
//     const res = await fetch(strapiUrl);
//     if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
//     const buffer = await res.arrayBuffer();

//     const blob = await put(fileName!, Buffer.from(buffer), {
//       access: "public",
//       token: process.env.BLOB_READ_WRITE_TOKEN,
//       addRandomSuffix: false,
//       allowOverwrite: false,
//     });

//     blobCache.set(strapiUrl, { url: blob.url, checkedAt: now, exists: true });
//     console.log("✅ Uploaded to Blob:", blob.url);
//     return blob.url;
//   } catch (e: unknown) {
//     const err = e as Error;
//     if (err.message?.includes("already exists")) {
//       console.warn("⚠️ Blob already exists, using existing URL:", blobUrl);
//       blobCache.set(strapiUrl, { url: blobUrl, checkedAt: now, exists: true });
//       return blobUrl;
//     }

//     console.error("❌ Blob upload failed:", err);
//     blobCache.set(strapiUrl, { url: strapiUrl, checkedAt: now, exists: false });
//     return strapiUrl;
//   }
// }
