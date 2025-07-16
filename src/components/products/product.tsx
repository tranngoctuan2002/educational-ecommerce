"use client";

import Image from "next/image";
import React from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import useGlobal from "@/zustands/globals";
import ProductDetail from "./product-detail";

export type Product = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  shortDescription: string;
  longDescription: string;
  rating: number;
  category: string;
};

type Props = {
  product: Product;
};

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
};

const Product = ({ product }: Props) => {
  const { favorites, updateFavorites } = useGlobal();

  return (
    <div className="flex py-1 bg-white border rounded group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="w-40 h-40 relative mr-2">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 scale-100 transition-transform duration-300"
        />
      </div>
      <div className="w-[80%] flex flex-col">
        <h1 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h1>
        <h2 className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </h2>
        <p>
          <Badge className="bg-blue-600">{product.category}</Badge>
        </p>
        <p className="mt-auto text-2xl font-bold text-blue-600 ">
          {product.price}
        </p>
        <div className="flex items-center gap-2">
          <p className="flex items-center">{renderStars(product.rating)}</p>
          <span>{product.rating}</span>
        </div>
      </div>
      <div className="flex flex-col items-end mr-2 my-1 w-[15%]">
        <div className="ml-auto mr-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              updateFavorites(product.id);
            }}
            variant={"outline"}
          >
            <Heart
              className={`${
                favorites.includes(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </Button>
        </div>
        <div className="mt-auto">
          <ProductDetail product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
