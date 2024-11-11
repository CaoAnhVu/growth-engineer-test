import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Instruct from "./pages/Instruct";
import ResultsPage from "./pages/ResultsPage";
import SharePage from "./pages/SharePage";
import EmailSharePage from "./pages/EmailSharePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruct" element={<Instruct />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/emailshare" element={<EmailSharePage />} />
      </Routes>
    </Router>
  );
}

export default App;
