/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/DB/Mongo-Connect";
import Article from "@/DB/models/blog.schema";
import cloudinary from "@/Settings/cloudinary";
import {
  articleSchema,
  type ArticleInput,
} from "@/validations/blog.validation";
import slugify from "slugify";

// 1. جلب مقال واحد بالسلاج
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = params;

    // بنعمل populate للكاتيجوري عشان نجيب بيانات القسم كاملة
    const article = await Article.findOne({ slug }).populate("category");

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching article" },
      { status: 500 }
    );
  }
}

// 2. تحديث المقال بالسلاج (PUT)
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug: oldSlug } = params;
    const body = await req.json();

    const validation = articleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const data: ArticleInput = validation.data;

    // إعادة توليد السلاج في حالة تعديل العنوان الإنجليزي
    const newSlug = slugify(data.title.en, {
      lower: true,
      strict: true,
      trim: true,
    });

    // معالجة الصورة الرئيسية (Cloudinary)
    let mainImageUrl = data.mainImage;
    if (data.mainImage.startsWith("data:image")) {
      const res = await cloudinary.uploader.upload(data.mainImage, {
        folder: "articles/covers",
      });
      mainImageUrl = res.secure_url;
    }

    // معالجة صور الصفحات
    const processedPages = await Promise.all(
      data.pages.map(async page => {
        let pageImg = page.illustrationImage;
        if (page.illustrationImage?.startsWith("data:image")) {
          const res = await cloudinary.uploader.upload(page.illustrationImage, {
            folder: "articles/pages",
          });
          pageImg = res.secure_url;
        }
        return { ...page, illustrationImage: pageImg };
      })
    );

    // التحديث باستخدام oldSlug
    const updatedArticle = await Article.findOneAndUpdate(
      { slug: oldSlug },
      {
        ...data,
        slug: newSlug, // السلاج الجديد
        mainImage: mainImageUrl,
        pages: processedPages,
      },
      { new: true }
    );

    if (!updatedArticle)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// 3. حذف المقال بالسلاج
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = params;

    const deletedArticle = await Article.findOneAndDelete({ slug });

    if (!deletedArticle)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
