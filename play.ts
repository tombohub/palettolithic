const sum = (hex: string, ko: number) => (framework: string) => {
  if (framework === "koko") return hex;
  else return "nonono";
};

const fff = sum("fff", 7);

console.log(fff("kokolo"));
