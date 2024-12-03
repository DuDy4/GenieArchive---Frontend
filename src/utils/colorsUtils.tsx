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

export const getContrastColor = (hexColor: string): string => {
  const rgb = parseInt(hexColor.replace("#", ""), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate relative luminance
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If brightness is less than 0.5, return white; otherwise, return black
  return brightness < 0.5 ? "#FFFFFF" : "#000000";
};



export const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
