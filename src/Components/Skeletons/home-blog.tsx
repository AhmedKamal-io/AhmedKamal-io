export const HomeBlogSkeleton = () => {
  // بنعمل Array وهمي عشان نعرض مثلاً 3 كروت مكان المقالات
  const skeletonCards = Array(3).fill(0);

  return (
    <section className="min-h-screen w-full flex flex-col justify-start items-center bg-AssendFade text-Whitey gap-12 relative overflow-hidden">
      {/* نفس الخلفية عشان الشكل يفضل متناسق */}
      <div
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(245, 240, 255, 0.439) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(130, 77, 255, 0.512) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl px-6 py-16">
        {/* Skeleton للعنوان */}
        <div className="flex justify-center mb-12">
          <div className="h-12 w-40 bg-gray-700/50 animate-pulse rounded-md border-b-2 border-gray-600"></div>
        </div>

        {/* Grid الكروت */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="bg-BlackyFade rounded-xl overflow-hidden shadow-lg flex flex-col animate-pulse"
            >
              {/* مكان الصورة */}
              <div className="h-48 w-full bg-gray-700/60"></div>

              <div className="p-6 flex flex-col flex-1 gap-4">
                {/* مكان العنوان */}
                <div className="h-8 bg-gray-700/80 rounded w-3/4"></div>

                {/* مكان الوصف (سطرين) */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                </div>

                {/* مكان الزرار */}
                <div className="mt-auto h-10 bg-gray-700/90 rounded-md w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
