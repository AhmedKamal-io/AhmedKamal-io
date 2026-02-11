/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import connectDB from "@/DB/Mongo-Connect";
import CategorySchema from "@/DB/models/blog.category.schema";

// 1. جلب قسم معين بالـ ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const category = await CategorySchema.findById(params.id);
    if (!category)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// 2. تحديث قسم معين (Patch)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
      },
    );
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
}

// 3. حذف قسم بالكامل
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    await CategorySchema.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete Failed" }, { status: 500 });
  }
}
