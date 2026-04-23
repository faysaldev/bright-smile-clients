import { buildPageMetadata } from "@/src/lib/metadata";
import ContactPage from "@/src/views/ContactPage";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with BrightSmile Dental. Call, email, or visit us. We offer same-day emergency appointments and WhatsApp support during business hours.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
