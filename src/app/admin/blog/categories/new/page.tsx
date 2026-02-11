/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Plus, Trash2, FolderPlus, Loader2, Save } from "lucide-react";
import {
  categorySchema,
  type CategoryInput,
} from "@/validations/category.blog.validation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewCategoryPage() {
  const [loading, setLoading] = useState(false);

  const {
  register,
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  resolver: zodResolver(categorySchema),
  defaultValues: {
    name: "",
    subCategories: [],
  },
});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit = async (data: CategoryInput): Promise<void> => {
    setLoading(true);
    const toastId = toast.loading("Creating category...");
    try {
      await axios.post("/api/blog/categories", data);
      toast.success("Category created successfully!", { id: toastId });
      reset(); // تصفير الفورم بعد النجاح
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 text-Whitey bg-Blacky min-h-screen font-second">
      <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <div className="p-3 bg-white/5 rounded-2xl">
          <FolderPlus className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">
            Add New Category
          </h1>
          <p className="text-white/20 text-xs">
            Manage your blog structure by adding main and sub categories.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Main Category Name */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] space-y-4">
          <Label className="text-[10px] text-white/40 tracking-widest font-bold uppercase">
            Main Category Name
          </Label>
          <Input
            {...register("name")}
            placeholder="e.g. Technology, Health, Business..."
            className="bg-Blacky border-white/10 h-14 rounded-2xl text-lg font-bold focus:ring-1 focus:ring-white/20 transition-all"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Sub Categories Dynamic List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-sm font-bold tracking-widest text-white/40 uppercase">
              Sub-Categories
            </h3>
            <Button
              type="button"
              onClick={() => append({ name: "" })}
              variant="outline"
              className="rounded-full border-white/10 text-[10px] h-9 hover:bg-white/5"
            >
              <Plus size={16} className="mr-1" /> ADD SUB-CATEGORY
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="group flex items-center gap-3 p-4 bg-white/[0.01] border border-white/5 rounded-2xl transition-all hover:border-white/10"
              >
                <div className="flex-1 space-y-1">
                  <Input
                    {...register(`subCategories.${index}.name`)}
                    placeholder="Sub-category name..."
                    className="bg-transparent border-none h-8 p-0 focus-visible:ring-0 text-sm font-medium"
                  />
                  {errors.subCategories?.[index]?.name && (
                    <p className="text-red-500 text-[10px]">
                      {errors.subCategories[index].name?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full text-white/10 group-hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>

          {fields.length === 0 && (
            <div className="text-center py-10 border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
              <p className="text-white/10 text-xs italic">
                No sub-categories added yet.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-white/5">
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-Whitey text-Blacky rounded-full font-black h-14 text-lg hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Save className="mr-2" size={20} />
            )}
            SAVE CATEGORY STRUCTURE
          </Button>
        </div>
      </form>
    </div>
  );
}
