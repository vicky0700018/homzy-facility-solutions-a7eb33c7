# Homzy Facility Solutions

https://github.com/vickysosync/homzy-facility-solutions

copy this repo

initial prompt
# LOVABLE AI PROMPT — HOMZY SERVICES PRIVATE LIMITED

## Project Overview
Create a premium, modern, dynamic, fully responsive service-business portfolio website for **HOMZY SERVICES PRIVATE LIMITED**, inspired by the design, service categories, and overall business concept of this reference website:

Reference Website: https://diamond-facility-hub.vercel.app/

Study the reference website's visible layout, navigation, service categories, and facility-management business presentation. Create an original website for HOMZY SERVICES PRIVATE LIMITED with a similar professional feel, but use unique branding, content, layouts, and images.

**IMPORTANT: The navbar phone-number button must become a functional service-booking button. When clicked, it must open a booking form. After submission, the booking must appear inside the Admin Panel.**

## 1. Mandatory Technology Restrictions

Use ONLY:
- React
- Vite
- Tailwind CSS

Strict restrictions:
- No Next.js.
- No TypeScript.
- No backend.
- No database.
- No Supabase or Firebase.
- No external UI component libraries.
- No external icon libraries.
- No paid APIs.
- Use JavaScript and React components with Tailwind CSS.
- Use mock data for all services, bookings, testimonials, and dashboard statistics.

Use React state and browser localStorage to simulate persistent demo data. Bookings and admin changes should remain available after refreshing the browser on the same device.

Clearly treat the website as a frontend demo. Do not claim that bookings are stored on a server or delivered to a real business.

## 2. Brand Identity and Color Palette

Business Name: HOMZY SERVICES PRIVATE LIMITED

Industry: Integrated Facility Management, Housekeeping, Cleaning, Maintenance, and Professional Support Services.

Create a trustworthy, premium, corporate identity suitable for residential communities, offices, commercial buildings, and industrial facilities.

Color palette:
- Primary Navy Blue: #12304A
- Deep Navy: #0B1F33
- Professional Teal: #0F9D91
- Light Teal: #E5F7F4
- White: #FFFFFF
- Background Grey: #F5F7FA
- Text Dark: #243447
- Accent Gold: #D7A84B

Use navy for headers and important sections, teal for primary actions and highlights, white for clean layouts, and gold sparingly for premium accents.

Typography should feel modern, clear, and professional. Use a clean system-font stack without adding a font library.

## 3. Website Navigation

Create a polished, sticky, responsive navbar with:
- HOMZY logo and company name.
- Home
- About Us
- Services
- Industries We Serve
- Our Work
- Contact
- A prominent phone-number-style booking CTA labelled **Book a Service**.

Do not invent a real company phone number. Use “Book a Service” as the primary CTA instead of an unverified phone number.

When users click “Book a Service”:
1. Open a polished booking modal or dedicated booking section.
2. Show the service booking form.
3. Allow users to complete and submit the form.
4. Validate all required fields.
5. Generate a unique booking reference such as HOM-2026-1001.
6. Display a success confirmation with the booking reference.
7. Save the booking in localStorage.
8. Make the new booking immediately visible in the Admin Panel without refreshing.

On mobile, the navbar should use a working hamburger menu. Every navigation link must scroll to or navigate to its correct section. No dead links or links that all open the same section.

## 4. Hero Section with Banner Image

Create a visually impressive, premium hero section with a large, high-quality banner image showing professional facility management, a spotless modern building, housekeeping staff, or commercial property maintenance.

Use a two-column layout on desktop:
- Left: strong headline, supporting description, and CTA buttons.
- Right: large banner photograph with elegant rounded corners or a polished image composition.

Suggested headline:
**“Complete Facility Solutions. One Trusted Partner.”**

Supporting text:
“HOMZY SERVICES PRIVATE LIMITED delivers reliable, professional facility management solutions designed to keep homes, workplaces, and commercial environments clean, safe, and efficient.”

Buttons:
- Book a Service
- Explore Our Services

Include three compact trust indicators:
- Professional Service Teams
- Flexible Service Solutions
- Quality-Focused Operations

Use a subtle decorative background, excellent contrast, and smooth hover effects.

## 5. Facility Management Services

Create service cards with individual images, short descriptions, and working “Book This Service” buttons.

Include these service categories, inspired by integrated facility-management businesses:

1. Housekeeping and Cleaning
2. Deep Cleaning Services
3. Office and Commercial Cleaning
4. Residential Society Maintenance
5. Integrated Facility Management
6. Technical and Electrical Maintenance
7. Plumbing and General Repairs
8. Security Support Services
9. Gardening and Landscaping
10. Pest Control Coordination
11. Pantry and Office Support
12. Staff and Workforce Management

Present these as illustrative service offerings for the demo, not as verified contractual commitments.

Every service card should have:
- A relevant image.
- Service title.
- Brief description.
- Key service benefits.
- “Book This Service” button.
- Optional “View Details” interaction.

Clicking “Book This Service” must open the same booking form with that service preselected.

## 6. Dynamic Booking Form

This is one of the most important features.

Create a premium booking form with the following fields:

- Customer Full Name — required
- Mobile Number — required
- Email Address — optional
- Company or Society Name — optional
- Property Type — required
  - Residential
  - Apartment Society
  - Office
  - Commercial Building
  - Industrial Facility
  - Other
- Service Category — required
- Specific Service — required
- Property Address — required
- City — required
- Preferred Service Date — required
- Preferred Time Slot — required
- Service Frequency
  - One-Time
  - Daily
  - Weekly
  - Monthly
- Approximate Property Size — optional
- Number of Staff Required — optional
- Additional Requirements — optional
- Preferred Contact Method
- Consent checkbox for demo booking submission

Form behavior:
- Use clear labels and helpful placeholders.
- Show inline validation messages.
- Validate mobile number format.
- Prevent invalid or empty required fields.
- Disable repeated submissions while submitting.
- Display a clear success screen after successful submission.
- Show the unique booking ID.
- Reset the form after successful submission, while preserving the submitted booking.
- Allow closing the modal with a close button.
- Maintain accessible keyboard and focus behavior.

On submission, create a booking object containing:
- Unique booking ID
- Customer information
- Selected service
- Property details
- Preferred date and time
- Submission timestamp
- Booking status: New
- Admin notes: Empty

Save the booking in localStorage and update React state immediately.

**Important:** No real email, SMS, WhatsApp message, or server submission is required in this mock-data demo.

## 7. Admin Login and Dashboard

Create a dedicated Admin Login page and a complete admin dashboard with a polished sidebar layout.

Suggested demo credentials:
- Email: admin@homzyservices.demo
- Password: Homzy@123

These credentials are for demonstration only. Do not describe this frontend-only login as production-secure authentication.

After successful demo login, redirect to `/admin/dashboard`.

Admin sidebar:
- Dashboard
- Bookings
- Services
- Customers
- Industries
- Testimonials
- Gallery / Projects
- Website Content
- Contact Enquiries
- Settings
- Logout

### Admin Dashboard Overview

Display live statistics calculated from mock data and localStorage:
- Total Bookings
- New Bookings
- Confirmed Bookings
- In Progress
- Completed
- Cancelled
- Total Enquiries

Include:
- Recent bookings table.
- Booking status summary.
- Service category breakdown.
- Recent customer enquiries.
- Quick-action buttons.

Do not hardcode statistics that stop matching the bookings.

### Booking Management

The Admin Panel must show every booking submitted through the public website.

Include:
- Booking ID
- Customer Name
- Phone Number
- Selected Service
- Property Type
- City
- Preferred Date
- Submission Date
- Booking Status
- Actions

Admin actions:
- View full booking details.
- Change status to New, Confirmed, In Progress, Completed, or Cancelled.
- Add or edit internal admin notes.
- Search by booking ID, name, or phone.
- Filter by status, service category, and date.
- Sort bookings by newest or oldest.
- Delete a booking after a confirmation dialog.
- Export bookings as CSV using native JavaScript functionality.

When the admin updates a status or notes, save the change to localStorage and update the dashboard statistics immediately.

Seed a few clearly identified sample bookings for the initial demo. Ensure the admin can also see all new customer-submitted bookings.

### Service Management

Allow the admin to:
- Add a new service.
- Edit service title and description.
- Change service category.
- Set display price text, such as “Request a Quote”.
- Change the service image.
- Publish or unpublish services.
- Delete a service after confirmation.

All changes should update the public Services section immediately.

### Customer Management

Show customers derived from submitted bookings, with:
- Name
- Contact information
- Number of bookings
- Most recently requested service
- Booking history

Do not create duplicate customer records unnecessarily when the same customer submits multiple bookings.

### Website Content Management

Provide editable demo controls for:
- Hero heading and description.
- About Us content.
- Contact details.
- Service section heading.
- Footer content.
- Testimonials.
- Gallery entries.

Changes should update the corresponding public website sections and persist through localStorage.

## 8. Admin Redirect Link in Footer

Add a small but clearly accessible **Admin Login** link in the public website footer.

The link must navigate to `/admin/login`.

Admin routes should include:
- `/admin/login`
- `/admin/dashboard`
- `/admin/bookings`
- `/admin/services`
- `/admin/customers`
- `/admin/settings`

Use React-based routing only if necessary; otherwise, implement lightweight client-side routing with React and the browser History API.

Ensure direct navigation and page refresh work on supported routes. Configure the deployment platform's SPA rewrite/fallback rules as needed.

## 9. About Us Section

Create an elegant company introduction section with a supporting photograph.

Suggested copy:

“At HOMZY SERVICES PRIVATE LIMITED, we believe well-managed spaces create better experiences. Our integrated service approach focuses on cleanliness, operational support, facility upkeep, and dependable customer service for residential and commercial environments.”

Include:
- Our Mission
- Our Approach
- Quality and Reliability
- Customer-Centric Service

Avoid inventing company registration numbers, certifications, awards, years of experience, or client partnerships.

## 10. Industries We Serve

Create premium cards for:
- Residential Societies
- Corporate Offices
- Retail and Commercial Spaces
- Educational Institutions
- Healthcare Facilities
- Industrial Buildings
- Hospitality Properties

Each card should include a relevant photograph or image and a short description.

## 11. Why Choose HOMZY

Create a polished benefits section featuring:
- One Point of Contact
- Flexible Service Plans
- Professional Service Coordination
- Quality-Focused Processes
- Transparent Communication
- Customer-Oriented Support

Use simple inline SVG icons instead of installing icon libraries.

## 12. Projects and Gallery

Create an image-rich gallery featuring distinct photographs of:
- Clean commercial interiors
- Residential building maintenance
- Professional housekeeping
- Office cleaning
- Building maintenance teams
- Landscaped outdoor spaces

Use mock project names and clearly illustrative portfolio content. Do not imply that fictional projects are verified completed contracts.

Add functional category filters and an image preview modal.

## 13. Testimonials

Create a modern testimonial section using clearly labelled demo testimonials.

Use mock customer names and sample content only. Do not present fictional testimonials as genuine verified reviews.

Provide admin controls to add, edit, publish, and delete testimonial entries.

## 14. Contact and Enquiry Form

Create a contact section featuring:
- Company name
- Address placeholder
- Phone placeholder
- Email placeholder
- Business enquiry form
- Map placeholder rather than a fabricated company location

Since actual contact details have not been provided, use editable placeholders such as “Contact details to be updated”.

On enquiry submission:
- Validate the form.
- Generate a unique enquiry ID.
- Save the enquiry in localStorage.
- Display a confirmation message.
- Show the enquiry in the Admin Panel under Contact Enquiries.

Do not fabricate an address, phone number, email address, or map location.

## 15. Image Requirements

Use multiple distinct, high-quality, relevant images throughout the website.

Required image locations:
- Main hero banner
- About Us
- Service cards
- Industries section
- Gallery
- Projects
- Supporting feature sections

Image handling requirements:
- Do not reuse the same image for every section.
- Use reliable image URLs from appropriate image sources or stable assets.
- Prefer locally stored assets when available.
- Maintain correct aspect ratios with Tailwind object-fit utilities.
- Use appropriate image cropping and responsive sizing.
- Add meaningful alt text.
- Provide fallback backgrounds if an image fails to load.
- Avoid stretched, broken, or empty image placeholders.
- Optimize loading and prevent layout shifts.
- Use professional facility-management, housekeeping, cleaning, and commercial property photographs.

## 16. Premium UI and Responsive Design

The website must look like a professionally designed corporate website, not a generic AI-generated template.

Design guidelines:
- Strong visual hierarchy.
- Balanced whitespace.
- High-quality photographs.
- Clean grids and polished cards.
- Subtle shadows and borders.
- Consistent button styles.
- Restrained gradients.
- Smooth hover effects.
- Lightweight transitions.
- Clear form feedback.
- Responsive layouts for mobile, tablet, and desktop.
- Accessible contrast and keyboard navigation.
- Attractive empty states in admin tables.
- Loading, success, and error states where appropriate.

Avoid excessive rounded cards, too many gradients, repetitive layouts, and unnecessary animations.

## 17. Footer

Create a complete footer with:
- HOMZY SERVICES PRIVATE LIMITED branding.
- Short company introduction.
- Quick navigation links.
- Service links.
- Contact placeholders.
- Book a Service CTA.
- Admin Login link.
- Copyright text.

Include this exact developer credit:

**Designed and development by SOSynch Ai Tech**

## 18. Functional Requirements

Do not create a static-only design. All key interactions must work.

Required functional checks:
1. Navbar links navigate to their correct sections.
2. The Book a Service button opens the booking form.
3. Service-specific buttons preselect the chosen service.
4. Valid booking submissions generate unique booking IDs.
5. Submitted bookings appear immediately in the admin dashboard.
6. Booking data persists in localStorage after a refresh.
7. Admin login works with the specified demo credentials.
8. Admin can update booking statuses and notes.
9. Dashboard counts update automatically.
10. Service management changes are reflected on the public website.
11. Enquiry form submissions appear in the admin panel.
12. CSV export downloads booking data.
13. Search, filters, and sorting work.
14. Modal close buttons and mobile navigation work.
15. Empty states and invalid form submissions are handled correctly.
16. Admin routes work on refresh after deployment.

Use reusable React components, sensible folder structure, centralized mock-data utilities, and consistent localStorage helper functions.

## 19. Deployment and Publishing Readiness

Prepare the project for publishing on Vercel or another static hosting platform.

Requirements:
- Configure a working Vite project.
- Set up Tailwind CSS correctly.
- Include all necessary package scripts.
- Verify `npm install` completes successfully.
- Verify `npm run build` completes without errors.
- Fix missing imports, broken asset paths, and console errors.
- Test all public and admin routes.
- Add SPA fallback/rewrites where required for direct navigation and page refresh.
- Test the booking flow on desktop and mobile.
- Verify localStorage persistence after refresh.
- Verify admin tables and dashboard counts.
- Test all images and provide fallbacks.
- Provide clear instructions for running locally and deploying.
- After deployment, open the actual live URL and verify the key flows.
- Do not claim deployment is complete unless the website has actually been published and tested.

## Final Deliverable

Build a complete, premium, responsive, dynamic facility-management portfolio website for HOMZY SERVICES PRIVATE LIMITED, with working booking functionality from the navbar, a booking form, persistent mock-data storage, a functional demo admin login, booking management, service management, contact enquiries, multiple distinct relevant images, and deployment readiness.

**Highest priority:** Every public booking must be visible and manageable in the Admin Panel, and every major button must perform its intended action.

Technology restriction remains mandatory: React + Vite + Tailwind CSS only, JavaScript only, mock data only, and no database or backend.

Developer credit: Designed and development by SOSynch Ai Tech.




Done so far (written but not yet visible):-
Look and feel: the HOMZY colours (navy, teal, light teal, gold, grey) and a system font.
Images: two custom photos, one for the top banner (a cleaning team in an office lobby) and one for About Us (a supervisor with housekeeping staff). Services, industries and the gallery use free stock photos, with a plain coloured background if a photo fails to load.
Saved demo data: everything is stored in the browser so it survives a refresh. This covers sample bookings and enquiries, the 12 services, 7 industries, sample testimonials, gallery items and editable site text. It also handles booking references like HOM-2026-1005, the demo admin login, grouping repeat bookings into one customer, and CSV export.
Booking form: all the fields you listed, with error messages, a mobile number check and protection against double-submitting. It shows the booking reference on success, and "Book This Service" opens it with that service already chosen.
Public page sections: sticky menu with a mobile menu, top banner, About Us, Services with a details popup, Industries We Serve, Why Choose HOMZY, Our Work with category filters and a large-image popup, demo testimonials, and Contact with a working enquiry form. The footer has the Admin Login link and "Designed and development by SOSynch Ai Tech".

Not finished:-
Connecting the new site to the home page.
The whole Admin Panel: login page, dashboard numbers, and the pages for bookings, services, customers, testimonials, gallery, website text, enquiries and settings.
Page titles and descriptions for search results and link previews.
Testing the booking flow, the admin features and mobile layouts.


clone the repo and work not finished continue and no create a new

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f53a4dc6-6401-4614-b80d-f8caab801874).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
