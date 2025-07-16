import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { title } from "process";
import ProductDetail from "./products/product-detail";
import { Button } from "./ui/button";
import { Product } from "./products/product";
import { Heart } from "lucide-react";
import useGlobal from "@/zustands/globals";
import Image from "next/image";

type Props = {
  list: Product[];
};

const FavoritesList = ({ list }: Props) => {
  const { favorites, updateFavorites } = useGlobal();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex p-5 cursor-pointer text-xl ml-auto">
          <Heart className="mr-1" />
          <span>{favorites.length}</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Danh sách yêu thích</SheetTitle>
        </SheetHeader>
        <div>
          {list.length === 0 ? (
            <div className="text-center">
              Hãy thêm những sản phẩm yêu thích của bạn
            </div>
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
                  <div>
                    <Button
                      className="w-full"
                      variant={"outline"}
                      onClick={() => updateFavorites(product.id)}
                    >
                      <Heart
                        className={`${
                          favorites.includes(product.id) &&
                          "fill-red-500 text-red-500"
                        }`}
                      />
                    </Button>
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

export default FavoritesList;
