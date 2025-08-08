import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModal.js";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'data'
})
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.error("MongoDB Error:", err));

// Get All Contacts
app.get("/", async (req, res) => {
  try {
    const contact = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All Contacts", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Contact
app.post("/", async (req, res) => {
  const { name, gmail, phone } = req.body;
  try {
    const existing = await Contact.findOne({ gmail });
    if (existing) return res.status(409).json({ message: "Contact already exists..!" });

    const contact = await Contact.create({ name, gmail, phone });
    res.status(201).json({ message: "Contact Saved Successfully..!", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit Contact
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Contact has been updated..!", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Contact
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.deleteOne();
    res.status(200).json({ message: "Your Contact has been deleted..!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT
// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
