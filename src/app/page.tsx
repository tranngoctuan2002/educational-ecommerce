"use client";
import Combobox, { ComboBoxData } from "@/components/combobox";
import { Product } from "@/components/products/product";
import ProductList from "@/components/products/product-list";
import { ProductSkeleton } from "@/components/products/product-skekeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import useGlobal from "@/zustands/globals";
import { MessageCircle, Search, Send, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const price = [
  {
    label: "Tất cả giá",
    value: "All",
  },
  {
    label: "Dưới 500.000",
    value: "U500K",
  },
  {
    label: "500.000 - 1.000.000",
    value: "500K-1M",
  },
  {
    label: "Trên 1.000.000",
    value: "O1M",
  },
] as ComboBoxData[];

const sort = [
  {
    label: "Giảm theo giá",
    value: "desc",
  },
  {
    label: "Tăng theo giá",
    value: "asc",
  },
  {
    label: "A - Z",
    value: "az",
  },
  {
    label: "Z - A",
    value: "za",
  },
] as ComboBoxData[];

type PriceRange = "all" | "U500K" | "500K-1M" | "O1M";
type SortType = "asc" | "desc" | "az" | "za";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortType, setSortType] = useState<SortType>("az");

  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là cố vấn AI của bạn. Hãy cho tôi biết bạn muốn học gì và tôi sẽ gợi ý những sản phẩm phù hợp nhất cho bạn!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const { products, favorites, history, hydrate } = useGlobal();

  useEffect(() => {
    hydrate();
  }, []);

  const { debouncedValue: debouncedSearch, isDebouncing: isSearchDebouncing } =
    useDebounce(searchTerm, 500);

  const { debouncedValue: debouncedFilter, isDebouncing: isFilterDebouncing } =
    useDebounce(priceRange, 500);

  const { debouncedValue: deboundcedSort, isDebouncing: isSortDebouncing } =
    useDebounce(sortType, 500);

  const isDebouncing =
    isSearchDebouncing || isFilterDebouncing || isSortDebouncing;

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPrice = () => {
        switch (priceRange) {
          case "U500K":
            return product.price < 500000;
          case "500K-1M":
            return product.price >= 500000 && product.price <= 1000000;
          case "O1M":
            return product.price > 1000000;
          case "all":
          default:
            return true;
        }
      };

      return matchesSearch && matchesPrice();
    });

    switch (sortType) {
      case "asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "az":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filtered;
    }
  }, [debouncedSearch, debouncedFilter, deboundcedSort]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let response = "Tôi rất sẵn lòng giúp bạn tìm sản phẩm phù hợp! ";

      if (chatInput.toLowerCase().includes("design")) {
        response +=
          "Tôi gợi ý bạn nên xem qua sản phẩm 'UI/UX Design Fundamentals'. Đây là lựa chọn tuyệt vời để học các nguyên lý thiết kế và các công cụ hiện đại.";
      } else if (
        chatInput.toLowerCase().includes("programming") ||
        chatInput.toLowerCase().includes("code")
      ) {
        response +=
          "Các sản phẩm như 'JavaScript Development' và 'Mobile App Development' rất phù hợp để nâng cao kỹ năng lập trình!";
      } else if (
        chatInput.toLowerCase().includes("business") ||
        chatInput.toLowerCase().includes("management")
      ) {
        response +=
          "Sản phẩm 'Business Strategy & Management' sẽ rất thích hợp để phát triển kỹ năng lãnh đạo và tư duy chiến lược.";
      } else if (
        chatInput.toLowerCase().includes("data") ||
        chatInput.toLowerCase().includes("analytics")
      ) {
        response +=
          "Tôi rất khuyến khích bạn xem qua sản phẩm 'Data Science with Python' để học phân tích dữ liệu và các kỹ thuật machine learning.";
      } else {
        response +=
          "Dựa trên sở thích của bạn, tôi gợi ý bạn nên duyệt qua danh mục sản phẩm của chúng tôi. Có thể bạn sẽ quan tâm đến sản phẩm 'AI Fundamentals' hoặc 'Digital Marketing'!";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setChatInput("");
  };

  const getSuggestions = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userInteractions = [...favorites, ...history];
      const interactedProducts = products.filter((p) =>
        userInteractions.includes(p.id)
      );

      if (interactedProducts.length === 0) {
        setSuggestions(products.filter((p) => p.rating >= 4.7).slice(0, 4));
      } else {
        const categories = interactedProducts.map((p) => p.category);
        const suggestedProducts = products
          .filter(
            (p) =>
              categories.includes(p.category) &&
              !userInteractions.includes(p.id)
          )
          .slice(0, 4);

        setSuggestions(suggestedProducts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border flex flex-col z-50 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between p-4 border-b rounded-t-lg bg-gray-700">
            <div className="flex items-center gap-2 ">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">
                  Cố vấn gia AI
                </h3>
                <p className="text-xs text-green-500">Đang hoạt động</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-red-500 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[85%]">
                  {!message.isUser && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.isUser
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-900 shadow-sm border rounded-bl-sm"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleChatSubmit}
            className="p-3 border-t bg-white rounded-b-lg"
          >
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Hãy đặt câu hỏi bạn muốn..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" className="h-9 w-9">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 z-40"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </Button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shawdow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-xl lg:mx-auto">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm khoá học, tài liệu, sách..."
                  className="pl-10"
                  defaultValue={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  className="mr-1 cursor-pointer"
                  onClick={getSuggestions}
                  disabled={isLoading}
                >
                  <Sparkles />
                  {isLoading ? "..." : "Gợi ý từ AI"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <article>
          {isLoading ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 " />
                Gợi ý từ AI
              </h2>
              <div>
                {Array.from({ length: 4 }, (_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            suggestions.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 overflow-hidden">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 " />
                  Gợi ý từ AI
                </h2>
                <div className="overflow-y-auto py-3">
                  <ProductList products={suggestions} />
                </div>
              </div>
            )
          )}
        </article>
        <div className="flex justify-around flex-col md:flex-row">
          <aside className="md:w-[20%] w-full md:mr-5 mb-5 px-1 border relative rounded">
            <h1 className="text-xl font-bold my-3 mx-2">Bộ lọc</h1>
            <div className="md:mx-1 my-1">
              <Combobox
                data={price}
                initialData={price[0]}
                title="Giá"
                selected={priceRange}
                setSelected={(selected) =>
                  setPriceRange(selected as PriceRange)
                }
              />
            </div>
          </aside>

          <article className="md:w-[80%] w-full">
            <div className="flex justify-end mx-3 mb-3">
              <div>
                <Combobox
                  title={"Sắp xếp"}
                  selected={sortType}
                  setSelected={(selected) => setSortType(selected as SortType)}
                  data={sort}
                />
              </div>
            </div>
            <div className="px-3">
              {isDebouncing ? (
                <ProductSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm sản phẩm tương ứng
                  </h3>
                  <p className="text-gray-600">
                    Hãy điều chỉnh lại thông tin tìm kiếm hoặc bộ lọc
                  </p>
                </div>
              ) : (
                <ProductList products={filteredProducts} />
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
