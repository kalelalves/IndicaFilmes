import { IUser, User } from "../models/User";

const authRepository = {
  register: async (data: Partial<IUser>): Promise<IUser> => {
    const user = new User(data);
    return user.save();
  },
};

export default authRepository;
