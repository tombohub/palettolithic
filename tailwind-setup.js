const { execSync } = require("child_process");
const { css } = require("chroma-js");
const { exception } = require("console");
const fs = require("fs");

const cssDirectory = "src/assets/css";

const mainCssFile = cssDirectory + "/main.css";

const tailwindCssFile = cssDirectory + "/tailwind.css";

const tailwindCssStartData = `@tailwind base; 
@tailwind components; 
@tailwind utilities;`;

// execSync("npm install tailwindcss");
// execSync("npx tailwindcss init --full");

// fs.mkdirSync(cssDirectory, { recursive: true });

// fs.writeFileSync(tailwindCssFile, tailwindCssStartData);
