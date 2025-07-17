# Educational E-commerce Platform

A modern, responsive frontend website for an educational e-commerce platform that offers courses, learning materials, and online classes with AI-powered suggestions.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **Zustand** - State management

## ✨ Features

### Core Functionality

- **Product Listing**: Display educational courses with comprehensive details
- **Search, Filter & Sort**: Real-time search with debouncing and price range filtering
- **AI Suggestions**: Smart course recommendations based on user behavior
- **Product Details Modal**: Detailed course information with smooth animations
- **Favorites System**: Add/remove courses from favorites with localStorage persistence
- **Viewing History**: Track recently viewed courses

### Advanced Features

- **AI Chatbot Advisor**: Interactive chat for course recommendations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Graceful error messages and fallbacks
- **Toast Notifications**: User feedback for actions
- **Local Storage**: Persistent favorites and viewing history

### UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Mobile-First**: Responsive design principles
- **Visual Feedback**: Loading states and success indicators

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or download the project files**

   ```
   git clone <repository-url>
   cd education-ecomerce

   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Run the development server**

   ```
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│ ├── globals.css # Global styles and Tailwind
│ ├── layout.tsx # Root layout component
│ └── page.tsx # Main application component
├── components/ui/ # Shadcn/ui components
│ ├── button.tsx
│ ├── card.tsx
│ ├── dialog.tsx
│ ├── input.tsx
│ ├── tabs.tsx
│ └── ...
└── hooks/
└── zustand/
```

## 🎯 Functionalities Included

### Product Management

- ✅ Display 10+ mock educational courses
- ✅ Product cards with thumbnails, ratings, and pricing
- ✅ Detailed product modal with full descriptions
- ✅ Category-based organization

### Search & Filtering

- ✅ Real-time search by course name and description
- ✅ Price range filtering (< 500K, 500K-1M, > 1M)
- ✅ Combined search and filter functionality
- ✅ Debounced search input

### AI Features

- ✅ Smart course suggestions based on user behavior
- ✅ Loading states with skeleton components
- ✅ Error handling for API failures
- ✅ Interactive chatbot for course recommendations

### User Experience

- ✅ Favorites system with heart icons
- ✅ Viewing history tracking
- ✅ Toast notifications for user actions
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions

### Data Persistence

- ✅ localStorage for favorites
- ✅ localStorage for viewing history
- ✅ Session persistence across browser refreshes

## 🔮 Future Improvements

- **User Authentication**: Login/register functionality
- **Shopping Cart**: Add courses to cart and checkout
- **Course Progress**: Track learning progress
- **Reviews & Ratings**: User-generated course reviews
- **Advanced AI**: More sophisticated recommendation algorithms
- **Payment Integration**: Stripe or PayPal integration
- **Course Videos**: Video player integration
- **Instructor Profiles**: Detailed instructor information
- **Certificates**: Course completion certificates
- **Social Features**: Course sharing and discussions

## 🎨 Design Features

- **Color Scheme**: Professional blue, black, white and gray palette
- **Typography**: Inter font for excellent readability
- **Icons**: Lucide React for consistent iconography
- **Animations**: Smooth hover effects and transitions
- **Layout**: Scroll view responsive design
- **Components**: Reusable, modular component architecture

## 📱 Mobile Optimization

- Responsive scroll view layouts
- Touch-friendly buttons and interactions
- Optimized modal sizes for mobile screens
- Swipe-friendly card interfaces
- Mobile-optimized navigation

## 🚀 Performance Features

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components load as needed
- **Efficient Rendering**: React 18 concurrent features
- **Minimal Bundle**: Tree-shaking and optimization

This platform provides a solid foundation for an educational e-commerce website with modern web development practices and user-centric design principles.
