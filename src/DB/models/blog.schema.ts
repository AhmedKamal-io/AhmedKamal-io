import mongoose, { Schema, model, models } from "mongoose";

// سكيمة الصفحة الواحدة
const PageSchema = new Schema({
  header: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  pageNumber: { type: Number, required: true },
  content: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  illustrationImage: { type: String, required: false },
});

// سكيمة المقال الرئيسية
const ArticleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    mainImage: { type: String, required: true },

    // --- الحقول الجديدة التي طلبتها ---
    category: {
      type: mongoose.Schema.Types.ObjectId, // تغيير النوع إلى ObjectID
      ref: "Category", // الإشارة إلى موديل الكاتيجوري الرئيسي
      required: true,
      index: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId, // ربط القسم الفرعي أيضاً بالـ ID الخاص به
      // ملاحظة: بما أن الـ SubCategory مخزن داخل مصفوفة في الـ Category،
      // فنحن نخزن الـ ID الخاص به هنا للرجوع إليه بدقة.
      required: false, // اختياري في حال لم يكن للمقالة قسم فرعي
      index: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // ----------------------------

    pages: [PageSchema],

    stats: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Article = models.Article || model("Article", ArticleSchema);
export default Article;
