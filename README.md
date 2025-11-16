# Photo Gallery App

A modern React photo gallery application that fetches and displays photos from Lorem Picsum API with infinite scroll and detailed photo views.

## Features

- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🖼️ **Photo Grid**: Display photos in an adaptive grid layout
- 🔄 **Infinite Scroll**: Automatically loads more photos as you scroll
- 🔍 **Photo Details**: Click on any photo to view detailed information
- 🎯 **Navigation**: React Router powered navigation with clean URLs
- ⚡ **Performance**: Optimized with React hooks (useMemo, useCallback)
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- 📤 **Download**: Direct links to download high-resolution photos

## Technology Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Lorem Picsum API** - Photo data source

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PhotoCard.jsx   # Individual photo card
│   ├── PhotoGrid.jsx   # Photo grid layout
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   └── Header.jsx
├── hooks/              # Custom React hooks
│   ├── usePhotoList.js    # Photo list logic with infinite scroll
│   ├── usePhotoDetail.js  # Individual photo details
│   └── useInfiniteScroll.js # Infinite scroll behavior
├── pages/              # Page components
│   ├── PhotoList/      # Photo gallery page
│   └── PhotoDetail/    # Photo detail page
├── constants/
│   └── paths.js        # API endpoints and route paths
├── App.jsx            # Main app component with routing
└── main.jsx           # App entry point
```

## API Endpoints

The app uses the following Lorem Picsum API endpoints:

- **Photo List**: `https://picsum.photos/v2/list?page={page}&limit={limit}`
- **Photo Info**: `https://picsum.photos/id/{id}/info`

## Key Features Implementation

### Infinite Scroll

- Custom hook `useInfiniteScroll` manages scroll detection
- Automatically loads more photos when user reaches bottom
- Shows loading indicators during fetch operations
- Handles end-of-list scenarios gracefully

### Photo Details

- Clean URLs like `/photos/123` for individual photos
- Back navigation support
- Full-size image display with fallback handling
- Author information and photo metadata
- Direct download and external links

### Performance Optimizations

- **Memoization**: Components wrapped with `memo()` to prevent unnecessary re-renders
- **Callback Optimization**: `useCallback` for event handlers
- **Value Memoization**: `useMemo` for computed values
- **Lazy Loading**: Images load only when needed
- **Error Boundaries**: Graceful error handling and recovery

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Adaptive grid that adjusts to screen size:
  - 1 column on mobile
  - 2-3 columns on tablet
  - 4-5 columns on desktop
- Touch-friendly interfaces
- Optimized loading states for mobile

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports ES6+ features
