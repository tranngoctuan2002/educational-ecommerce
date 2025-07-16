"use client";

import Product from "./product";
import type { Product as ProductType } from "./product";

type Props = {
  products: ProductType[];
};

// Mock product data

const ProductList = ({ products }: Props) => {
  return (
    <>
      <div className="w-full">
        {products.map((product) => {
          return (
            <div key={product.id} className="mb-3">
              <Product key={product.id} product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
