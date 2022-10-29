import express from 'express';
import path from "path";

import { abc } from "test/module_test";

const app = express();

app.get("/", (_, res) => {
  return res.json({ msg: "Hello world" });
});

app.get("/home", (_, res) => {
  return res.sendFile("home.html", { root: path.resolve(__dirname, "./view") });
});

app.listen(8080, () => console.log(`Boot server, ${abc}`));