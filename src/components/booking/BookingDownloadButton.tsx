"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingPDF from "./BookingPDF";
import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";

interface BookingDownloadButtonProps {
  data: {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    service: string;
    doctor: string;
    date: string;
    time: string;
  };
}

const BookingDownloadButton = ({ data }: BookingDownloadButtonProps) => {
  return (
    <PDFDownloadLink
      document={<BookingPDF data={data} />}
      fileName={`appointment-${data.patientName.replace(/\s+/g, "-").toLowerCase() || "summary"}.pdf`}
    >
      {({ loading }) => (
        <Button
          variant="outline"
          className="w-full rounded-xl gap-2 border-primary text-primary hover:bg-primary/5"
          disabled={loading}
        >
          <Download className="w-4 h-4" />
          {loading ? "Preparing PDF..." : "Download Appointment PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default BookingDownloadButton;
