const express = require("express");
const { PORT } = require("./config/serverConfig");
const db = require("./models/index");
const {User,role} = require("./models/index");
const app = express();


app.listen(PORT, async () => {
  console.log("server is running", PORT);

//   if (process.env.DB_SYNC) {
//     db.sequelize.sync({ alter: true });
//   }
  const user1 = await User.findByPk(1);
  const r1 = await role.findByPk(2);
//   user1.addRole(r1)
  const rsp = await user1.hasRole(r1);
  console.log(rsp);
});
