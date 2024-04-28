/**
 * Cleans the color argument/route provided in the URL
 */

function sanitizeColor(hexColor: string): string {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  const dirtyColor = "#" + hexColor;
  let cleanColor = "#07c";
  if (reg.test(dirtyColor)) {
    cleanColor = dirtyColor;
  }
  return cleanColor;
}

export default sanitizeColor;
