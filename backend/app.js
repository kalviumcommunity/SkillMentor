import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connection from "./db/connection.js";
import userRoute from "./controllers/userRoute.js";
const PORT =  5000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRoute);


app.listen(PORT,async() => {
  await connection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
