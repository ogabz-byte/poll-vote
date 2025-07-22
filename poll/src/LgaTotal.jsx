import { useEffect, useState } from "react";
import axios from "axios";

function LgaPollingUnitPage() {
  const [lgas, setLgas] = useState([]);
  const [selectedLgaName, setSelectedLgaName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/lgas")
      .then((res) => {
        console.log("Fetched LGAs:", res.data);
        setLgas(res.data);
      })
      .catch(() => alert("Failed to load LGAs."));
  }, []);

  const handleLgaSelect = (e) => {
    const selectedId = e.target.value;
    console.log("Selected ID:", selectedId);

    const lga = lgas.find((lga) => lga.uniqueid.toString() === selectedId);
    console.log("Matched LGA:", lga);

    setSelectedLgaName(lga?.lga_name || "");
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Select Local Government</h2>

      <select onChange={handleLgaSelect} className="border p-2">
        <option value="">Select LGA</option>
        {lgas.map((lga) => (
          <option key={lga.uniqueid} value={lga.uniqueid}>
            {lga.lga_name}
          </option>
        ))}
      </select>

      {selectedLgaName && (
        <p className="mt-4 font-semibold text-green-600">
          The polling unit in{" "}
          <span className="underline">{selectedLgaName}</span> LGA is ...
        </p>
      )}
    </div>
  );
}

export default LgaPollingUnitPage;
