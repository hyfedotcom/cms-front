import { GetPrivacyPolicy } from "src/lib/api/getPrivacyPolicy";
import ReactMarkdown from "react-markdown";

export default async function PrivacyPolicy() {
  const api = new GetPrivacyPolicy("cough-monitor-suite", "privacy-policy");
  const { heading, content } = await api.privacyPolicy();

  return (
    <div className=" bg-gray-50">
      <section className="container">
        <h1 className="h2-default mb-10 mt-5">{heading}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </section>
    </div>
  );
}
