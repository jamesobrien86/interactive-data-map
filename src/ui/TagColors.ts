const TAG_COLOR_SCHEMES = [
  'blue',
  'green',
  'purple',
  'orange',
  'teal',
  'cyan',
  'pink',
] as const;

export type TagColorScheme = (typeof TAG_COLOR_SCHEMES)[number];

export function getTagColorScheme(value: string): TagColorScheme {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return TAG_COLOR_SCHEMES[Math.abs(hash) % TAG_COLOR_SCHEMES.length];
}
