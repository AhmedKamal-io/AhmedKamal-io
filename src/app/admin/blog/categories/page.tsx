/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Check,
  X,
  ChevronDown,
  Plus,
  Loader2,
  FolderTree,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
export default function CategoriesManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // جلب البيانات
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/blog/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // دالة الحذف (رئيسي أو فرعي)
  const handleDelete = async (id: string, isSub: boolean = false) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    const url = isSub
      ? `/api/blog/categories/sub/${id}`
      : `/api/blog/categories/${id}`;
    try {
      await axios.delete(url);
      toast.success("Deleted successfully");
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // دالة التعديل (رئيسي أو فرعي)
  const handleUpdate = async (id: string, isSub: boolean = false) => {
    if (!editValue.trim()) return setEditingId(null);

    const url = isSub
      ? `/api/blog/categories/sub/${id}`
      : `/api/blog/categories/${id}`;
    try {
      await axios.patch(url, { name: editValue });
      toast.success("Updated successfully");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-Blacky text-Whitey min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-white/5 rounded-2xl">
          <FolderTree className="text-white/60" size={30} />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Categories Taxonomy
          </h1>
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
            Manage your blog structure
          </p>
        </div>
        <Button
          variant="outline"
          asChild
          className="flex-1 lg:flex-none border-white/10 bg-transparent text-Whitey hover:bg-Whitey hover:text-Blacky rounded-full h-11 px-6 transition-all font-medium"
        >
          <Link href="/admin/blog/categories/new">
            <BiCategory className="mr-2 h-4 w-4" /> Categories
          </Link>
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {categories.map(cat => (
          <AccordionItem
            key={cat._id}
            value={cat._id}
            className="border border-white/5 bg-white/[0.02] rounded-2xl px-6 overflow-hidden"
          >
            <div className="flex items-center gap-4 w-full group">
              {/* جزء التعديل للكاتيجوري الرئيسي */}
              {editingId === cat._id ? (
                <div className="flex items-center gap-2 flex-1 py-4">
                  <Input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="bg-Blacky border-white/20 h-9"
                    autoFocus
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleUpdate(cat._id)}
                    className="text-green-500 hover:bg-green-500/10"
                  >
                    <Check size={18} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                    className="text-red-500 hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ) : (
                <>
                  <AccordionTrigger className="flex-1 hover:no-underline py-6">
                    <span className="text-lg font-bold tracking-tight">
                      {cat.name}
                    </span>
                  </AccordionTrigger>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(cat._id);
                        setEditValue(cat.name);
                      }}
                      className="text-white/40 hover:text-white"
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(cat._id)}
                      className="text-white/20 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </>
              )}
            </div>

            <AccordionContent className="pb-6">
              <div className="pl-6 border-l border-white/10 space-y-3 pt-2">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">
                  Sub Categories
                </p>
                {cat.subCategories?.map((sub: any) => (
                  <div
                    key={sub._id}
                    className="flex items-center justify-between group/sub py-2 border-b border-white/[0.02]"
                  >
                    {editingId === sub._id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          className="bg-Blacky border-white/20 h-8 text-sm"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleUpdate(sub._id, true)}
                          className="h-8 w-8 text-green-500"
                        >
                          <Check size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                          className="h-8 w-8 text-red-500"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-white/60">
                          {sub.name}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover/sub:opacity-100 transition-all">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditingId(sub._id);
                              setEditValue(sub.name);
                            }}
                            className="h-8 w-8 text-white/40 hover:text-white"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(sub._id, true)}
                            className="h-8 w-8 text-white/20 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="w-full mt-4 border border-dashed border-white/10 text-white/40 text-xs h-9 hover:bg-white/5 rounded-xl"
                >
                  <Plus size={14} className="mr-2" /> Add Sub Category
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
