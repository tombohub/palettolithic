import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider forceColorScheme="light" theme={theme}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </MantineProvider>
  );
}

export default App;
