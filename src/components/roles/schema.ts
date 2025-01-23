import { z } from "zod"

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string(),
  description: z.string(),
  level: z.number(),
})

export type Role = z.infer<typeof RoleSchema>

export const RolesSchema = z.array(RoleSchema)

