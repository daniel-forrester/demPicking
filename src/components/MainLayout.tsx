import React from 'react';
import { useStoreState } from '../store';
import OnboardingScreen from './Onboarding';
import Navigation from './Navigation';

const MainLayout = () => {
  const onboarded = useStoreState(state => state.user.onboarded);
  if (!onboarded) return <OnboardingScreen />;

  return <Navigation />;
};

export default MainLayout;
