import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const createNewPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.Posts.create({
      data: {
        title,
        content,
      },
    });
    return res.status(200).json({ message: "게시물을 작성하였습니다." });
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res) => {
  const posts = await prisma.Posts.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  return res.status(200).json({ data: posts });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await prisma.Posts.update({
    where: { id: +id },
    data: { title, content },
  });

  return res.status(200).json({ message: "게시물을 수정하였습니다" });
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.Posts.findUnique({
    where: { id: +id },
  });

  await prisma.Posts.delete({ where: { id: +id } });

  return res.status(200).json({ message: "success" });
};

router.post("/api/posts", createNewPost);
router.get("/api/posts", getAllPosts);
router.put("/api/posts/:id", updatePost);
router.delete("/api/posts/:id", deletePostById);

export default router;
