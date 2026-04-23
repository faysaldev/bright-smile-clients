import { buildPageMetadata } from "@/src/lib/metadata";
import { getFaqJsonLd } from "@/src/lib/jsonLd";
import FaqPage from "@/src/views/FaqPage";

const faqs = [
  { question: "Does teeth whitening hurt?", answer: "Professional whitening may cause temporary sensitivity, but we use desensitizing agents to minimize discomfort. Most patients report no pain at all." },
  { question: "How often should I visit the dentist?", answer: "We recommend a checkup and cleaning every 6 months. Patients with specific conditions may need more frequent visits." },
  { question: "Do you accept insurance?", answer: "Yes! We work with most major dental insurance providers. Our team will help verify your coverage and maximize your benefits." },
  { question: "What should I do in a dental emergency?", answer: "Call us immediately at (123) 456-7890. We offer same-day emergency appointments during business hours and can guide you over the phone." },
  { question: "Are dental implants safe?", answer: "Absolutely. Dental implants have a 95%+ success rate and are considered one of the safest and most effective dental procedures available." },
];

export const metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common dental questions about whitening, insurance, emergencies, and more at BrightSmile Dental.",
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqJsonLd(faqs)),
        }}
      />
      <FaqPage />
    </>
  );
}
