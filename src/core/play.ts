const palette: ColorScale[] = [
  {
    colorName: "green",
    shades: [
      { weight: 50, hexCode: "#f0fdf4" },
      { weight: 100, hexCode: "#dcfce7" },
      { weight: 200, hexCode: "#bbf7d0" },
      { weight: 300, hexCode: "#86efac" },
      { weight: 400, hexCode: "#4ade80" },
      { weight: 500, hexCode: "#22c55e" },
      { weight: 600, hexCode: "#16a34a" },
      { weight: 700, hexCode: "#15803d" },
      { weight: 800, hexCode: "#166534" },
      { weight: 900, hexCode: "#14532d" },
      { weight: 950, hexCode: "#052e16" },
    ],
  },
  {
    colorName: "teal",
    shades: [
      { weight: 50, hexCode: "#f0fdfa" },
      { weight: 100, hexCode: "#ccfbf1" },
      { weight: 200, hexCode: "#99f6e4" },
      { weight: 300, hexCode: "#5eead4" },
      { weight: 400, hexCode: "#2dd4bf" },
      { weight: 500, hexCode: "#14b8a6" },
      { weight: 600, hexCode: "#0d9488" },
      { weight: 700, hexCode: "#0f766e" },
      { weight: 800, hexCode: "#115e59" },
      { weight: 900, hexCode: "#134e4a" },
      { weight: 950, hexCode: "#042f2e" },
    ],
  },
  {
    colorName: "emerald",
    shades: [
      { weight: 50, hexCode: "#ecfdf5" },
      { weight: 100, hexCode: "#d1fae5" },
      { weight: 200, hexCode: "#a7f3d0" },
      { weight: 300, hexCode: "#6ee7b7" },
      { weight: 400, hexCode: "#34d399" },
      { weight: 500, hexCode: "#10b981" },
      { weight: 600, hexCode: "#059669" },
      { weight: 700, hexCode: "#047857" },
      { weight: 800, hexCode: "#065f46" },
      { weight: 900, hexCode: "#064e3b" },
      { weight: 950, hexCode: "#022c22" },
    ],
  },
];

type ColorScale = {
  colorName: string;
  shades: { weight: number; hexCode: string }[];
};

abstract class Framework {
  abstract getOriginalPalette(): ColorScale[];
  abstract generateCode(k: number): string;
}

class TailwindFramework extends Framework {
  getOriginalPalette(): ColorScale[] {
    return palette; // Assume palette is defined somewhere
  }

  generateCode(): string {
    return `tailwind code for `;
  }
}

class BootstrapFramework extends Framework {
  getOriginalPalette(): ColorScale[] {
    return palette; // Assume palette is defined somewhere
  }

  generateCode(k: number): string {
    return `bootstrap code for ${k}`;
  }
}

// Usage
const framework: Framework = new TailwindFramework();
