/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/DB/Mongo-Connect";
import CategorySchema from "@/DB/models/blog.category.schema";

export async function GET() {
  try {
    await connectDB();
    const categories = await CategorySchema.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // 1. تنظيف البيانات (هنا يكمن الحل)
    // نأخذ الـ name فقط ونتجاهل أي id أو حقول إضافية مبعوثة من الفرونت إند
    const cleanedSubCategories = body.subCategories?.map((sub: any) => ({
      name: sub.name.trim(),
    })) || [];

    // 2. التحقق من أن الاسم الرئيسي موجود وله قيمة
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    // 3. الإنشاء باستخدام البيانات المنظفة
    const newCategory = await CategorySchema.create({
      name: body.name.trim(),
      subCategories: cleanedSubCategories,
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    console.error("SERVER_POST_ERROR:", error); // لمراقبة الخطأ الحقيقي في الـ Terminal

    // التعامل مع خطأ تكرار الاسم (Unique Constraint)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "This category name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Invalid data submitted" },
      { status: 400 },
    );
  }
}