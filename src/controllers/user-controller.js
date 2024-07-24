const UserService = require("../services/user-service");

const userserive = new UserService();

const createUser = async (req, res) => {
  try {
    const create = await createUser(req.body);
    return res.status(200).json({
      data: create,
      mesage: "user created succesfully",
    });
  } catch (error) {}
};
const sigIn = async (req, res) => {
  try {
    const response = userserive.signIn(req.email, req.password);
    return res.status(200).send({
      message: "succesfully sigin",
      data: { response },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, data: {}, success: false });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const isVerified = userserive.verifyToken(token);
    return res.status(200).send({
      message: "User is verified ",
      data: isVerified,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error, data: {}, success: false });
  }
};
module.exports.Usercontroller = {
  createUser,
  sigIn,
  isAuthenticated,
};
