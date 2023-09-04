import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { FeedContent } from 'src/feed/components';
import { PostInfo, Role } from 'src/interfaces';

export const Feed = () => {
  const posts: PostInfo[] = [
    {
      _id: '823',
      title: 'React is awesome',
      image: 'https://bit.ly/dan-abramov',
      topic: 'react',
      description: `when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently
      with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum`,
      likes: ['123', '456'],
      comments: ['123', '456'],
      userId: '923',
      user: {
        _id: '923',
        firstName: 'Dan',
        lastName: 'Abramov',
        avatar: 'https://bit.ly/dan-abramov',
        email: 'example@email.com',
        username: 'dan_abramov',
        password: '123456',
        role: Role.User,
        isEmailVerified: true,
      },
      createdAt: new Date(),
    },
  ];

  return (
    <section className="section-content">
      <Tabs colorScheme="accent" align="center">
        <TabList>
          <Tab fontSize={18}>Seguidos</Tab>
          <Tab fontSize={18}>Sugeridos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FeedContent posts={posts} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
};
