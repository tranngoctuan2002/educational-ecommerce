import Combobox, { ComboBoxData } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";

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

const category = [
  {
    label: "Loại",
    value: "all",
  },
  {
    label: "Lớp học",
    value: "class",
  },
  {
    label: "Giáo trình",
    value: "course",
  },
  {
    label: "Sách",
    value: "book",
  },
];

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shawdow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full sm:max-w-xl lg:mx-auto">
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm khoá học, tài liệu, sách..."
                  className="pl-10"
                />
              </div>
              <div className="flex justify-center">
                <div className="mr-1">
                  <Combobox
                    data={category}
                    initialData={category[0]}
                    title="Loại"
                  />
                </div>
                <div className="mr-1">
                  <Combobox data={price} initialData={price[0]} title="Giá" />
                </div>
                <Button className="mr-1">
                  <Sparkles />
                  Gợi ý từ AI
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>Production</div>
      </div>
    </>
  );
}
