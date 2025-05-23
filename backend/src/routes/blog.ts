import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"
import { decode, verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlog, updateBlog } from "@rahulkoyye/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_PASSWORD: string
  },
  Variables: {
    userId: string;
  }
}>()


const getPrismaClient = (c: any) => new PrismaClient({
  datasources: {
    db: {
      url: c.env.DATABASE_URL
    }
  }
}).$extends(withAccelerate())


blogRouter.use("/*", async (c, next) => {


  const token = c.req.header("Authorization") || "";


  const response = await verify(token, c.env.JWT_PASSWORD);

  if (response) {

    c.set("userId", response.id as string)
    await next();

  } else {
    c.status(403);
    return c.json({ "msg": "unauthorized" })
  }

})



blogRouter.post("/", async (c) => {

  let body;
  try {

    body = await c.req.json()
  } catch (e) {
    c.status(411)
    return c.json({
      err: "body parsing error"
    })
  }

  const parsed = createBlog.safeParse(body);

  if (!parsed.success) {

    c.status(411)
    return c.json({
      msg: "send the right inputs"
    })
  }
  const id = c.get("userId")
  const prisma = getPrismaClient(c)

  const post = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: id,

    }
  })

  return c.json({
    id: post.id
  })
})




blogRouter.put("/", async (c) => {

  let body;
  try {

    const body = await c.req.json()

  } catch (e) {

    return c.json({
      err: "body parsing error"
    })
  }

  const parsed = updateBlog.safeParse(body);

  if (!parsed.success) {

    c.status(411)
    return c.json({
      msg: "send the right inputs"
    })
  }
  const prisma = getPrismaClient(c)


  const post = await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title: body.title,
      content: body.content,

    }
  })

  return c.json({
    id: post.id
  })
})



blogRouter.get("/bulk", async (c) => {

  const prisma = getPrismaClient(c)

  try {

    const posts = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    })

    return c.json({
      posts
    })
  } catch (e) {
    c.status(411)
    return c.json({
      msg: "Error while fetching"
    })

  }
})

blogRouter.get("/:id", async (c) => {

  const prisma = getPrismaClient(c)

  try {

    const id = c.req.param("id")

    const post = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select: {
        title: true,
        content: true,
        author: {
          select: {
            name: true
          }
        }

      }
    })

    return c.json({
      post
    })
  } catch (e) {
    c.status(411)
    return c.json({
      msg: "Error while fetching"
    })

  }
})
