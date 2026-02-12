import type { UserDTO } from "../models/UserDTO.mjs";
import { User } from "../models/userSchema.mjs";

export const getUsers = async () => {
  const usersfromDB = await User.find();
  const dtos: UserDTO[] = usersfromDB.map((user) => {
    return {
      id: user.id,
      name: user.name,
    } satisfies UserDTO;
  });
  return dtos;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };
  const createdUser = await User.create(newUser);

  return {
    id: createdUser.id,
    name: createdUser.name,
  } satisfies UserDTO;
};
