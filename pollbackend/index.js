const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working");
});

// Get Polling Unit Results
app.get("/api/polling-unit/:id/results", async (req, res) => {
  const id = req.params.id;
  const results = await prisma.announcedPUResult.findMany({
    where: { polling_unit_uniqueid: id },
  });
  res.json(results);
});

// Get All LGAs (for dropdown)
app.get("/api/lgas", async (req, res) => {
  const lgas = await prisma.lGA.findMany({
    select: { uniqueid: true, lga_name: true },
  });
  res.json(lgas);
});

// POST /api/polling-units - Create a new polling unit
app.post("/api/polling-units", async (req, res) => {
  const {
    polling_unit_id,
    ward_id,
    lga_id,
    polling_unit_number,
    polling_unit_name,
    polling_unit_description,
    lat,
    long,
    entered_by_user,
    date_entered,
    user_ip_address,
  } = req.body;

  try {
    const newPollingUnit = await prisma.pollingUnit.create({
      data: {
        polling_unit_id: Number(polling_unit_id),
        ward_id: Number(ward_id),
        lga_id: Number(lga_id),
        polling_unit_number,
        polling_unit_name,
        polling_unit_description,
        lat,
        long,
        entered_by_user: entered_by_user || "admin",
        date_entered: date_entered ? new Date(date_entered) : new Date(),
        user_ip_address: user_ip_address || "127.0.0.1",
      },
    });

    res.json(newPollingUnit);
  } catch (error) {
    console.error("Error creating polling unit:", error);
    res.status(500).json({ error: "Failed to create polling unit" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

