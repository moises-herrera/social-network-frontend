import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FeedContent } from "src/feed/components";
import { getFullName } from "src/helpers";
import { useScrollPagination } from "src/hooks";
import { ProfileHeader } from "src/profile/components";
import { ListContainer, Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { getUserPosts, setUserPosts } from "src/store/post";
import { AppDispatch } from "src/store/types";
import {
  closeFollowersModal,
  closeFollowingModal,
  closeLeftSidebar,
  closeLikesModal,
} from "src/store/ui";
import { getUser } from "src/store/users";

export default function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userPosts, isLoadingUserPosts, userPostsTotal } = useTypedSelector(
    ({ post }) => post
  );
  const { userProfile, userProfileLoading } = useTypedSelector(
    ({ users }) => users
  );
  const {
    isFollowersModalOpen,
    isFollowingModalOpen,
    isLeftSidebarOpen,
    isLikeModalOpen,
  } = useTypedSelector(({ ui }) => ui);

  const { page, setPage } = useScrollPagination({
    isLoading: isLoadingUserPosts,
    currentRecords: userPosts.length,
    total: userPostsTotal,
  });

  useEffect(() => {
    if (userProfile)
      dispatch(
        getUserPosts({
          userId: userProfile._id,
          limit: 10,
          page,
        })
      );
  }, [dispatch, userProfile, page]);

  useEffect(() => {
    setPage(1);
  }, [userProfile?._id]);

  useEffect(() => {
    if (username) {
      dispatch(getUser(username));
      dispatch(setUserPosts([]));

      if (isFollowersModalOpen) dispatch(closeFollowersModal());
      if (isFollowingModalOpen) dispatch(closeFollowingModal());
      if (isLikeModalOpen) dispatch(closeLikesModal());
      if (isLeftSidebarOpen) dispatch(closeLeftSidebar());
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (userProfile) {
      document.title = `${getFullName(userProfile)} (@${userProfile.username})`;
    }

    return () => {
      document.documentElement.scrollTop = 0;
    };
  }, [userProfile]);

  return (
    <section className="section-content">
      {!userProfileLoading && userProfile ? (
        <>
          <ProfileHeader user={userProfile} />

          <div className="mt-[300px] lg:mt-28">
            {!userPosts.length && isLoadingUserPosts ? (
              <div className="loading-container">
                <Loading textClass="text-black" />
              </div>
            ) : (
              <ListContainer isLoading={isLoadingUserPosts}>
                <FeedContent posts={userPosts} />
              </ListContainer>
            )}
          </div>
        </>
      ) : (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      )}
    </section>
  );
}
