import { FollowingCard, FollowingCardLoader } from "./followingcard";

export const FollowingContainer = ({ data, type, refetch }) => {
  return (
    <div className="flex flex-col w-full">
      {data.length > 0 ? (
        data.map((item, i) => (
          <FollowingCard key={i} data={item} type={type} refetch={refetch} />
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-center">
          No Users available
        </div>
      )}
    </div>
  );
};
