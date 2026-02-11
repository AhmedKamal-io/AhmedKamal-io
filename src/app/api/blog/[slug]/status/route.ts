/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import connectDB from "@/DB/Mongo-Connect";
import Article from "@/DB/models/blog.schema";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = params;
    const body = await req.json();
    const { type, action, value } = body;

    const headerList = await headers();
    const cookieStore = await cookies();

    // 1. استخراج الـ IP (اختياري للتحليل)
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // 2. التحقق من صلاحيات الأدمن
    const adminSecret = headerList.get("x-admin-secret");
    const isAdmin = adminSecret === process.env.ADMIN_SECRET;

    // 3. منطق تحكم الأدمن (Reset or Force Value)
    if (action === "ADMIN_CONTROL" && isAdmin) {
      const updateData = { [`stats.${type}`]: value !== undefined ? value : 0 };

      const updated = await Article.findOneAndUpdate(
        { slug },
        { $set: updateData },
        { new: true, runValidators: false } // ضروري لتخطي قيود السكيمة (Category ID)
      );

      if (!updated)
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
      return NextResponse.json(updated.stats);
    }

    // 4. منطق التفاعل العام (Views, Likes, Shares)
    if (!["views", "likes", "shares"].includes(type)) {
      return NextResponse.json({ message: "Invalid Type" }, { status: 400 });
    }

    // فحص الكوكيز لمنع تكرار العملية لنفس المستخدم (إلا لو كان أدمن)
    const cookieName = `art_${type}_${slug}`;
    const alreadyDone = cookieStore.get(cookieName);

    if (alreadyDone && !isAdmin) {
      return NextResponse.json(
        { message: "Already recorded", stats: "skipped" }, // أضفت stats للتوضيح في الفرونت
        { status: 200 }
      );
    }

    // 5. التحديث الذري (Atomic Update) باستخدام $inc
    const updatedArticle = await Article.findOneAndUpdate(
      { slug },
      { $inc: { [`stats.${type}`]: 1 } },
      { new: true, runValidators: false }
    );

    if (!updatedArticle) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    // 6. تعيين الكوكيز للمستخدم العادي لمنع التكرار
    if (!isAdmin) {
      cookieStore.set(cookieName, "true", {
        maxAge: 60 * 60 * 24 * 7, // أسبوع واحد
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return NextResponse.json(updatedArticle.stats);
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
