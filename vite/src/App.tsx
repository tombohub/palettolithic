import Main from "./components/Main";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Route>
          <Main />
        </Route>
      </>
    </Router>
  );
}

export default App;
