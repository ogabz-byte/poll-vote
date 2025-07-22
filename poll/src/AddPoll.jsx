import { useState } from "react";
import axios from "axios";

function CreatePollingUnitPage() {
  const [form, setForm] = useState({
    polling_unit_id: "",
    ward_id: "",
    lga_id: "",
    polling_unit_number: "",
    polling_unit_name: "",
    polling_unit_description: "",
    lat: "",
    long: "",
    entered_by_user: "",
    date_entered: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://poll-vote-y8cw.onrender.com/api/polling-units", form);
      alert("New polling unit created.");
      setForm({
        // reset form
        polling_unit_id: "",
        ward_id: "",
        lga_id: "",
        polling_unit_number: "",
        polling_unit_name: "",
        polling_unit_description: "",
        lat: "",
        long: "",
        entered_by_user: "",
        date_entered: "",
      });
    } catch {
      alert("Failed to create polling unit.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Create New Polling Unit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "polling_unit_id",
          "ward_id",
          "lga_id",
          "polling_unit_number",
          "polling_unit_name",
          "polling_unit_description",
          "lat",
          "long",
          "entered_by_user",
          "date_entered",
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace(/_/g, " ").toUpperCase()}
            className="border p-2 w-full"
            type={field.includes("date") ? "date" : "text"}
          />
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white p-2 w-full font-semibold"
        >
          Save Polling Unit
        </button>
      </form>
    </div>
  );
}

export default CreatePollingUnitPage;
