"use client";

import { Heart } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const [touch, setTouch] = useState<boolean>(false);

  return (
    <nav>
      <div className="flex shadow-2xl shawdow mb-5 items-center">
        <div className="p-5 text-2xl font-bold">Educational E-commerce</div>
        <div className="p-5 ml-auto">Category</div>
        <div className="flex p-5 cursor-pointer text-xl">
          <Heart className="mr-1 transition-all duration-1000 hover:animate-bounce hover:fill-pink-500" />
          <span>0</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
