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

## Detailed Backend API Specification

To fully utilize this frontend, a robust backend API is required. Below are the detailed specifications for each module.

### 1. Base Configuration
- **Base URL:** `https://api.brightsmile.example.com/v1`
- **Auth Strategy:** JWT (JSON Web Tokens) for Admin Access.
- **Headers:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` (for protected routes)

---

### 2. Authentication (Admin)
For managing the clinic dashboard.

- **`POST /api/auth/login`**
  - **Payload:** `{ email, password }`
  - **Response:** `{ user: { id, name, email }, token: "string" }`
- **`POST /api/auth/logout`**
  - **Action:** Invalidate JWT token.

---

### 3. Doctors API
Manages the dental professional profiles.

- **`GET /api/doctors`**: Returns a list of all doctors.
- **`GET /api/doctors/:id`**: Returns specific doctor details.
- **`POST /api/doctors`** (Admin): Create a new doctor profile.
- **`PUT /api/doctors/:id`** (Admin): Update profile details.
- **`DELETE /api/doctors/:id`** (Admin): Remove a profile.

**Doctor Schema:**
```json
{
  "id": "string",
  "name": "string",
  "role": "string",
  "specialty": "string",
  "bio": "string",
  "image": "url_string",
  "education": ["string"],
  "experience": "string"
}
```

---

### 4. Services API
Manages the dental procedures offered.

- **`GET /api/services`**: Returns all services.
- **`GET /api/services/:slug`**: Returns detailed service info.
- **`POST /api/services`** (Admin): Add a new service.
- **`PUT /api/services/:id`** (Admin): Update service details.

**Service Schema:**
```json
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "description": "string",
  "longDescription": "string",
  "icon": "lucide_icon_name",
  "color": "gradient_string",
  "priceRange": "string",
  "duration": "string",
  "benefits": ["string"],
  "process": [{ "step": number, "title": "string", "desc": "string" }],
  "image": "url_string"
}
```

---

### 5. Blog & CMS API
Handles educational content and clinic news.

- **`GET /api/blog`**: List posts with pagination & category filtering.
- **`GET /api/blog/:slug`**: Get full post content.
- **`POST /api/blog`** (Admin): Create a new post.
- **`PUT /api/blog/:id`** (Admin): Update post.
- **`DELETE /api/blog/:id`** (Admin): Delete post.

**Blog Post Schema:**
```json
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "excerpt": "string",
  "content": "markdown_or_html_string",
  "author": { "name": "string", "role": "string", "avatar": "url" },
  "category": "string",
  "tags": ["string"],
  "publishDate": "iso_date",
  "image": "url_string",
  "readTime": "string"
}
```

---

### 6. Booking & Appointment API
The core transactional engine of the application.

- **`GET /api/availability?doctorId={id}&date={iso_date}`**: Check slots.
- **`POST /api/appointments`**: Create a booking.
- **`GET /api/appointments`** (Admin): List all bookings with filters.
- **`PUT /api/appointments/:id`** (Admin): Update status (Confirmed, Cancelled, Completed).

**Appointment Payload:**
```json
{
  "serviceId": "string",
  "doctorId": "string",
  "date": "iso_date",
  "timeSlot": "string",
  "patientInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "isNewPatient": boolean,
    "notes": "string"
  }
}
```

---

### 7. Contact & Leads API
Captures general inquiries.

- **`POST /api/contact`**: Submit contact form.
- **`GET /api/contact`** (Admin): View inquiries.

**Lead Schema:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "status": "unread | read | replied"
}
```

---

### 8. Testimonials & Reviews API
- **`GET /api/testimonials`**: Public list.
- **`POST /api/testimonials`** (Admin): Add/Approve patient reviews.

**Schema:** `{ name, role, text, rating, avatar }`

---

### 9. Clinic Settings API (Admin Only)
Manages global clinic data used in Header/Footer/Contact page.

- **`GET /api/settings`**
- **`PUT /api/settings`**

**Settings Schema:**
```json
{
  "clinicName": "string",
  "contactEmail": "string",
  "phone": "string",
  "address": "string",
  "mapEmbedUrl": "url",
  "whatsappNumber": "string",
  "openingHours": {
    "mon_fri": "string",
    "sat": "string",
    "sun": "string"
  }
}
```

---

### 10. Asset Management API (Admin Only)
- **`POST /api/assets/upload`**
  - **Payload:** `multipart/form-data` (image/pdf)
  - **Response:** `{ url: "string", publicId: "string" }`

