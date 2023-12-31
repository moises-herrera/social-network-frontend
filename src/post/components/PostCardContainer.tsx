import { Card } from '@chakra-ui/react';
import './PostCardContainer.css';

interface PostCardContainerProps {
  children: React.ReactNode;
}

export const PostCardContainer = ({ children }: PostCardContainerProps) => {
  return (
    <Card
      className="post-card-container"
      backgroundColor="#D3D3D3"
      borderRadius={20}
    >
      {children}
    </Card>
  );
};
