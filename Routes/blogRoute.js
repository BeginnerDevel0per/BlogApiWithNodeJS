var express = require("express");
var blogController = require("../Controllers/blogController.js");
const router = express.Router();


router.route("/blogs").put(blogController.UpdateBlog);
router.route("/blogs/:id").delete(blogController.RemoveBlog);
router.route("/blogs").post(blogController.AddBlog);
router.route("/blogs/:id").get(blogController.GetByIdBlog);
router.route("/Search/:keyword").get(blogController.BlogSearch);
router.route("/blogs").get(blogController.GetBlogs);
router.route("/");


module.exports = router;

