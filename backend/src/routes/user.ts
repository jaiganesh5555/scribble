import { PrismaClient } from "@prisma/client/edge"
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@rahulkoyye/medium-common"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_PASSWORD: string
  }
}>()

const getPrismaClient = (c: any) => new PrismaClient({
  datasources: {
    db: {
      url: c.env.DATABASE_URL
    }
  }
})

userRouter.post("/signup", async (c) => {
  const prisma = getPrismaClient(c)
  let body
  try {

    body = await c.req.json()
  } catch (error) {
    c.status(411)
    return c.json({ error: "json parsing failed" })

  }
  const parsed = signupInput.safeParse(body);

  if (!parsed.success) {

    c.status(411)
    return c.json({
      msg: "send the right input"
    })

  }


  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_PASSWORD)
    return c.json({ jwt: token })
  } catch (error) {
    console.error(error)
    return c.json({ error: "Registration failed" }, 500)
  }
})

userRouter.post("/signin", async (c) => {
  const prisma = getPrismaClient(c)
  let body;
  try {

    body = await c.req.json()
  } catch (e) {

    console.error(e)
    return c.json({ error: "json parsing failed" }, 500)
  }

  const parsed = signinInput.safeParse(body);

  if (!parsed.success) {

    c.status(411)
    return c.json({
      msg: "send the right inputs"
    })
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!user) {
      return c.json({ error: "User not found" }, 404)
    }

    const token = await sign({ id: user.id }, c.env.JWT_PASSWORD)
    return c.json({ jwt: token })
  } catch (error) {
    console.error(error)
    return c.json({ error: "Login failed" }, 500)
  }
})

