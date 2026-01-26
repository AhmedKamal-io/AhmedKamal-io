import Image from "next/image";
const Grid = () => {
  return (
    <div className="flex h-[70%] m-8 sm:m-12 md:m-16 lg:m-24 z-30 w-[97%] md:w-[80%] items-center justify-center ">
      <div className="md:grid grid-cols-4 grid-rows-4 gap-3.5 h-[600px] w-full hidden Bigshadow ">
        {/* Large Screens */}
        <div className="row-span-3 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-3 border-Assend">
          <Image
            src="/image/Landing.jpg"
            alt="Landing"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
          <h3 className="">Landing Pages</h3>
        </div>
        <div className="shadow-xl hover:shadow-Secound col-span-2 rounded-2xl Bigshadow relative transition-all duration-500 border-3 border-Assend">
          <Image
            src="/image/Performance.png"
            alt="Performance"
            loading="lazy"
            layout="fill"
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="col-span-2 row-span-2 col-start-2 shadow-xl border-3 border-Assend transition-all duration-500 hover:shadow-Secound relative row-start-2  rounded-2xl Bigshadow ">
          <Image
            src="/image/E-Commers.jpg"
            alt="Performance"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="rounded-2xl Bigshadow relative col-span-2 col-start-1 row-start-4 transition-all duration-500  shadow-xl hover:shadow-Secound border-3 border-Assend">
          <Image
            src="/image/ServerData.jpg"
            alt="ServerData"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2  Bigshadow relative col-start-4 row-start-1 rounded-2xl shadow-xl hover:shadow-Secound transition-all duration-500 border-3 border-Assend">
          <Image
            src="/image/SaaS.jpg"
            alt="SaaS"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="border-3 border-Assend row-span-2 col-start-4 Bigshadow row-start-3  transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/SEO.jpg"
            alt="SEO"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="col-start-3 row-start-4 relative Bigshadow rounded-2xl overflow-hidden shadow-xl hover:shadow-Secound transition-all duration-500 border-3 border-Assend">
          <Image
            src="/image/Debugging.jpg"
            alt="Debugging"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
      </div>

      {/* Medium Screens */}

      <div className="hidden sm:grid grid-cols-3 grid-rows-6 gap-2.5 Bigshadow md:hidden h-[600px] w-full">
        <div className="row-span-3 transition-all duration-500 border-2 border-Assend rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/Landing.jpg"
            alt="Landing"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-2 border-Assend">
          <Image
            src="/image/Performance.png"
            alt="Performance"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 col-start-2 border-2 border-Assend row-start-3 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/E-Commers.jpg"
            alt="SaaS"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-3 col-start-1 row-start-4 border-2 border-Assend transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/ServerData.jpg"
            alt="ServerData"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-3 col-start-3 row-start-1 border-2 border-Assend transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/SaaS.jpg"
            alt="SaaS"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-3 col-start-3 row-start-4 border-2 border-Assend transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/SEO.jpg"
            alt="SEO"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-5 border-2 border-Assend transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound">
          <Image
            src="/image/Debugging.jpg"
            alt="Debugging"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
      </div>

      {/* Small Screens */}

      <div className="grid grid-cols-2 grid-rows-6 gap-3 sm:hidden h-[600px] w-full">
        <div className="transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/Debugging.jpg"
            alt="Debugging"
            fill
            loading="lazy"
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/Performance.png"
            alt="Performance"
            fill
            loading="lazy"
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/E-Commers.jpg"
            alt="SaaS"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 col-start-2 row-start-3 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/Landing.jpg"
            alt="Landing"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="row-span-2 row-start-4 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/SaaS.jpg"
            alt="SaaS"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="col-start-2 row-start-5 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/SEO.jpg"
            alt="SEO"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
        <div className="col-span-2 row-start-6 transition-all duration-500 rounded-2xl relative shadow-xl hover:shadow-Secound border-1 border-Assend">
          <Image
            src="/image/ServerData.jpg"
            alt="ServerData"
            loading="lazy"
            fill
            className="object-cover rounded-2xl absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;
