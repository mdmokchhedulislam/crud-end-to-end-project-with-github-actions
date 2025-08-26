import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModal.js";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const apiRouter = express.Router(); // একটি নতুন রাউটার তৈরি করুন

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://13.218.145.174"],
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

// ### API রুটগুলো apiRouter ব্যবহার করে ডিফাইন করুন ###

// Get All Contacts
apiRouter.get("/", async (req, res) => {
  try {
    const contact = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All Contacts", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Contact
apiRouter.post("/", async (req, res) => {
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
apiRouter.put("/:id", async (req, res) => {
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
apiRouter.delete("/:id", async (req, res) => {
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

// ### '/api' প্রিফিক্স দিয়ে রাউটারটিকে মূল অ্যাপে যুক্ত করুন ###
app.use('/api', apiRouter); [8]

const PORT = process.env.PORT || 3000; // একটি ফলব্যাক পোর্ট যুক্ত করা ভালো অভ্যাস
// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));