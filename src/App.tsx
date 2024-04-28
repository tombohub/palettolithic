import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
