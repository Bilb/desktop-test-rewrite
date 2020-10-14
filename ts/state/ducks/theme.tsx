export const APPLY_THEME = 'APPLY_THEME';

export const applyTheme = (theme: any) => {
  return {
    type: APPLY_THEME,
    payload: theme,
  };
};
import { lightTheme } from './SessionTheme';

export type ThemeStateType = typeof lightTheme;

const initialState = lightTheme;

export const reducer = (
  state: any = initialState,
  {
    type,
    payload,
  }: {
    type: string;
    payload: ThemeStateType;
  }
): ThemeStateType => {
  switch (type) {
    case APPLY_THEME:
      return payload;
    default:
      return state;
  }
};
