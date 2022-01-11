const express = require("express");
const app = express();
app.use(express.json());

app.set("view engine", "ejs");

const departmentRoutes = require("./routes/departments")
const  userRoutes  = require("./routes/users");

app.use("/", userRoutes, departmentRoutes);

app.listen({ port: 8000 }, () => {
  console.log("server running on http://localhost:8000");
});
