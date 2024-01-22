const router = require("express").Router();
const { Post, User, Comment } = require("../../model");
const withAuth = require("../../public/utilities/authorization");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        { model: Comment, attributes: ["id", "comment_text", "user_id", "created_at"], include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        { model: Comment, attributes: ["id", "comment_text", "user_id", "created_at"], include: { model: User, attributes: ["username"] } },
        { model: User, attributes: ["username"] },
      ],
    });

    if (!dbPostData) {
      return res.status(404).json({ message: "No post found with this id" });
    }

    const post = dbPostData.get({ plain: true });
    res.render("edit-post", { post, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/new", (req, res) => res.render("add-post", { loggedIn: true }));

module.exports = router;
