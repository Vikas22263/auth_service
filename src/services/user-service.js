const UserRepository = require("../repository/user-repository");
const jwt = require("jwt");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const response = this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  createToken(user) {
    try {
      const result = jwt.sign(user, "dgfdgfd", { expire: "7d" });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verfiy(token, secretkey);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordMatch = this.chekPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password not Match");
        throw { error: "incorrect password" };
      }
      const newJWT = this.createToken({ user: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log(error);
    }
  }

  chekPassword(plainpassword, haspassword) {
    try {
      return bcrypt.compareSync(plainpassword, haspassword);
    } catch (error) {
      console.log(error);
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "invalid Token" };
      }
      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No users with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log(error);
    }
  }

  async isAdmin(userId) {
    try {
      return this.userRepository.idAdmin(userId);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
