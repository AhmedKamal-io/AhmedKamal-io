import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

type Article = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "How to build scalable web apps",
    description:
      "Learn the key principles to scale your web applications efficiently.",
    link: "#",
    image: "/OIP.webp",
  },
  {
    id: 2,
    title: "Next.js Best Practices",
    description:
      "Tips and tricks to improve performance and maintainability in Next.js.",
    link: "#",
    image: "/OIP.webp",
  },
  {
    id: 3,
    title: "JavaScript Optimization Techniques",
    description:
      "Make your JS code faster and more efficient with these methods.",
    link: "#",
    image: "/OIP.webp",
  },
];

const Blog = () => {
  return (
    <section
      id="blog"
      className="min-h-screen w-full flex flex-col justify-start items-center bg-AssendFade text-Whitey gap-12 relative overflow-hidden"
    >
      {/* ✅ الخلفية تحت كل العناصر */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(245, 240, 255, 0.439) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(130, 77, 255, 0.512) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(39, 0, 78, 0.478) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(108, 108, 106, 0.4) 0%, transparent 65%)
      `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      {/* باقي المحتوى فوق الخلفية */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-16">
        <h2 className="strokePrime text-5xl border-b-2 border-Whitey flex justify-center items-center gap-3 pb-2 mb-12">
          Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-BlackyFade rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <div className="h-48 w-full relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                <p className="mb-4 flex-1">{article.description}</p>
                <Link
                  href={article.link}
                  className="px-6 py-2 border border-Whitey rounded-md hover:bg-Whitey hover:text-Blacky transition bg-Prime flex justify-between items-center duration-500"
                >
                  Read More <FaArrowAltCircleRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
