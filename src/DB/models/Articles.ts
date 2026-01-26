// models/Article.js
import { Schema, model, models } from "mongoose";

const ParagraphSchema = new Schema(
  {
    content: String,
    img: String,
  },
  { _id: false }
);

const LangSchema = new Schema(
  {
    title: String,
    paragraphs: [ParagraphSchema],
  },
  { _id: false }
);

const ArticleSchema = new Schema(
  {
    slug: { type: String, unique: true, index: true },
    en: LangSchema,
    ar: LangSchema,
  },
  { timestamps: true }
);

export default models.Article || model("Article", ArticleSchema);
