const { User, Role } = require("../models/index");
class UserRepository {
  async create(data) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      const response = await User.destroy({
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(userId) {
    try {
      return await User.findByPk(userId, {
        attribute: ["email", "id"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(userEamil) {
    try {
      return await User.findOne({ where: { email: userEamil } });
    } catch (error) {
      console.log(error);
    }
  }

  async idAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });

      return user.hasRole(adminRole);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepository;
