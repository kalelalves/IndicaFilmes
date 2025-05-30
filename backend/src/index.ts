import express, { Request, Response } from "express";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
