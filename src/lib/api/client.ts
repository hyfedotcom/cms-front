type FetchOpts = {
  tag?: string;
  cache?: RequestCache;
  preview?: boolean;
};
export class ApiClient {
  private readonly BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
  private readonly TOKEN = process.env.STRAPI_TOKEN ?? "";

  async get<T = unknown>(
    path: string,
    params?: Record<string, string | number | boolean>,
    opts: FetchOpts = {}
  ): Promise<T> {
    const query = params
      ? new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([k, v]) => [k, String(v)])
          )
        ).toString()
      : "";

    const url = `${this.BASE}${path}${query ? "?" + query : ""}`;

    const next: RequestInit["next"] = {};
    if (opts.tag) next.tags = [opts.tag];

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this.TOKEN}` },
      next,
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("❌ Strapi error", res.status, await res.text());
      throw new Error(`Strapi ${res.status}`);
    }

    return res.json() as Promise<T>;
  }
}
