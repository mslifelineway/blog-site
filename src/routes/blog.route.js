const {
  createBlog,
  softDeleteBlogById,
  findAllBlogs,
  approveBlog,
} = require("../controllers/blogController");
const {
  authenticateAdmin,
  authenticateContentWriter,
} = require("../middlewares/authMiddleware");
const { validateSchema } = require("../middlewares/blogMiddleware");

module.exports = (router) => {
  router.post("/create", authenticateContentWriter, validateSchema, createBlog);
  // router.patch("/update/:id", authenticate, validateUpdateSchema, updateBlog);
  router.patch("/approve/:id", authenticateAdmin, approveBlog);
  router.get("/all", findAllBlogs);
  // router.get("/approved", findActiveBlogs);
  // router.get("/disapproved", findDisApprovedBlogs);
  // router.get("/:id", findBlogById);
  router.delete("/delete/:id", authenticateAdmin, softDeleteBlogById);
  return router;
};
