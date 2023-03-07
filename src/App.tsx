import { AppRoutes } from "./routes"
import { BrowserRouter as Router } from "react-router-dom";
import { AppContexts } from "./contexts";

function App() {
  return (
    <Router>
      <AppContexts>
        <AppRoutes/>
      </AppContexts>
    </Router>
  )
}

export default App
