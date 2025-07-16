"use client";

import useGlobal from "@/zustands/globals";
import { Heart, History } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Product } from "./products/product";
import { Button } from "./ui/button";
import ProductDetail from "./products/product-detail";
import FavoritesList from "./favorites-list";
import HistoryList from "./history-list";

type Props = {};

type SheetProps = {
  trigger: React.ReactElement;
  title: string;
  list: Product[];
};

const CustomSheet = ({ trigger, title, list }: SheetProps) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div>
          {list.length === 0 ? (
            <div className="text-center">Danh sách rỗng</div>
          ) : (
            list.map((product) => (
              <div
                key={product.id}
                className="flex flex-col p-3 justify-between border-y"
              >
                <div className="mb-3">
                  <div className="text-xl font-bold">{product.name}</div>
                  <div className="text-blue-500 text-md">{product.price}</div>
                </div>
                <div className="flex justify-end">
                  <div className="mr-3">
                    <ProductDetail product={product} />
                  </div>
                  <div>
                    <Button className="w-full" variant={"outline"}>
                      Xoá
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

const Navbar = (props: Props) => {
  const { favorites, products, history } = useGlobal();

  return (
    <nav>
      <div className="flex shadow-2xl shawdow mb-5 items-center">
        <div className="p-5 text-2xl font-bold">Educational E-commerce</div>
        <div className="ml-auto">
          <FavoritesList
            list={
              favorites
                .map((id) => products.find((product) => product.id === id))
                .filter(Boolean) as Product[]
            }
          />
          <HistoryList
            list={
              history
                .map((id) => products.find((product) => product.id === id))
                .filter(Boolean) as Product[]
            }
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
