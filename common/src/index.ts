import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string()

})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export type SigninInput = z.infer<typeof signinInput>

export const createBlog = z.object({
  title: z.string(),
  content: z.string(),
})

export type createBlog = z.infer<typeof createBlog>

export const updateBlog = z.object({
  title: z.string(),
  content: z.string(),
})

export type UpdateBlog = z.infer<typeof updateBlog>
