import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "~src/entities/user.entity"; 
import { getRepository } from "typeorm"; 

const router = express.Router();

require('Dotenv').config()

const generateToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    return res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
});

router.get("/validate", async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tokenData = token.split(" ")[1];
    const decoded = jwt.verify(tokenData, process.env.JWT_SECRET);
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

export default router;
