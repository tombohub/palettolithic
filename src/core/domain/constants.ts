/**
 * List of supported frameworks
 */
export const frameworksList = [
  "tailwind",
  "bootstrap5",
  // "css",
  // "mantine",
] as const;

/**
 * Values input can have for saturation and hue modification
 */
export const modFactorRange = { min: -1, max: 1 } as const;

export const saturationRange = { min: 0, max: 1 } as const;
