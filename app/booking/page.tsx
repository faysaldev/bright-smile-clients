import { buildPageMetadata } from "@/src/lib/metadata";
import BookingPage from "@/src/views/BookingPage";

export const metadata = buildPageMetadata({
  title: "Book Your Appointment",
  description:
    "Schedule your dental appointment online in 4 simple steps. Choose your service, doctor, date, and confirm. Quick and easy booking at BrightSmile Dental.",
  path: "/booking",
});

export default function Page() {
  return <BookingPage />;
}
