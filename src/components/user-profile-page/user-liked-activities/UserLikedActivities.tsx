import { useQuery } from "@tanstack/react-query";
import { useActivityCard } from "@utils/activity/activity-card-store";
import { useUser } from "@utils/user/user-store";
import { useEffect } from "react";
import UserProfileActivitiesSectionAndList from "../UserProfileActivitiesSectionAndList";

const UserLikedActivities = () => {
  const { user } = useUser();
  const { getUsersLikedActivities } = useUser();
  const {
    cardType,
    activityCardPageContext,
    setActivityCardPageContext,
    setActivityCardType,
  } = useActivityCard();
  const {
    data: likedActivities,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["likedActivities"],
    queryFn: () => getUsersLikedActivities(user?.id ?? ""),
    enabled: !!user?.id,
    refetchInterval: 1000 * 2, // 2 seconds
  });

  useEffect(() => {
    if (activityCardPageContext !== "likedActivities") {
      setActivityCardPageContext("likedActivities");
    }
    if (cardType !== "user-profile") {
      setActivityCardType("user-profile");
    }
  }, [
    activityCardPageContext,
    cardType,
    setActivityCardPageContext,
    setActivityCardType,
  ]);
  return (
    <UserProfileActivitiesSectionAndList
      title="Liked Activities"
      activities={likedActivities ? likedActivities : []}
      emptyMessage="You haven't liked any activity yet."
    />
  );
};

export default UserLikedActivities;
