import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ProductDetail from "./products/product-detail";
import { Product } from "./products/product";
import { History } from "lucide-react";
import Image from "next/image";

type Props = {
  list: Product[];
};

const HistoryList = ({ list }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex p-5 cursor-pointer text-xl ml-auto">
          <History className="mr-1" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lịch sử xem hàng</SheetTitle>
        </SheetHeader>
        <div>
          {list.length === 0 ? (
            <div className="text-center">Những sản phẩm bạn đã xem</div>
          ) : (
            list.map((product) => (
              <div
                key={product.id}
                className="flex flex-col p-3 justify-between border-y"
              >
                <div className="mb-3 flex items-start">
                  <div className="w-[30%] relative h-20 mr-2">
                    <Image
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.name || "Product image"}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div>
                    <div className="text-xl font-bold">{product.name}</div>
                    <div className="text-blue-500 text-md">{product.price}</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="mr-3">
                    <ProductDetail product={product} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HistoryList;
