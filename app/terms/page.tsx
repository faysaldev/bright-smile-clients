import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

const Terms = () => (
  <>
    <Navbar />
    <main className="pt-24">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl prose prose-sm">
          <h1 className="text-4xl font-heading font-bold mb-8">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-4">
            Last updated: January 1, 2025
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            By accessing and using the BrightSmile Dental website and services,
            you agree to be bound by these terms and conditions.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            2. Appointments
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Online bookings are subject to confirmation. We require 24-hour
            notice for cancellations. Missed appointments may incur a fee.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            3. Payment
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Payment is due at the time of service unless prior arrangements have
            been made. We accept major credit cards, insurance, and approved
            payment plans.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            4. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            BrightSmile Dental provides information on this website for general
            purposes. Individual treatment outcomes may vary.
          </p>
          <h2 className="font-heading font-semibold text-xl mt-8 mb-3">
            5. Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms can be directed to
            legal@brightsmile.com.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Terms;
