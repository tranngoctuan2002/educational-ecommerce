import { Product } from "@/components/products/product";
import React from "react";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  favorites: string[];
  history: string[];
  products: Product[];
};

type Action = {
  hydrate: () => void;
  updateFavorites: (productId: string) => void;
  updateHistory: (productId: string) => void;
};

const mockProducts = [
  {
    id: "course-001",
    name: "English for Beginners",
    price: 450000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Learn basic English communication.",
    longDescription:
      "This beginner course helps learners improve communication with native teachers, includes exercises and live sessions. Perfect for those starting their English learning journey with interactive content and personalized feedback.",
    rating: 4.5,
    category: "Language",
  },
  {
    id: "course-002",
    name: "Advanced JavaScript Development",
    price: 750000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Master modern JavaScript concepts and frameworks.",
    longDescription:
      "Comprehensive JavaScript course covering ES6+, async programming, frameworks like React and Vue, and advanced concepts. Includes real-world projects and industry best practices.",
    rating: 4.8,
    category: "Programming",
  },
  {
    id: "course-003",
    name: "Digital Marketing Mastery",
    price: 600000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Complete guide to digital marketing strategies.",
    longDescription:
      "Learn SEO, social media marketing, content marketing, email campaigns, and analytics. Includes case studies from successful campaigns and hands-on projects.",
    rating: 4.6,
    category: "Marketing",
  },
  {
    id: "course-004",
    name: "UI/UX Design Fundamentals",
    price: 550000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Design beautiful and functional user interfaces.",
    longDescription:
      "Master the principles of user experience and interface design. Learn design thinking, prototyping, user research, and modern design tools like Figma and Adobe XD.",
    rating: 4.7,
    category: "Design",
  },
  {
    id: "course-005",
    name: "Data Science with Python",
    price: 850000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Analyze data and build machine learning models.",
    longDescription:
      "Complete data science course covering Python, pandas, numpy, matplotlib, scikit-learn, and machine learning algorithms. Includes real datasets and industry projects.",
    rating: 4.9,
    category: "Data Science",
  },
  {
    id: "course-006",
    name: "Photography Basics",
    price: 400000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Learn the art of photography from scratch.",
    longDescription:
      "Master camera settings, composition, lighting, and post-processing. Suitable for beginners with any camera type, from smartphones to professional DSLRs.",
    rating: 4.4,
    category: "Creative",
  },
  {
    id: "course-007",
    name: "Business Strategy & Management",
    price: 700000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Strategic thinking for business success.",
    longDescription:
      "Learn strategic planning, leadership, team management, and business development. Includes case studies from Fortune 500 companies and practical frameworks.",
    rating: 4.5,
    category: "Business",
  },
  {
    id: "course-008",
    name: "Mobile App Development",
    price: 900000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Build native and cross-platform mobile apps.",
    longDescription:
      "Complete mobile development course covering React Native, Flutter, and native iOS/Android development. Build and deploy real apps to app stores.",
    rating: 4.8,
    category: "Programming",
  },
  {
    id: "course-009",
    name: "Financial Planning & Investment",
    price: 650000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Master personal finance and investment strategies.",
    longDescription:
      "Learn budgeting, saving, investing in stocks, bonds, real estate, and retirement planning. Includes practical tools and calculators for financial planning.",
    rating: 4.6,
    category: "Finance",
  },
  {
    id: "course-010",
    name: "Artificial Intelligence Fundamentals",
    price: 1200000,
    thumbnail: "/placeholder.svg?height=200&width=300",
    shortDescription: "Introduction to AI and machine learning concepts.",
    longDescription:
      "Comprehensive AI course covering machine learning, deep learning, neural networks, and practical applications. Includes hands-on projects with TensorFlow and PyTorch.",
    rating: 4.9,
    category: "AI/ML",
  },
];

const useGlobal = create<State & Action>((set) => ({
  favorites: [] as string[],
  history: [] as string[],
  products: mockProducts,
  hydrate: () => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const history = JSON.parse(localStorage.getItem("history") || "[]");
      set({ favorites, history });
    }
  },
  updateFavorites: (productId: string) =>
    set((state) => {
      const isFavorite = state.favorites.includes(productId);
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId];

      const title = isFavorite
        ? "Bỏ khỏi Danh Sách Yêu Thích"
        : "Thêm vào Danh Sách Yêu Thích";

      const description = isFavorite
        ? "Sản phẩm đã bị bỏ khỏi Danh Sách Yêu Thích"
        : "Sản phẩm đã được thêm vào Danh Sách Yêu Thích";
      toast(
        <div>
          <div>{title}</div>
          <div className="text-gray-600">{description}</div>
        </div>
      );

      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      return { favorites: newFavorites };
    }),
  updateHistory: (productId: string) =>
    set((state) => {
      const isInHistory = state.history.includes(productId);

      let newHistory = [] as string[];

      if (isInHistory) {
        const index = state.history.findIndex(
          (product) => product === productId
        );
        const updatedHistory = [...state.history];
        updatedHistory.splice(index, 1);
        newHistory = [productId, ...updatedHistory];
      } else {
        newHistory = [productId, ...state.history];
      }

      localStorage.setItem("history", JSON.stringify(newHistory));

      return { history: newHistory };
    }),
}));

export default useGlobal;
