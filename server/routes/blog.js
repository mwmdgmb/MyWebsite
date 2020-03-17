const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const authServices = require("../services/auth");

router.get("", blogController.getBlogs);

router.get(
  "/mydata",
  authServices.checkJWK,
  authServices.checkRole("siteOwner"),
  blogController.getUserBlogs
);

router.get("/:id", blogController.getBlogById);

router.get("/s/:slug", blogController.getBlogBySlug);

router.post(
  "",
  authServices.checkJWK,
  authServices.checkRole("siteOwner"),
  blogController.createBlog
);

router.patch(
  "/:id",
  authServices.checkJWK,
  authServices.checkRole("siteOwner"),
  blogController.updateBlog
);

router.delete(
  "/:id",
  authServices.checkJWK,
  authServices.checkRole("siteOwner"),
  blogController.deleteBlog
);

module.exports = router;
