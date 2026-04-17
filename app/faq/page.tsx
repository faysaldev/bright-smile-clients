
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const faqCategories = [
  {
    category: "General",
    items: [
      {
        q: "How do I schedule an appointment?",
        a: "You can book online through our website, call us at (123) 456-7890, or message us on WhatsApp.",
      },
      {
        q: "Do I need a referral?",
        a: "No referral is needed. New patients are always welcome.",
      },
      {
        q: "What should I bring to my first visit?",
        a: "Please bring a valid photo ID, your insurance card, and any relevant medical records or X-rays.",
      },
    ],
  },
  {
    category: "Procedures",
    items: [
      {
        q: "How long does teeth whitening last?",
        a: "Professional whitening results typically last 1-3 years with proper care and occasional touch-ups.",
      },
      {
        q: "Are dental implants painful?",
        a: "The procedure is performed under local anesthesia and is generally well-tolerated. Most patients report minimal discomfort.",
      },
      {
        q: "How long do braces treatment take?",
        a: "Treatment duration varies from 12-24 months depending on the complexity of your case.",
      },
    ],
  },
  {
    category: "Insurance & Payment",
    items: [
      {
        q: "What insurance plans do you accept?",
        a: "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, and more.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes, we offer flexible payment plans through CareCredit and in-house financing options.",
      },
      {
        q: "What if I don't have insurance?",
        a: "We offer competitive self-pay rates and a dental membership plan with discounted pricing on all services.",
      },
    ],
  },
];

const FAQ = () => (
  <>
    <div className="pb-16 pt-8">
      <section className="section-padding">
        <div className="container-narrow max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mt-2 mb-4">
              Frequently Asked Questions
            </h1>
          </div>

          {faqCategories.map((cat) => (
            <div key={cat.category} className="mb-10">
              <h2 className="font-heading font-bold text-xl mb-4">
                {cat.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {cat.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${cat.category}-${i}`}
                    className="glass-card rounded-xl px-6 border-0"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline py-5 text-sm">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 text-sm">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  </>
);

export default FAQ;
