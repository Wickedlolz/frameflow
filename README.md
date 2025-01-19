# FrameFlow 📸

[![Netlify Status](https://api.netlify.com/api/v1/badges/94a8b984-f510-4d86-b3fc-3d7029566452/deploy-status)](https://app.netlify.com/sites/frameflowx/deploys)

A modern image discovery platform built with Next.js 15.1.4, enabling users to explore, collect, and interact with high-quality images through a seamless interface.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.io/)

## ✨ Features

### Core Functionality

-   🖼️ **Image Discovery** - Browse through a vast collection of high-quality images
-   📂 **Collections** - Explore and create curated themed image collections
-   🔐 **Authentication** - Secure user authentication powered by Supabase
-   ❤️ **Like System** - Save and organize favorite images
-   🔄 **Infinite Scrolling** - Smooth content loading with React Query
-   📱 **Responsive Design** - Optimized for all device sizes
-   🌓 **Dark Mode** - Built-in dark/light theme support
-   🔍 **Search** - Advanced search for images and collections

## 🛠️ Technology Stack

### Frontend

-   **Framework**: Next.js 15.1.4 (App Router)
-   **Language**: TypeScript
-   **Styling**:
    -   Tailwind CSS for utility-first styling
    -   shadcn/ui for component library
-   **Animations**: Framer Motion

### Backend & Data

-   **State Management**: React Query
-   **Authentication**: Supabase Auth
-   **Database**: Supabase
-   **Image Service**: Unsplash API

## 📁 Project Structure

```
src/
├── actions/          # Server actions for API calls
├── app/             # Next.js app router pages
├── components/      # Reusable React components
│   ├── collections/ # Collection-related components
│   ├── images/      # Image handling components
│   └── auth/        # Authentication components
├── interfaces/      # TypeScript interfaces
├── lib/            # Utility functions and configurations
└── utils/          # Helper functions
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Supabase account
-   Unsplash API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/frameflow.git
cd frameflow
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## 🔑 Key Components

### Collections System

-   `CollectionsGrid`: Masonry grid layout for collections
-   `CollectionHeader`: Collection metadata and actions
-   `CollectionPhotos`: Photo grid with lazy loading

### Image Handling

-   `ImageCard`: Responsive image card with hover effects
-   `ImageDetails`: Modal with image details and actions
-   `ImageLightbox`: Fullscreen image viewer with gestures

### Authentication

-   Protected routes with middleware
-   Social authentication integration
-   Profile management system

## 📝 Development Guidelines

### Component Development

-   Prefer server components for better performance
-   Implement proper TypeScript types
-   Follow atomic design principles

### Styling Best Practices

-   Use Tailwind CSS utility classes
-   Maintain consistent spacing
-   Ensure dark mode compatibility

### State Management

-   Use React Query for remote data
-   Implement optimistic updates
-   Handle loading and error states

### Performance Optimization

-   Implement image lazy loading
-   Use proper caching strategies
-   Optimize bundle size

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m 'Add amazing feature'
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   [Next.js](https://nextjs.org/) - The React Framework
-   [Supabase](https://supabase.io/) - Open source Firebase alternative
-   [Unsplash](https://unsplash.com/) - Beautiful free images
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
