const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const availabilityRoutes = require("./routes/availability");
const bookingRoutes = require("./routes/booking");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/book", bookingRoutes);

console.log(process.env.PORT);
let PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
