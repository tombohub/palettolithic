import { Title } from "@mantine/core";

/**
 * WHAT: holds the title of the website
 */
function Header() {
  return (
    <>
      <Title
        style={{
          fontFamily: "Frijole",
          fontWeight: "normal",
        }}
      >
        Palettolithic
      </Title>
      <Title
        order={3}
        style={{ fontWeight: "normal", fontFamily: "Schoolbell" }}
      >
        So easy caveman can do it...
      </Title>
    </>
  );
}

export default Header;
