# FrameFlow - Image Discovery Platform

FrameFlow is a modern web application built with Next.js 15.1.4 that allows users to explore, collect, and interact with high-quality images. It features a seamless user experience with infinite scrolling, image collections, and user authentication.

## 🚀 Features

-   **Image Discovery**: Browse through a vast collection of high-quality images
-   **Collections**: Explore curated collections of themed images
-   **Authentication**: Secure user authentication with Supabase
-   **Like System**: Users can like and save their favorite images
-   **Infinite Scrolling**: Smooth loading of content with React Query
-   **Responsive Design**: Fully responsive UI with Tailwind CSS
-   **Dark Mode**: Built-in dark mode support
-   **Search**: Search functionality for both images and collections

## 🛠 Tech Stack

-   **Framework**: Next.js 15.1.4 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **State Management**: React Query
-   **Authentication**: Supabase Auth
-   **Database**: Supabase
-   **Image Service**: Unsplash API
-   **Animations**: Framer Motion

## 📁 Project Structure

src/

├── actions/ # Server actions for API calls

├── app/ # Next.js app router pages

├── components/ # Reusable React components

├── interfaces/ # TypeScript interfaces

├── lib/ # Utility functions and configurations

└── utils/ # Helper functions

## 🚦 Getting Started

1. Clone the repository:

2. Install dependencies:

    `npm install`

3. Set up environment variables:

    `NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`

    `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`

    `UNSPLASH_ACCESS_KEY=your_unsplash_access_key`

4. Run the development server:

    `npm run dev`

## 🔑 Key Components

### Collections System

-   `CollectionsGrid`: Displays collections in a grid layout with infinite scroll
-   `CollectionHeader`: Shows collection details and metadata
-   `CollectionPhotos`: Renders photos within a collection

### Image Handling

-   `ImageCard`: Reusable component for displaying individual images
-   `ImageDetails`: Shows detailed view of an image
-   `ImageLightbox`: Full-screen image viewer

### Authentication

-   Supabase authentication integration
-   Protected routes for authenticated users
-   User profile management

## 📝 Development Guidelines

1. **Component Structure**:

    - Use client components only when necessary
    - Keep components small and focused
    - Implement proper TypeScript types

2. **Styling**:

    - Use Tailwind classes for styling
    - Follow the project's color scheme
    - Maintain dark mode compatibility

3. **State Management**:

    - Use React Query for server state
    - Implement proper loading states
    - Handle errors gracefully

4. **Performance**:
    - Implement proper image optimization
    - Use pagination/infinite scroll
    - Optimize component re-renders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
