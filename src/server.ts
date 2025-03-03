import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import doctorRoutes from "./routes/doctor.routes";
import appointmentRoutes from "./routes/appointment.routes";
import medicalHistoryRoutes from "./routes/medicalHistory.routes";
import billingRoutes from "./routes/billing.routes";
import specialtyRoutes from "./routes/specialty.routes";
import workingHoursRoutes from "./routes/workingHours.routes";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const corsOptions = {
  // origin: process.env.CORS_ORIGIN,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,Cache-Control,Timestamp",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/medical-history", medicalHistoryRoutes);
app.use("/api/v1/billing", billingRoutes);
app.use("/api/v1/specialties", specialtyRoutes);
app.use("/api/v1/working-hours", workingHoursRoutes);

const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`),
);
