import express from "express";
import router from "~src/api/user.routes";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});