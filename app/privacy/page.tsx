import { buildPageMetadata } from "@/src/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read BrightSmile Dental's privacy policy. Learn how we collect, use, and protect your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="pt-8 pb-16">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl prose prose-sm">
          <h1 className="text-4xl font-heading font-bold mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-4">
            Last updated: January 1, 2025
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect personal information you provide when booking
            appointments, including your name, email, phone number, and dental
            health information necessary for treatment.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Your information is used to schedule appointments, provide dental
            care, communicate about treatments, and improve our services. We
            never sell your personal data.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            3. Data Security
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We implement industry-standard security measures to protect your
            data, including encryption, secure servers, and access controls.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            4. Your Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You have the right to access, correct, or delete your personal data
            at any time. Contact us at privacy@brightsmile.com for any requests.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            5. Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            For privacy-related inquiries, contact us at privacy@brightsmile.com
            or call (123) 456-7890.
          </p>
        </div>
      </section>
    </main>
  );
}
