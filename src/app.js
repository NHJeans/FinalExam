import express from "express";
import cookieParser from "cookie-parser";
import PostsRouter from "./routes/posts.router.js";
import { prisma } from "./utils/prisma/index.js";

(async () => {
  const app = express();
  const PORT = 3000;
  await prisma.$connect();

  app.use(express.json());
  app.use(cookieParser());
  app.use("/", [PostsRouter]);

  app.listen(PORT, () => {
    console.log(PORT, "포트로 서버가 열렸어요!");
  });
})();
