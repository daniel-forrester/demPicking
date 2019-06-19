import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, View, StyleSheet } from 'react-native';
import { Text, Button, Title, Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStoreActions } from '../store';
import styled from 'styled-components';
import theme from '../theme';

const OnboardingTitle = styled(Title)`
  color: ${Colors.white};
  text-align: center;
`;
const OnboardingText = styled(Text)`
  color: ${Colors.white};
  text-align: center;
  padding: 0 16px;
`;
const OnboardingBackground = styled(LinearGradient)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const OnboardingIcon = styled(MaterialCommunityIcons)`
  padding-bottom: 32px;
`;

const slides = [
  {
    key: 'onboarding-1',
    title: 'Welcome to Dematic iQ',
    text: 'Pick walking... before it was cool.',
    icon: 'walk',
    colors: ['#37464f', '#37464f'],
  },
  {
    key: 'onboarding-2',
    title: 'Simple and easy to use',
    text: 'Now you can pick your cake, and have time to eat it too.',
    icon: 'cake-variant',
    colors: ['#37464f', '#37464f'],
  },
  {
    key: 'onboarding-3',
    title: "Let's go shopping!",
    icon: 'cart',
    colors: ['#37464f', '#37464f'],
  },
];

const renderItem = props => {
  return (
    <OnboardingBackground
      style={{
        width: props.width,
        height: props.height,
      }}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}>
      <OnboardingIcon
        name={props.icon}
        size={200}
        color={theme.colors.accent}
      />
      <View>
        <OnboardingTitle>{props.title}</OnboardingTitle>
        <OnboardingText>{props.text}</OnboardingText>
      </View>
    </OnboardingBackground>
  );
};

const OnboardingScreen = () => {
  const setUser = useStoreActions(actions => actions.user.set);

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setUser({ onboarded: true });
  };

  return (
    <AppIntroSlider renderItem={renderItem} slides={slides} onDone={onDone} />
  );
};

export default OnboardingScreen;
