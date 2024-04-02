"use client";
import { IMDBIcon, RatingIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { updateRating } from "@/services/serveractions";

export const GiveRating = ({ tmdbId, userId, userRating }) => {
  const [rating, setRating] = useState(userRating || 0);
  const handleRatingClick = async (index) => {
    //console.log(index);
    setRating(index);
    const result = await updateRating({ tmdbId, userId, rating: index });
    console.log(result);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        {rating === 0 ? (
          <Button size="sm" className={`w-full bg-orange-400`}>
            Give Rating
          </Button>
        ) : (
          <Button
            size="sm"
            className={`w-full bg-slate-800 text-yellow-600 flex items-center  justify-center gap-1`}
          >
            {rating}
            <RatingIcon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="bg-slate-900 flex flex-row gap-5 items-center justify-center">
        <div className="flex flex-row gap-1 items-center">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} onClick={() => handleRatingClick(i + 1)}>
              <RatingIcon
                className={`cursor-pointer ${
                  i < rating ? "text-yellow-400" : "text-white"
                }`}
              />
            </div>
          ))}
          <div className="text-white">{rating}/10</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
