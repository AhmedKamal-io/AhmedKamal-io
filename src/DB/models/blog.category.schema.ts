import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // مصفوفة كائنات (Objects) تحتوي على الأقسام الفرعية
  subCategories: [
    {
      name: { type: String, required: true },
    },
  ],
});

const Category = models.Category || model("Category", CategorySchema);
export default Category;
