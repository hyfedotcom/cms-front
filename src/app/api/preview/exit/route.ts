// app/api/exit-preview/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
