import { z } from "zod";

/* Paragraph */
const paragraphSchema = z.object({
  content: z.string().min(1, "Content is required"),
  image: z.string().url().nullable().optional(),
});

/* Language */
const langSchema = z.object({
  title: z.string().min(1, "Title is required"),
  paragraphs: z
    .array(paragraphSchema)
    .min(1, "At least one paragraph required"),
});

/* Article */
export const articleSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and kebab-case"),

  en: langSchema,
  ar: langSchema,
});
