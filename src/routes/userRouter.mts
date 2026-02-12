import express from "express";
import { createUser, getUsers } from "../controller/userController.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";

export const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
  try {
    const users: UserDTO[] = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name && !email && !password) || (name && email && password === "")) {
      res.status(400).json({ message: "name and email is missing in body" });
      return;
    }

    const newUser: UserDTO = await createUser(name, email, password);
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
