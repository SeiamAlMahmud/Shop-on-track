"use client"
import { useState } from "react";
// icons
import { IoChevronDown } from "react-icons/io5";

const Select = () => {
  // close the dropdown if clicked outside
  document.addEventListener("click", function (event) {
    let target = event.target;

    if (!target.closest(".dropdown")) {
      setIsActive(false);
    }
  });

  // actions
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState("Select Option");

  const optionArray = ["Customer", "Seller", "Courier"];

  const handleClick = (e) => {
    e.stopPropagation(); // Prevents the click from affecting other elements
    setIsActive(!isActive);
  };

  const handleOptionClick = (e) => {
    setContent(e.target.textContent);
    setIsActive(false);
  };

  return (
    <button
      className="bg-[#fff] border border-[#d1d1d1] rounded-xl justify-between px-3 py-1 flex items-center gap-8 relative cursor-pointer dropdown w-full"
      onClick={handleClick}
    >
      {content}
      <IoChevronDown
        className={`${
          isActive ? " rotate-[180deg]" : " rotate-0"
        } transition-all duration-300 text-[1.2rem]`}
      />
      <div
        className={`${
          isActive ? " opacity-100 scale-[1]" : " opacity-0 scale-[0.8]"
        } w-full absolute top-12 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {optionArray.map((option, index) => (
          <p
            className="py-2 px-4 hover:bg-[#ececec] transition-all duration-200"
            key={index}
            onClick={handleOptionClick}
          >
            {option}
          </p>
        ))}
      </div>
    </button>
  );
};

export default Select;
