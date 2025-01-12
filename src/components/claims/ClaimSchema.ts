import { z } from 'zod'

export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

export const claimSchema = z.object({
  id: z.number().optional(),
  employeeId: z.number(),
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  status: z.nativeEnum(ClaimStatus),
  cycleMonth: z.number().min(1).max(12),
  cycleYear: z.number().min(2000).max(2100),
  tenantId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Claim = z.infer<typeof claimSchema>

export type ClaimFormProps = {
  initialData?: Claim | null
  onSubmit: (claim: Claim) => void
}

