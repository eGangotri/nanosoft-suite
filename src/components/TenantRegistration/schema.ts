import { z } from 'zod';

export const tenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  companyName: z.string().min(1, "Company name is required"),
  uenNo: z.string().regex(/^[STU]\d{8}[A-Z]$/, "Invalid UEN number"),
  entityType: z.enum(["Pte Ltd", "LLP", "Sole Proprietorship"]),
  industry: z.string().min(1, "Industry is required"),
  contactNo: z.string().regex(/^\+?\d{1,3}-?\d{1,4}-?\d{3,4}-?\d{4}$/, "Contact number must be in the format +<country code>-<area code>-<local number>-<line number>"),
  domain: z.string().regex(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/, "Invalid domain"),
 // captcha: z.string().min(1, "Please complete the captcha"),
  captcha: z.string().optional(),
});

export type TenantFormData = z.infer<typeof tenantSchema>;

