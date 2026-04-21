"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed, but for now we'll use standard ones
// or if the user has specific font requirements.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 20,
  },
  logo: {
    width: 120,
  },
  headerTitle: {
    fontSize: 24,
    color: "#0f172a",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 5,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  infoItem: {
    width: "45%",
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    color: "#94a3b8",
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: "#1e293b",
    fontWeight: "medium",
  },
  summaryCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 20,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: "#94a3b8",
  },
  statusBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontSize: 10,
    padding: "4 8",
    borderRadius: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

interface BookingPDFProps {
  data: {
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    service: string;
    doctor: string;
    date: string;
    time: string;
    bookingId?: string;
  };
}

const BookingPDF = ({ data }: BookingPDFProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            src="https://res.cloudinary.com/dk3v0m35u/image/upload/q_auto/f_auto/v1776585328/logo-bg_flolyf.png"
            style={styles.logo}
          />
          <View style={{ alignItems: "right" }}>
            <Text style={styles.headerTitle}>Appointment Details</Text>
            <Text style={[styles.label, { textAlign: "right" }]}>
              Generated on {currentDate}
            </Text>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{data.patientName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{data.patientEmail}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{data.patientPhone}</Text>
            </View>
          </View>
        </View>

        {/* Appointment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={[styles.infoGrid, { marginBottom: 0 }]}>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Service</Text>
                <Text style={styles.value}>{data.service}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Doctor</Text>
                <Text style={styles.value}>{data.doctor}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{data.date}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.label}>Time Slot</Text>
                <Text style={styles.value}>{data.time}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Notes</Text>
          <Text style={[styles.value, { fontSize: 10, lineHeight: 1.5 }]}>
            • Please arrive 15 minutes before your scheduled appointment time.
            {"\n"}
            • Bring any previous dental records or X-rays if available.{"\n"}• If
            you need to reschedule, please notify us at least 24 hours in
            advance.{"\n"}• Wear a mask and follow all clinic safety protocols.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Bright Smile Dental Clinic | 123 Dental Street, Healthcare City
          </Text>
          <Text style={[styles.footerText, { marginTop: 5 }]}>
            Contact: +1 (234) 567-890 | info@brightsmile.com
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default BookingPDF;
