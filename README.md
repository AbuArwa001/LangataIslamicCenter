# Langata Islamic Center (LIC) - Frontend

A modern, high-performance, and SEO-optimized web application for the Langata Islamic Center, built with Next.js 15.

## 🌟 Features

- **Dynamic Project Management**: Browse and support various community projects and campaigns.
- **Multi-Provider Donation System**:
  - **M-Pesa**: Integrated via Safaricom Daraja API (STK Push).
  - **Paystack**: Seamless payment processing for cards and mobile money.
  - **Stripe**: International payment support.
  - **PayPal**: Global payment integration.
  - **Bank Transfer**: Direct bank details for offline donations.
- **SEO Optimized**:
  - Server-Side Rendering (SSR) and React Server Components (RSC) for maximum indexability.
  - Dynamic metadata generation for project pages.
  - Optimized bundle size and minimal layout shift.
- **Modern UI/UX**:
  - Responsive design for all devices.
  - Loading skeletons and streaming UI for perceived performance.
  - Interactive elements powered by Lucide React and Framer Motion.
- **Admin Dashboard**: Secure interface for managing donations, projects, and site content.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Hooks & Server Components
- **Authentication**: Firebase Authentication

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbuArwa001/LangataIslamicCenter.git
   cd LangataIslamicCenter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # Add other required keys
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://www.langataislamiccenter.org](http://www.langataislamiccenter.org) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (Home, Donation, Layout, etc.).
- `src/lib`: Utility functions and API clients.
- `src/data`: Static data and constants.
- `public`: Static assets (images, icons, etc.).

## 📜 License

This project is licensed under the MIT License.
