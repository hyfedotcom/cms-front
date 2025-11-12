import { GetPrivacyPolicy } from "src/lib/api/getPrivacyPolicy";
import { RichTextBlocks } from "./RichTextBlocks";

export default async function PrivacyPolicy() {
  const api = new GetPrivacyPolicy("cough-monitor-suite", "privacy-policy");
  const { rich_text_block } = await api.privacyPolicy();

  return (
    <div className=" bg-gray-50">
      <section className="container">
        {rich_text_block && (
          <RichTextBlocks
            content={
              typeof rich_text_block === "string"
                ? JSON.parse(rich_text_block)
                : Array.isArray(rich_text_block)
                ? rich_text_block
                : null
            }
          />
        )}
      </section>
    </div>
  );
}
