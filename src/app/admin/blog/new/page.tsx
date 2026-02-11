/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  Trash2,
  Loader2,
  Plus,
  LayoutGrid,
  Type,
  AlignLeft,
} from "lucide-react";

import {
  articleSchema,
  type ArticleInput,
} from "@/validations/blog.validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloudinaryUploadWidget from "@/components/providers/CloudinaryUploadWidget";

// واجهة لبيانات الأقسام القادمة من السيرفر
interface Category {
  _id: string;
  name: { ar: string; en: string };
  subCategories: { _id: string; name: { ar: string; en: string } }[];
}

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: { ar: "", en: "" },
      description: { ar: "", en: "" },
      mainImage: "",
      category: "",
      subCategory: "",
      tags: [],
      status: "draft",
      isFeatured: false,
      pages: [
        {
          header: { ar: "", en: "" },
          content: { ar: "", en: "" },
          pageNumber: 1,
          illustrationImage: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "pages" });

  // 1. جلب الأقسام عند تحميل الصفحة
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/blog/categories");
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // مراقبة القسم المختار لجلب الأقسام الفرعية الخاصة به
  const selectedCategoryId = watch("category");
  const subCategories =
    categories.find(c => c._id === selectedCategoryId)?.subCategories || [];

  const onSubmit = async (data: ArticleInput) => {
    setLoading(true);
    const toastId = toast.loading("Publishing article...");
    try {
      await axios.post("/api/blog", data);
      toast.success("Article published successfully!", { id: toastId });
      router.push("/admin/blog");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to publish", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 text-Whitey bg-Blacky min-h-screen font-second">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">
              Create New Post
            </h1>
            <p className="text-white/20 text-xs mt-1">
              Multi-language support enabled (Arabic & English).
            </p>
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full md:w-auto bg-Whitey text-Blacky rounded-full px-12 font-bold hover:scale-105 transition-all h-12"
          >
            {loading ? <Loader2 className="animate-spin" /> : "PUBLISH POST"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Titles & Descriptions Section */}
            <section className="space-y-6 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-white/40 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <Type size={14} /> Title (EN)
                  </Label>
                  <Input
                    {...register("title.en")}
                    placeholder="Post title in English..."
                    className="bg-Blacky border-white/10 h-12 rounded-xl"
                  />
                  {errors.title?.en && (
                    <p className="text-red-500 text-[10px]">
                      {errors.title.en.message}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label className="text-white/40 flex items-center gap-2 justify-end text-[10px] uppercase tracking-widest font-bold">
                    العنوان (عربي) <Type size={14} />
                  </Label>
                  <Input
                    {...register("title.ar")}
                    dir="rtl"
                    placeholder="عنوان المقال بالعربي..."
                    className="bg-Blacky border-white/10 h-12 rounded-xl text-right"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-3">
                  <Label className="text-white/40 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <AlignLeft size={14} /> Description (EN)
                  </Label>
                  <Textarea
                    {...register("description.en")}
                    placeholder="Short summary in English..."
                    className="bg-Blacky border-white/10 rounded-xl min-h-[80px]"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white/40 flex items-center gap-2 justify-end text-[10px] uppercase tracking-widest font-bold">
                    الوصف المختصر (عربي) <AlignLeft size={14} />
                  </Label>
                  <Textarea
                    {...register("description.ar")}
                    dir="rtl"
                    placeholder="ملخص قصير للمقال بالعربي..."
                    className="bg-Blacky border-white/10 rounded-xl text-right min-h-[80px]"
                  />
                </div>
              </div>
            </section>

            {/* Dynamic Pages Sections */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-sm font-bold tracking-widest text-white/40 uppercase">
                  Content Sections
                </h3>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      header: { ar: "", en: "" },
                      content: { ar: "", en: "" },
                      pageNumber: fields.length + 1,
                      illustrationImage: "",
                    })
                  }
                  variant="outline"
                  className="rounded-full border-white/10 text-[10px] h-8 hover:bg-white/5"
                >
                  <Plus size={14} className="mr-1" /> ADD SECTION
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 md:p-8 border border-white/5 bg-white/[0.01] rounded-[2.5rem] space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <span className="bg-white/5 px-4 py-1 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      Section #{index + 1}
                    </span>
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Input
                        {...register(`pages.${index}.header.en`)}
                        placeholder="Heading (EN)"
                        className="bg-transparent border-white/10 font-bold"
                      />
                      <Textarea
                        {...register(`pages.${index}.content.en`)}
                        placeholder="English content..."
                        className="bg-transparent border-white/10 min-h-[150px]"
                      />
                    </div>
                    <div className="space-y-4">
                      <Input
                        {...register(`pages.${index}.header.ar`)}
                        dir="rtl"
                        placeholder="العنوان الفرعي (عربي)"
                        className="bg-transparent border-white/10 font-bold text-right"
                      />
                      <Textarea
                        {...register(`pages.${index}.content.ar`)}
                        dir="rtl"
                        placeholder="المحتوى بالعربي..."
                        className="bg-transparent border-white/10 min-h-[150px] text-right"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <CloudinaryUploadWidget
                      value={watch(`pages.${index}.illustrationImage` as any)}
                      onChange={url =>
                        setValue(`pages.${index}.illustrationImage` as any, url)
                      }
                      onRemove={() =>
                        setValue(`pages.${index}.illustrationImage` as any, "")
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Main Image */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
              <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase block text-center">
                Cover Image
              </Label>
              <CloudinaryUploadWidget
                value={watch("mainImage")}
                onChange={url =>
                  setValue("mainImage", url, { shouldValidate: true })
                }
                onRemove={() => setValue("mainImage", "")}
              />
              {errors.mainImage && (
                <p className="text-red-500 text-[10px] text-center">
                  {errors.mainImage.message}
                </p>
              )}
            </div>

            {/* Categorization Card */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-8">
              {/* Category Select */}
              <div className="space-y-3">
                <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
                  Main Category
                </Label>
                <Select
                  onValueChange={val => {
                    setValue("category", val);
                    setValue("subCategory", "");
                  }}
                  value={watch("category")}
                >
                  <SelectTrigger className="bg-Blacky border-white/10 h-12 rounded-xl">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-Blacky border-white/10 text-Whitey">
                    {categories.map(cat => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name.en} | {cat.name.ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub-Category Select (Conditional) */}
              <div className="space-y-3">
                <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
                  Sub Category
                </Label>
                <Select
                  onValueChange={val => setValue("subCategory", val)}
                  value={watch("subCategory")}
                  disabled={!selectedCategoryId || subCategories.length === 0}
                >
                  <SelectTrigger className="bg-Blacky border-white/10 h-12 rounded-xl">
                    <SelectValue
                      placeholder={
                        subCategories.length === 0
                          ? "No sub-categories"
                          : "Select Sub-category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-Blacky border-white/10 text-Whitey">
                    {subCategories.map(sub => (
                      <SelectItem key={sub._id} value={sub._id}>
                        {sub.name.en} | {sub.name.ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stats & Status */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="space-y-0.5">
                  <Label className="text-xs font-bold">Featured Post</Label>
                  <p className="text-[9px] text-white/20">
                    Highlight on homepage
                  </p>
                </div>
                <Switch
                  checked={watch("isFeatured")}
                  onCheckedChange={val => setValue("isFeatured", val)}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
                  Publication Status
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    onClick={() => setValue("status", "draft")}
                    variant={
                      watch("status") === "draft" ? "default" : "outline"
                    }
                    className={`rounded-xl text-[10px] h-10 ${watch("status") === "draft" ? "bg-white text-black" : "border-white/10"}`}
                  >
                    DRAFT
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setValue("status", "published")}
                    variant={
                      watch("status") === "published" ? "default" : "outline"
                    }
                    className={`rounded-xl text-[10px] h-10 ${watch("status") === "published" ? "bg-green-600 text-white" : "border-white/10"}`}
                  >
                    PUBLISH
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
                  Tags (Keywords)
                </Label>
                <div className="relative">
                  <Input
                    placeholder="react, branding, ai..."
                    className="bg-Blacky border-white/10 h-12 rounded-xl pl-10"
                    onChange={e =>
                      setValue(
                        "tags",
                        e.target.value.split(",").map(t => t.trim())
                      )
                    }
                  />
                  <LayoutGrid
                    className="absolute left-3 top-3.5 text-white/10"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
