# Bright Smile Client

A premium, highly-optimized next-generation dental clinic front-end built on **Next.js (App Router)**. This client features dynamic styling, GSAP integrated micro-animations, **Lenis** smooth scrolling, and a Redux-powered multi-step booking form.

## Tech Stack

- **Framework:** Next.js (App Router)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS V4 + `tw-animate-css`
- **Animations:** GSAP & Lenis Smooth Scrolling
- **UI Components:** Shadcn/UI, Lucide React

## Getting Started

First, install dependencies:
```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend Architecture Requirements

To fully realize the functionalities of this frontend application, a backend API should be constructed to handle **Booking** and **Contact/Leads**.

### 1. Booking System

The multi-step booking process (`/booking`) relies on the Redux state via `bookingSlice`. The required backend endpoints should include:

- **`GET /api/doctors`**: Returns a list of available doctors and their operational specialties.
- **`GET /api/availability?doctorId={id}&date={date}`**: Returns an array of available 30-minute time slots for the given date.
- **`POST /api/appointments`**:
  - **Payload:** `{ serviceId: String, doctorId: String, date: String, timeSlot: String, patientInfo: { name, email, phone, notes } }`
  - **Action:** Creates an appointment in the database (e.g., PostgreSQL or MongoDB), handles double-booking collision checks, and triggers confirmation emails via SendGrid/AWS SES.

### 2. Contact & Lead Generation

The contact form and lead capture should send data securely to the backend.

- **`POST /api/contact`**:
  - **Payload:** `{ name: String, email: String, phone: String, subject: String, message: String }`
  - **Action:** Stores the lead securely in the database and notifies the clinic's reception desk.

### 3. CMS for Blog

- The current `/blog` is statically rendered based on mock data.
- A Headless CMS integration (like Sanity, Contentful, or Strapi) is highly recommended, paired with Next.js ISR (Incremental Static Regeneration) fetching data from an endpoint similar to `GET /api/posts`.
