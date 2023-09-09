import { Avatar, Heading, Text } from "@chakra-ui/react";
import "./ProfileHeader.css";
import { FollowButton } from "src/shared/components";
import { getFullName, hasFollower } from "src/helpers";
import { User } from "src/interfaces";
import { useTypedSelector } from "src/store";
import avatarPlaceholder from "src/assets/images/avatar-placeholder.png";

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const { user: currentUser } = useTypedSelector(({ auth }) => auth);

  return (
    <header className="profile-header">
      <div className="flex items-center gap-4">
        <Avatar
          size="xl"
          name={getFullName(user)}
          src={user.avatar || avatarPlaceholder}
        />
        <div className="flex flex-col">
          <Heading size="lg">{getFullName(user)}</Heading>
          <Text>@{user.username}</Text>
        </div>
        {currentUser?._id !== user._id && (
          <FollowButton
            userId={user._id}
            hasFollower={hasFollower(user, currentUser?._id as string)}
          />
        )}
      </div>
      <div className="flex flex-col items-center pl-2">
        <i className="fa-solid fa-user-check text-3xl"></i>
        <span>Seguidores</span>
        <span>{user.followers.length}</span>
      </div>
    </header>
  );
};
