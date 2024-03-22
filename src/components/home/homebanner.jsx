"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Movies } from "../../../data/dummydata";
import { IMDBIcon } from "@/lib/icons";
import { HomeBannerCard, HomeBannerCardLoader } from "../common/homebannercard";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getIdsForSearch } from "@/lib/utils";
import { getTrending } from "@/services/tmdb";
import { getWatchStatus } from "@/services/serveractions";
import { useState } from "react";

const baseURL = "https://image.tmdb.org/t/p/w500";

export const HomeBanner = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending(),
  });

  const ids = data ? getIdsForSearch(data) : [];
  //console.log(data);
  const {
    data: watchdata,
    isLoading: isWatchStatusLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingwatch", { userId: session?.user?.id, tmdbIds: ids }],
    queryFn: () =>
      getWatchStatus({
        userId: session?.user?.id,
        tmdbIds: ids,
      }),
    enabled: !!session?.user?.id && ids.length > 0,
  });
  console.log("watchdata", watchdata);
  const [api, setApi] = useState();
  const autoplay = api?.plugins()?.autoplay;
  //console.log("api", api);
  //console.log("api", api?.plugins()?.autoplay);

  if (isLoading || !data) {
    return <HomeBannerCardLoader />;
  }
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          {!isLoading &&
            data?.results.map((movie, i) => {
              const matchingWatchData = watchdata?.find(
                (watchItem) => watchItem.tmdbId === movie.id
              );
              return (
                <CarouselItem key={i}>
                  <HomeBannerCard
                    data={movie}
                    watchStatus={
                      matchingWatchData ? matchingWatchData.watchStatus : ""
                    }
                    refetch={refetch}
                    autoplay={autoplay}
                  />
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
