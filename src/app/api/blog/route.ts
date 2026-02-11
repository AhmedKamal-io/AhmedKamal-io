/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/DB/Mongo-Connect";
import Article from "@/DB/models/blog.schema";
import cloudinary from "@/Settings/cloudinary";
import {
  articleSchema,
  type ArticleInput,
} from "@/validations/blog.validation";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // 1. التحقق بواسطة Zod
    const validation = articleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data: ArticleInput = validation.data;

    // 2. توليد السلاج من العنوان الإنجليزي فقط (احترافي للـ SEO)
    const autoSlug = slugify(data.title.en, {
      lower: true,
      strict: true,
      trim: true,
    });

    // 3. رفع الصور إلى Cloudinary (فقط إذا كانت بصيغة base64)
    let mainImageUrl = data.mainImage;
    if (data.mainImage && data.mainImage.startsWith("data:image")) {
      const mainImageRes = await cloudinary.uploader.upload(data.mainImage, {
        folder: "articles/covers",
      });
      mainImageUrl = mainImageRes.secure_url;
    }

    const processedPages = await Promise.all(
      data.pages.map(async page => {
        let pageImageUrl = page.illustrationImage;
        if (
          page.illustrationImage &&
          page.illustrationImage.startsWith("data:image")
        ) {
          const res = await cloudinary.uploader.upload(page.illustrationImage, {
            folder: "articles/pages",
          });
          pageImageUrl = res.secure_url;
        }
        return { ...page, illustrationImage: pageImageUrl };
      })
    );

    // 4. الحفظ في المونجو (يتضمن الوصف المترجم، IDs الأقسام، والسلاج)
    const newArticle = await Article.create({
      ...data, // تسحب title{ar,en}, description{ar,en}, tags, status, isFeatured...
      slug: autoSlug,
      mainImage: mainImageUrl,
      pages: processedPages,
      stats: { views: 0, likes: 0, shares: 0 },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "English title already exists (Duplicate Slug)" },
        { status: 400 }
      );
    }
    console.error("POST Article Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // جلب كل المقالات مع "اسم" الكاتيجوري الرئيسي
    const articles = await Article.find({})
      .populate("category", "name") // جلب اسم الكاتيجوري فقط
      .sort({ createdAt: -1 });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("GET Articles Error:", error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
