import React, { useState } from "react";
import { AlignJustify } from "lucide-react";
import NavOverlay from "./Nav";
import { use } from "react";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="self-start absolute top-0 left-0 w-full bg-white h-[7%] flex justify-between items-center p-5">
      <div className="relative flex-1">
        <div className="absolute inset-0 z-40">
          <NavOverlay isOpen={isOpen} setIsOpen={(isopen) => {setIsOpen(isopen)}} />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="relative z-50">
          <AlignJustify className={isOpen ? "text-white" : "text-black"}/>
        </button>
      </div>
      <h1 className="flex-1 text-xl font-bold p-5 self-center text-center">
        Tech Nova
      </h1>
      <div className="flex-1 flex justify-end">
        <h2>Team Name:</h2>
        <p>Tech Nova</p>
      </div>
    </div>
  );
};

export default TopNavbar;
