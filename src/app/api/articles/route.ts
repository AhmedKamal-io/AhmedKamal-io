// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import connectDB from "@/DB/ConnectDB";
// import Article from "@/DB/models/Articles";
// import { articleSchema } from "@/Types/validation/article.schema";

// /* =========================
//   POST → Create Article
// ========================= */
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     // Zod Validation
//     const data = articleSchema.parse(body);

//     const article = await Article.create(data);

//     return NextResponse.json(article, { status: 201 });
//   } catch (error: any) {
//     if (error.name === "ZodError") {
//       return NextResponse.json({ errors: error.errors }, { status: 400 });
//     }

//     if (error.code === 11000) {
//       return NextResponse.json(
//         { message: "Slug already exists" },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
