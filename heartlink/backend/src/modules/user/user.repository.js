
import User from "./user.model.js";

class UserRepository {

  async findById(id) {
    return User.findById(id);
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByEmailWithPassword(email) {
    return User.findOne({ email }).select("+password");
  }

  async create(data) {
    const user = new User(data);
    return user.save();
  }

  }

export const userRepository = new UserRepository();
