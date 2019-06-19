import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import { IconButton, Title, Text } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { useStoreState } from '../../store';
import styled from 'styled-components';
import { View } from 'react-native';
import AppBarHeader from '../../components/Appbar';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const getPermissionAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
};

const CurrentOrderChat = () => {
  const currentPickWalk = useStoreState(state => state.orders.currentPickWalk);
  const [messages, setMessages] = useState([]);
  const [myUser] = useState({ _id: uuid.v4() });
  const [user] = useState({
    _id: uuid.v4(),
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any',
  });

  // Run once before render
  useEffect(() => {
    getPermissionAsync();
  }, []);

  // Mock initial messages
  useEffect(() => {
    setMessages([
      {
        _id: uuid.v4(),
        text: 'I would like make a substitution.',
        createdAt: new Date(),
        user,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: [
            {
              title: '😋 Sure Thing!',
              value: 'yes',
            },
            {
              title: '📷 Yes, let me send you a picture!',
              value: 'yes_picture',
            },
            {
              title: "😞 I'm sorry. They are out of that item.",
              value: 'no',
            },
          ],
        },
      },
      {
        _id: uuid.v4(),
        text: 'Hello',
        createdAt: new Date(),
        user,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: [
            {
              title: 'Hello there!',
              value: 'hello',
            },
            {
              title: 'Hello, how are you?',
              value: 'hello_formal',
            },
          ],
        },
      },
    ]);
  }, []);

  if (!currentPickWalk) {
    return (
      <Container>
        <Title>No Current Order</Title>
        <Text>Please start a new order first.</Text>
      </Container>
    );
  }

  const onSend = newMessages => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  const onQuickReply = replies => {
    console.log(replies);
    const newMessages = replies.map(reply => {
      return {
        _id: uuid.v4(),
        createdAt: Date.now(),
        text: reply.title,
        user: myUser,
      };
    });
    setMessages(GiftedChat.append(messages, newMessages));
  };

  const handleAddPhoto = async () => {
    const { cancelled, uri }: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!cancelled) {
      const newMessages = [
        {
          _id: uuid.v4(),
          createdAt: Date.now(),
          image: uri,
          text: '',
          user: myUser,
        },
      ];
      setMessages(GiftedChat.append(messages, newMessages));
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      onQuickReply={onQuickReply}
      user={myUser}
      renderActions={() => {
        return (
          <IconButton icon="add-a-photo" size={20} onPress={handleAddPhoto} />
        );
      }}
    />
  );
};

export default CurrentOrderChat;
