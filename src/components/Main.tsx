// components
import Palette from "./Palette";
import MenuBox from "./MenuBox";
import Header from "./Header";
import CodeContent from "./CodeContent.js";
import { Box } from "@mantine/core";

/**
 * Main component that displays the first page with form and palette
 */
function Main() {
  return (
    <>
      <Box
        style={theme => ({
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gridTemplateRows: "repeat(8, minmax(0, 1fr))",
          fontFamily: theme.fontFamilyMonospace,
        })}
      >
        <Box component="header" style={{ gridColumn: "span 4" }}>
          <Header />
        </Box>

        <Box style={{ gridColumn: "span 8", gridRow: "span 8" }}>
          <Palette />
        </Box>

        <Box style={{ gridColumn: "span 2", gridRow: "span 7" }}>
          <MenuBox />
        </Box>

        <Box
          style={theme => ({
            backgroundColor: theme.colors.dark,
            gridColumn: "span 2",
            gridRow: "span 7",
            overflow: "auto",
          })}
        >
          <CodeContent />
        </Box>
      </Box>
    </>
  );
}

export default Main;
