import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => (
  <a
    href="https://wa.me/+8801577011695"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110 group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-white" />
    <span className="absolute right-full mr-3 bg-card text-foreground text-sm font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Chat with us
    </span>
  </a>
);

export default WhatsAppWidget;
