export enum TooltipSideOffset {
  Zero = 0,
  Small = 4,
  Large = 16,
}

export enum TooltipAppearanceSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export enum TooltipAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export type HintText =
  | 'Delete news from archive'
  | 'Scroll down'
  | 'Scroll up'
  | 'Time'
  | 'GMT time'
  | 'Humidity (%)'
  | 'Atmospheric pressure (mm.Hg)'
  | 'Atmospheric pressure (HPa)'
  | 'Sunrise time'
  | 'Sunset time'
  | 'Road visibility'
  | `Wind speed (m/s). (${string} on the Beaufort scale)`
  | `Temperature in °C`
  | `Temperature in °F`
  | 'Precipitation and weather'
  | 'Wind speed (m/s)';
