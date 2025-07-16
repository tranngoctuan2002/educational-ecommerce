import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Product, renderStars } from "./product";
import Image from "next/image";
import { Heart } from "lucide-react";
import useGlobal from "@/zustands/globals";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const { favorites, updateFavorites, updateHistory } = useGlobal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => updateHistory(product.id)}>Xem chi tiết</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-40 my-2">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span>{product.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              onClick={() => updateFavorites(product.id)}
            >
              <Heart
                size={20}
                className={`${
                  favorites.includes(product.id)
                    ? "fill-red-500 text-red-600"
                    : "text-gray-600"
                }`}
              />
              <span>Yêu thích</span>
            </Button>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-600 ">{product.price}</div>
        <div>
          <p className="text-md font-medium">Mô tả sản phẩm</p>
          <p className="text-gray-600">{product.longDescription}</p>
        </div>
        <DialogFooter className="flex-col sm:flex-row">
          <Button className="sm:w-[50%] w-full bg-blue-500 hover:bg-blue-400 p-5 text-md">
            Mua ngay
          </Button>
          <Button variant={"outline"} className="sm:w-[50%] w-full p-5 text-md">
            Thêm vào giỏ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
