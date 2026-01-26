import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-Blacky text-white">
      <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-Secound via-Prime to-Blacky md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
      </div>
    </div>
  );
};

export default loading;
