export type RenderTextCallback = (
  options: {
    text: string;
    key: number;
  }
) => JSX.Element | string;

export type Localizer = (key: string, values?: Array<string>) => string;
