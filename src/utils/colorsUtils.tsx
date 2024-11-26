export const hexToRGBA = (hex: string, opacity: number = 1): string => {
  // Remove the '#' if present
  hex = hex.replace("#", "");

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA format
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};