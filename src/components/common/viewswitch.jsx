"use client";
import useViewStore from "@/store/viewstore";
import React from "react";

// Adjusted ViewSwitch to accept props for controlling the view
export const ViewSwitch = () => {
  const { view, setView } = useViewStore();
  const isChecked = view === "big";

  const handleCheckboxChange = () => {
    // Toggle the view state between "small" and "big"
    setView(isChecked ? "small" : "big");
  };

  return (
    <>
      <label className="relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div className="shadow-card flex h-[40px] w-[130px] items-center justify-evenly rounded-md bg-gray-900">
          <span
            className={`flex h-9 w-9 px-8 items-center justify-center rounded text-xs ${
              !isChecked ? "bg-red-500 text-white" : "text-body-color"
            }`}
          >
            Small
          </span>
          <span
            className={`flex h-9 w-9 px-8 items-center justify-center rounded text-xs ${
              isChecked ? "bg-red-500 text-white" : "text-body-color"
            }`}
          >
            Big
          </span>
        </div>
      </label>
    </>
  );
};
