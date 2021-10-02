const {
  saveUser,
  getAllUsers,
  login,
  changeStatus,
} = require("../controllers/userController");
const { authenticateAdmin } = require("../middlewares/authMiddleware");
const {
  validateSchema,
  loginValidation,
  registerAsAdmin,
} = require("../middlewares/userMiddleware");

module.exports = (router) => {
  router.post("/register", authenticateAdmin, validateSchema, saveUser);
  router.post("/registerAsAdmin", validateSchema, registerAsAdmin, saveUser);
  router.post("/login", loginValidation, login);
  router.patch("/changeStatus/:id", authenticateAdmin, changeStatus);
  router.get("/allusers", authenticateAdmin, getAllUsers);
  return router;
};
