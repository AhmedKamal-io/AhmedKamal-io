"use server";

import cloudinary from "./cloudinary";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  // تحويل الملف إلى Buffer ليتمكن Cloudinary من قراءته في السيرفر
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // يكتشف تلقائياً فيديو أو صورة
        folder: "blog_content",
        // التحويلات لضغط الملفات وتحسين الجودة
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error.message);
        resolve(result?.secure_url || "");
      },
    );

    uploadStream.end(buffer);
  });
}
