'use client';
import React from "react";
import { GoHeartFill } from "react-icons/go";
import { toggleLike } from "@/actions/likeAction";
import { useOptimistic } from "react";

interface LikeBtnType {
  like: number;
  showCount?: boolean;
  _id: string;
  isLiked: boolean;
}

const LikeBtn = ({ like, _id, isLiked, showCount = true }: LikeBtnType) => {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { likeCount: like, isLiked },
    (optimisticState, newLikeState) => ({
      likeCount: optimisticState.isLiked ? optimisticState.likeCount - 1 : optimisticState.likeCount + 1,
      isLiked: !optimisticState.isLiked,
    })
  );

  console.log(optimisticState.isLiked);

  const handleToggleLike = async () => {
    setOptimisticState('');
    try {
      await toggleLike({ post: _id });
    } catch (error) {
      setOptimisticState('');
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div onClick={handleToggleLike} className="flex gap-1 items-center cursor-pointer">
      <GoHeartFill className={` text-xl ${optimisticState.isLiked ? 'text-red-500' : 'text-secondary/50'} `} />
      {
        showCount && <h1 className="text-secondaryDark/50 font-medium text-xs">
        {optimisticState.likeCount}
      </h1>
      }
    </div>
  );
};

export default LikeBtn;
