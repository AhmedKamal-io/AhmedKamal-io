import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is too short"),
  // التعديل هنا: إضافة default و nullable لجعلها متوافقة تماماً
  subCategories: z
    .array(
      z.object({
        name: z.string().min(2, "Sub-category name is too short"),
      })
    )
    .default([]),
});

export type CategoryInput = z.infer<typeof categorySchema>;
