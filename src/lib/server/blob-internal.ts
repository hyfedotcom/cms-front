import "server-only";
import { put } from "@vercel/blob";

const READ_URL = process.env.BLOB_READ_URL;
const RW_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Лёгкий процессный кеш, чтобы не долбить HEAD бесконечно
const mem = new Map<
  string,
  { url: string; checkedAt: number; exists: boolean }
>();
const TTL = 10 * 60 * 1000; // 10 минут

function fileKeyFromUrl(raw: string): string {
  // Берём имя файла из URL и нормализуем
  try {
    const u = new URL(raw);
    const base = decodeURIComponent(u.pathname.split("/").pop() || "file");
    return base.replace(/[^\w.-]+/g, "_");
  } catch {
    // Если это относительный путь, просто чистим
    const base = decodeURIComponent(raw.split("/").pop() || "file");
    return base.replace(/[^\w.-]+/g, "_");
  }
}

async function headOk(url: string): Promise<boolean> {
  try {
    const h = await fetch(url, { method: "HEAD" });
    return h.ok;
  } catch {
    return false;
  }
}

export async function getOrUploadToBlob(sourceUrl: string): Promise<string> {
  const key = fileKeyFromUrl(sourceUrl);
  const blobUrl = READ_URL + key;
  const now = Date.now();

  // кеш
  const c = mem.get(sourceUrl);
  if (c && now - c.checkedAt < TTL && c.exists) return c.url;

  // уже есть?
  if (await headOk(blobUrl)) {
    mem.set(sourceUrl, { url: blobUrl, checkedAt: now, exists: true });
    return blobUrl;
  }

  // нет в Blob — заливаем
  const res = await fetch(sourceUrl, { cache: "no-store" });
  if (!res.ok)
    throw new Error(`Fetch source failed: ${res.status} ${sourceUrl}`);

  const buf = Buffer.from(await res.arrayBuffer());

  try {
    const uploaded = await put(key, buf, {
      access: "public",
      token: RW_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: false,
      cacheControlMaxAge: 31536000,
    });
    mem.set(sourceUrl, { url: uploaded.url, checkedAt: now, exists: true });
    return uploaded.url;
  } catch (e: unknown) {
    const err = e as Error;
    // гонка: уже успели залить
    if (String(err?.message || "").includes("already exists")) {
      mem.set(sourceUrl, { url: blobUrl, checkedAt: now, exists: true });
      return blobUrl;
    }
    // фоллбек: вернём исходный URL, клиент пусть показывает заглушку/исходник
    mem.set(sourceUrl, { url: sourceUrl, checkedAt: now, exists: false });
    return sourceUrl;
  }
}
