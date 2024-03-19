import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum Onboarding {
  /** starting screen */
  Start,
  /** uses AccountCreation internally */
  CreateAccount,
  /** uses AccountRestoration internally */
  RestoreAccount,
}

export enum AccountCreation {
  /** starting screen */
  DisplayName,
  /** show conversation screen */
  Done,
}

export enum AccountRestoration {
  /** starting screen */
  RecoveryPassword,
  /** fetching account details, so we increment progress to 100% over 15s */
  Loading,
  /** found account details, so we increment the remaining progress to 100% over 0.3s */
  Finishing,
  /** found the account details and the progress is now 100%, so we wait for 0.2s */
  Finished,
  /** we failed to fetch account details in time, so we enter it manually */
  DisplayName,
  /** we have restored successfuly, show the conversation screen */
  Complete,
}

export type OnboardDirection = 'backward' | 'forward';

export type OnboardingState = {
  recoveryPassword: string;
  hexGeneratedPubKey: string;
  displayName: string;
  progress: number;
  step: Onboarding;
  accountCreationStep: AccountCreation;
  accountRestorationStep: AccountRestoration;
  direction: OnboardDirection;
};

const initialState: OnboardingState = {
  recoveryPassword: '',
  hexGeneratedPubKey: '',
  displayName: '',
  progress: 0,
  step: Onboarding.Start,
  accountRestorationStep: AccountRestoration.RecoveryPassword,
  accountCreationStep: AccountCreation.DisplayName,
  direction: 'forward',
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRecoveryPassword(state, action: PayloadAction<string>) {
      return { ...state, recoveryPassword: action.payload };
    },
    setHexGeneratedPubKey(state, action: PayloadAction<string>) {
      return { ...state, hexGeneratedPubKey: action.payload };
    },
    setDisplayName(state, action: PayloadAction<string>) {
      return { ...state, displayName: action.payload };
    },
    setProgress(state, action: PayloadAction<number>) {
      return { ...state, progress: action.payload };
    },
    setOnboardingStep(state, action: PayloadAction<Onboarding>) {
      return { ...state, step: action.payload };
    },
    setAccountCreationStep(state, action: PayloadAction<AccountCreation>) {
      return { ...state, accountCreationStep: action.payload };
    },
    setAccountRestorationStep(state, action: PayloadAction<AccountRestoration>) {
      return { ...state, accountRestorationStep: action.payload };
    },
    setDirection(state, action: PayloadAction<OnboardDirection>) {
      return { ...state, direction: action.payload };
    },
  },
});

export const {
  setRecoveryPassword,
  setHexGeneratedPubKey,
  setDisplayName,
  setProgress,
  setOnboardingStep,
  setAccountCreationStep,
  setAccountRestorationStep,
  setDirection,
} = registrationSlice.actions;
export default registrationSlice.reducer;
