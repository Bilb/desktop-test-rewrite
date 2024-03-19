import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  AccountCreation,
  AccountRestoration,
  OnboardDirection,
  Onboarding,
  OnboardingState,
} from '../ducks/registration';
import { OnboardingStoreState } from '../store';

// #region Getters
const getRegistration = (state: OnboardingStoreState): OnboardingState => {
  return state.registration;
};

const getRecoveryPassword = createSelector(
  getRegistration,
  (state: OnboardingState): string => state.recoveryPassword
);

const getHexGeneratedPubKey = createSelector(
  getRegistration,
  (state: OnboardingState): string => state.hexGeneratedPubKey
);

const getDisplayName = createSelector(
  getRegistration,
  (state: OnboardingState): string => state.displayName
);

const getProgress = createSelector(
  getRegistration,
  (state: OnboardingState): number => state.progress
);

const getOnboardingStep = createSelector(
  getRegistration,
  (state: OnboardingState): Onboarding => state.step
);

const getAccountCreationStep = createSelector(
  getRegistration,
  (state: OnboardingState): AccountCreation => state.accountCreationStep
);

const getAccountRestorationStep = createSelector(
  getRegistration,
  (state: OnboardingState): AccountRestoration => state.accountRestorationStep
);

const getDirection = createSelector(
  getRegistration,
  (state: OnboardingState): OnboardDirection => state.direction
);
// #endregion

// #region Hooks
export const useRecoveryPassword = () => {
  return useSelector(getRecoveryPassword);
};

export const useOnboardHexGeneratedPubKey = () => {
  return useSelector(getHexGeneratedPubKey);
};

export const useDisplayName = () => {
  return useSelector(getDisplayName);
};

export const useProgress = () => {
  return useSelector(getProgress);
};

export const useOnboardStep = () => {
  return useSelector(getOnboardingStep);
};

export const useOnboardAccountCreationStep = () => {
  return useSelector(getAccountCreationStep);
};

export const useOnboardAccountRestorationStep = () => {
  return useSelector(getAccountRestorationStep);
};

export const useOnboardDirection = () => {
  return useSelector(getDirection);
};
// #endregion
