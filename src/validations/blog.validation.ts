import { z } from "zod";

// 1. سكيمة الحقول المترجمة (Strings)
export const localizedStringSchema = z.object({
  ar: z.string().min(3, "العنوان العربي قصير جداً").max(200),
  en: z.string().min(3, "English title is too short").max(200),
});

// 1.1 سكيمة النصوص المترجمة (Long Text)
export const localizedTextSchema = z.object({
  ar: z.string().min(10, "المحتوى العربي قصير جداً"),
  en: z.string().min(10, "English content is too short"),
});

// 2. سكيمة الصفحة الواحدة (Sections)
export const pageSchema = z.object({
  header: localizedStringSchema,
  pageNumber: z.number().int().positive(),
  content: localizedTextSchema,
  illustrationImage: z.string().optional().or(z.literal("")),
});

// 3. السكيمة الرئيسية للمقال (Article)
export const articleSchema = z.object({
  // اختياري لأن السيرفر يولده من العنوان الإنجليزي
  slug: z.string().optional().or(z.literal("")),

  title: localizedStringSchema,
  description: localizedStringSchema,

  mainImage: z.string().min(1, "Main image is required"),

  // تقبل أي ID قادم من الـ Select (Mongo ID)
  category: z.string().min(1, "Please select a category"),

  // تقبل ID أو نص فارغ (اختياري)
  subCategory: z.string().optional().or(z.literal("")),

  // ضمان وجود مصفوفة حتى لو فارغة
  tags: z.array(z.string()).default([]),

  // حالة المقال مع قيمة افتراضية
  status: z.enum(["draft", "published"]).default("draft"),

  // قيمة بولين صريحة
  isFeatured: z.boolean().default(false),

  // مصفوفة الصفحات (على الأقل صفحة واحدة)
  pages: z.array(pageSchema).min(1, "At least one section is required"),
});

// استخراج الأنواع لاستخدامها في TypeScript
export type ArticleInput = z.infer<typeof articleSchema>;
export type PageInput = z.infer<typeof pageSchema>;
