# BrightSmile API Comprehensive Guide

This document provides a detailed technical specification for all endpoints available in the BrightSmile Backend API.

## Table of Contents
1. [Base Configuration](#base-configuration)
2. [Response Structure](#response-structure)
3. [Authentication Module](#1-authentication-module)
4. [User & Profile Management](#2-user--profile-management)
5. [Doctors Module](#3-doctors-module)
6. [Services Module](#4-services-module)
7. [Blog & CMS Module](#5-blog--cms-module)
8. [Appointments & Booking](#6-appointments--booking)
9. [Contact & Leads](#7-contact--leads)
10. [Testimonials & Reviews](#8-testimonials--reviews)
11. [Clinic Settings](#9-clinic-settings)
12. [Asset Management](#10-asset-management)

---

## Base Configuration
- **Local Base URL:** `http://localhost:5000/api`
- **Auth Strategy:** JWT (JSON Web Tokens)
- **Header:** `Authorization: Bearer <token>` (Required for all routes marked as **Protected**)

---

## Response Structure
All responses follow a consistent format:

### Success Response
```json
{
  "code": 200,
  "status": "OK",
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "code": 400,
  "status": "BAD_REQUEST",
  "message": "Error description"
}
```

---

## 1. Authentication Module

### Login
- **Endpoint:** `POST /auth/login`
- **Payload:**
  ```json
  {
    "email": "admin@example.com",
    "password": "Password123"
  }
  ```
- **Description:** Authenticates user and returns a JWT token.

### Logout
- **Endpoint:** `POST /auth/logout`
- **Description:** Invalidate session (Client should remove token).

---

## 2. User & Profile Management

### Get Current User Profile
- **Endpoint:** `GET /users/me`
- **Protected:** Yes
- **Description:** Returns the authenticated user's details.

### Update Profile
- **Endpoint:** `PUT /users/me`
- **Protected:** Yes
- **Payload:**
  ```json
  {
    "name": "Jane Doe",
    "dateOfBirth": "1995-05-15",
    "image": "url_to_image"
  }
  ```

### Change Password
- **Endpoint:** `POST /users/me/change-password`
- **Protected:** Yes
- **Payload:**
  ```json
  {
    "currentPassword": "oldPassword123",
    "newPassword": "newPassword456"
  }
  ```

---

## 3. Doctors Module

### Get All Doctors
- **Endpoint:** `GET /doctors`
- **Protected:** No

### Get Doctor by ID
- **Endpoint:** `GET /doctors/:id`
- **Protected:** No

### Create Doctor profile
- **Endpoint:** `POST /doctors`
- **Protected:** Yes (Admin)
- **Payload:**
  ```json
  {
    "name": "Dr. Sarah Johnson",
    "role": "Senior Orthodontist",
    "specialty": "Invisalign Expert",
    "bio": "Expert in dental aesthetics with 12 years of experience.",
    "image": "https://example.com/dr-sarah.jpg",
    "education": ["DDS, Harvard University", "MSc in Orthodontics"],
    "experience": "12+ Years"
  }
  ```

### Update Doctor Profile
- **Endpoint:** `PUT /doctors/:id`
- **Protected:** Yes (Admin)
- **Payload:** Partial updates supported.

### Delete Doctor Profile
- **Endpoint:** `DELETE /doctors/:id`
- **Protected:** Yes (Admin)

---

## 4. Services Module

### Get All Services
- **Endpoint:** `GET /services`
- **Protected:** No

### Get Service by Slug
- **Endpoint:** `GET /services/:slug`
- **Protected:** No

### Create Service
- **Endpoint:** `POST /services`
- **Protected:** Yes (Admin)
- **Payload:**
  ```json
  {
    "slug": "teeth-whitening",
    "title": "Professional Teeth Whitening",
    "description": "Brighten your smile with ours...",
    "longDescription": "Extended details about the technique...",
    "icon": "Sparkles",
    "color": "bg-blue-500",
    "priceRange": "$200 - $500",
    "duration": "45-60 mins",
    "benefits": ["Instant results", "Safe for enamel"],
    "process": [
      { "step": 1, "title": "Consultation", "desc": "We check your sensitivity" },
      { "step": 2, "title": "Application", "desc": "Applying the gel" }
    ],
    "image": "https://example.com/whitening.jpg"
  }
  ```

---

## 5. Blog & CMS Module

### Get All Posts
- **Endpoint:** `GET /blog`
- **Query Params:** `?page=1&limit=10&category=Health`
- **Protected:** No

### Get Post by Slug
- **Endpoint:** `GET /blog/:slug`
- **Protected:** No

### Create Blog Post
- **Endpoint:** `POST /blog`
- **Protected:** Yes (Admin)
- **Payload:**
  ```json
  {
    "slug": "how-to-brush-better",
    "title": "5 Tips for Better Brushing",
    "excerpt": "Short summary for cards",
    "content": "Full markdown or HTML content...",
    "author": {
      "name": "Admin",
      "role": "Chief Medical Officer",
      "avatar": "url_to_img"
    },
    "category": "Oral Health",
    "tags": ["Tips", "Hygiene"],
    "image": "url_to_img",
    "readTime": "5 min"
  }
  ```

---

## 6. Appointments & Booking

### Check Available Slots
- **Endpoint:** `GET /appointments/availability`
- **Query Params:** `?doctorId=ID&date=YYYY-MM-DD`
- **Protected:** No
- **Response:** Returns an array of already booked `timeSlot` strings.

### Create Appointment (Book)
- **Endpoint:** `POST /appointments`
- **Payload:**
  ```json
  {
    "serviceId": "SERVICE_ID",
    "doctorId": "DOCTOR_ID",
    "date": "2024-10-25",
    "timeSlot": "10:30 AM",
    "patientInfo": {
      "name": "John Doe",
      "email": "john@doe.com",
      "phone": "555-0123",
      "isNewPatient": true,
      "notes": "Interested in veneers"
    }
  }
  ```

### Manage Appointments (Admin)
- **Get All:** `GET /appointments` (Admin)
- **Update Status:** `PUT /appointments/:id` (Admin)
  - **Status options:** `"Pending" | "Confirmed" | "Cancelled" | "Completed"`

---

## 7. Contact & Leads

### Submit Contact Form
- **Endpoint:** `POST /contact`
- **Payload:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@smith.com",
    "phone": "555-9876",
    "subject": "Pricing Query",
    "message": "I would like to know about..."
  }
  ```

### View Inquiries (Admin)
- **Endpoint:** `GET /contact`
- **Protected:** Yes

### Update Inquiry Status (Admin)
- **Endpoint:** `PUT /contact/:id`
- **Payload:** `{ "status": "read" }`

---

## 8. Testimonials & Reviews

### Get Testimonials
- **Endpoint:** `GET /testimonials`
- **Protected:** No

### Add Testimonial (Admin/Patient)
- **Endpoint:** `POST /testimonials`
- **Payload:**
  ```json
  {
    "name": "Alice Peterson",
    "role": "Patient",
    "text": "Best dental experience ever!",
    "rating": 5,
    "avatar": "url_to_img"
  }
  ```

---

## 9. Clinic Settings

### Get Clinic Data
- **Endpoint:** `GET /settings`
- **Description:** Returns Header/Footer/Contact page data.

### Update Settings (Admin)
- **Endpoint:** `PUT /settings`
- **Payload:**
  ```json
  {
    "clinicName": "Bright Smile Dental",
    "contactEmail": "info@brightsmile.com",
    "phone": "+1 234 567 890",
    "address": "123 Dental Lane, NYC",
    "mapEmbedUrl": "https://maps.google.com/...",
    "whatsappNumber": "1234567890",
    "openingHours": {
      "mon_fri": "9am - 7pm",
      "sat": "10am - 4pm",
      "sun": "Closed"
    }
  }
  ```

---

## 10. Asset Management

### Upload File
- **Endpoint:** `POST /assets/upload`
- **Protected:** Yes
- **Payload:** `multipart/form-data`
  - Field name: `file`
- **Response:**
  ```json
  {
    "code": 200,
    "status": "OK",
    "data": {
      "url": "https://res.cloudinary.com/...",
      "publicId": "unique_id"
    }
  }
  ```
