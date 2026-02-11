/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import connectDB from "@/DB/Mongo-Connect";
import CategorySchema from "@/DB/models/blog.category.schema";

// 1. حذف Sub-category محددة عن طريق الـ ID الخاص بها
export async function DELETE(
  req: Request,
  { params }: { params: { subId: string } },
) {
  try {
    await connectDB();
    // البحث عن الكاتيجوري التي تحتوي على هذا الـ SubId وحذفه من المصفوفة
    await CategorySchema.findOneAndUpdate(
      { "subCategories._id": params.subId },
      { $pull: { subCategories: { _id: params.subId } } },
    );
    return NextResponse.json({ message: "Sub-category deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// 2. تحديث اسم Sub-category محددة
export async function PATCH(
  req: Request,
  { params }: { params: { subId: string } },
) {
  try {
    await connectDB();
    const { name } = await req.json();

    const updated = await CategorySchema.findOneAndUpdate(
      { "subCategories._id": params.subId },
      { $set: { "subCategories.$.name": name } }, // الـ $ علامة العنصر المكتشف
      { new: true },
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
