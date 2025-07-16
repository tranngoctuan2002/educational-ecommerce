"use client";

import useGlobal from "@/zustands/globals";
import { Product } from "./products/product";
import FavoritesList from "./favorites-list";
import HistoryList from "./history-list";

const Navbar = () => {
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
