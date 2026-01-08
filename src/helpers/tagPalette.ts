
type ColorPalette = (typeof colorPalettes)[number];

export const colorPalettes = [
  'gray',
  'blue',
  'green',
  'purple',
  'orange',
  'teal',
  'cyan',
  'pink',
  'red',
] as const;

/**
 * Deterministically maps a string to a color palette
 * so the same category always gets the same color.
 */
export function getTagPalette(value: string): ColorPalette {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colorPalettes[Math.abs(hash) % colorPalettes.length];
}
