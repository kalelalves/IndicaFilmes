import { IUser, User } from "../models/User";

const userRepository = {
  create: async (data: Partial<IUser>): Promise<IUser> => {
    const user = new User(data);
    return user.save();
  },

  findByEmail: async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
  },
};

export default userRepository;
