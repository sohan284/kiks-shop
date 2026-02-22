# 👟 Kiks Shop - Premium Sneaker E-commerce

Kiks Shop is a modern, high-performance sneaker e-commerce frontend built with **Next.js 15**, **Redux Toolkit**, and **Tailwind CSS**. It features a premium design, responsive layouts, and a seamless shopping experience.

![Kiks Shop Banner](src/assets/shoe1.png)

## 🌟 Features

- **Dynamic Product Gallery**: Custom-built gallery for desktop and mobile without heavy external dependencies.
- **Interactive Cart System**: Fully integrated with Redux for state management, featuring real-time quantity updates and subtotal calculations.
- **Responsive Design**: Mobile-first approach ensuring a stunning look on all devices.
- **Optimized Data Fetching**: Utilizes RTK Query for efficient API interactions and caching.
- **Skeleton Loaders**: Polished loading states to improve perceived performance.
- **Clean Architecture**: Separation of server and client components for better SEO and maintainability.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Swiper](https://swiperjs.com/) (for sliders) & CSS Animations
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Live Demo

[Visit Kiks Shop Live](https://kiks-shop.vercel.app/)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kiks-shop.git
   cd kiks-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/              # Next.js App Router (Pages & Layouts)
├── assets/           # Static images and assets
├── components/       # Reusable UI components
│   ├── cart/         # Cart-specific components
│   ├── common/       # Shared components (Navbar, Footer, Buttons)
│   ├── home/         # Homepage sections
│   ├── product/      # Product-related components
│   └── ui/           # Shadcn base components
├── features/         # Redux slices and logic
├── lib/              # Utilities and store configuration
└── services/         # API service definitions (RTK Query)
```

## 📝 Architecture Notes

- **Client vs Server Components**: We follow the pattern of using clean Server Components for routes (e.g., `app/product/[id]/page.tsx`) and delegating interactive UI to dedicated Client Components (e.g., `ProductDetailsContent.tsx`).
- **State Management**: Redux is used for global application state (like the cart), while RTK Query handles all server state and caching.
- **Modular Components**: Components are broken down into small, reusable pieces located in functional subdirectories.

---

Built with ❤️ by Md. Sohanur Rahman