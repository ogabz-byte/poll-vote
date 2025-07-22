import { useState } from "react";
import axios from "axios";

function PollingUnitResult() {
  const [pollingUnitId, setPollingUnitId] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = () => {
    if (!pollingUnitId) {
      alert("Please enter a Polling Unit ID");
      return;
    }

    setLoading(true);
    axios
      .get(`https://poll-vote-y8cw.onrender.com/api/polling-unit/${pollingUnitId}/results`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Polling Unit not found or server error.");
        setLoading(false);
      });
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Polling Unit Results</h2>

      <input
        type="text"
        value={pollingUnitId}
        onChange={(e) => setPollingUnitId(e.target.value)}
        placeholder="Enter Polling Unit ID"
        className="border p-2 mr-2"
      />

      <button
        onClick={fetchResults}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Fetch Results"}
      </button>

      <div className="mt-4">
        {results.length === 0 && !loading && <p>No results yet.</p>}

        <ul>
          {results.map((result, index) => (
            <li key={index} className="bg-gray-200 p-2 my-1 rounded">
              {result.party_abbreviation}: {result.party_score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PollingUnitResult;
