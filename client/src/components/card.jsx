import { useState } from 'react';
import { BiLike } from 'react-icons/bi';
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { HiMiniShare } from 'react-icons/hi2';

const SimpleProfileCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div class="flex items-center gap-2 px-6">
        <h3 class="text-xl text-gray-800 font-bold flex-1">Backlit Keyboard</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          class="cursor-pointer fill-blue-600 shrink-0"
          viewBox="0 0 64 64"
        >
          <path
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"
          ></path>
        </svg>
      </div>

      <div class="min-h-[300px]">
        <img src="https://readymadeui.com/cardImg.webp" class="w-full my-6" />
      </div>

      <div class="px-6">
        <p class="text-sm text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor.
        </p>

        <div class="mt-8 flex items-center flex-wrap gap-4">
          <h3 class="text-xl text-gray-800 font-bold flex-1">$12.90</h3>
          <button
            type="button"
            class="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 outline-none"
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfileCard;
