import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PollingUnitResult from "./PollingUnitResult";
import LgaTotal from "./LgaTotal";
import AddPoll from "./AddPoll";

function App() {
  return (
    <Router>
      <nav className="bg-blue-900 text-white px-4 py-3 shadow-md flex space-x-6">
        <Link to="/" className="hover:bg-blue-700 px-3 py-1 rounded transition">
          Polling unit result
        </Link>
        <Link
          to="/lga-result"
          className="hover:bg-blue-700 px-3 py-1 rounded transition"
        >
          LGA Total result
        </Link>
        <Link
          to="/add-result"
          className="hover:bg-blue-700 px-3 py-1 rounded transition"
        >
          Add Polling unit result
        </Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<PollingUnitResult />} />
          <Route path="/lga-result" element={<LgaTotal />} />
          <Route path="/add-result" element={<AddPoll />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
