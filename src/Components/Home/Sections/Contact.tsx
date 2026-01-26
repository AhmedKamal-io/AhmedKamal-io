import Image from "next/image";
import { BiSolidMessage } from "react-icons/bi";
import {
  FaGlobeAfrica,
  FaGlobeAmericas,
  FaPhoneAlt,
  FaUserAlt,
} from "react-icons/fa";
import { SiMailboxdotorg } from "react-icons/si";

const Contact = () => {
  return (
    // تم إضافة min-h-screen لضمان أن السكشن يأخذ طول الشاشة كاملاً
    <section
      id="contact"
      className="bg-WhiteyFade relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/image/WorldMap.png"
        alt="WorldMap"
        fill
        loading="lazy"
        className="object-cover absolute z-0" // أضفت opacity بسيطة لجمالية النص فوق الخريطة
      />

      {/* الحاوية الرئيسية أصبحت مرنة أكثر في الارتفاع */}
      <div className="relative z-10 w-full max-w-[95%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[50%] mx-auto py-10 flex flex-col justify-center">
        {/* العنوان: تم ضبط الـ margins ليكون متناسقاً */}
        <h2 className="text-Blacky text-3xl md:text-4xl w-fit mx-auto mb-8 border-b-2 border-Blacky pb-2 GlueSecound flex justify-center items-center gap-3">
          <FaGlobeAmericas /> Contact Me <FaGlobeAfrica />
        </h2>

        {/* الفورم: تم تحسين الـ padding والمسافات الداخلية */}
        <form className="bg-WhiteyFade backdrop-blur-[8px] rounded-3xl border-Secound border-2 text-Whitey p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl md:text-2xl text-Blacky w-fit mx-auto mb-6 font-semibold">
            Send Me a Message
          </h2>

          {/* شبكة داخلية لتقسيم المدخلات في الشاشات الكبيرة (اختياري) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-2">
                <h3 className="text-Blacky flex items-center gap-2 text-lg">
                  <FaUserAlt className="text-sm" /> Full Name
                </h3>
              </label>
              <input
                id="fullName"
                type="text"
                className="rounded-lg border border-Blacky focus:shadow-lg focus:shadow-Secound outline-none w-full p-3 bg-BlackyFade text-Blacky transition-all duration-500"
                required
                placeholder="Ahmed Kamal"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">
                <h3 className="text-Blacky text-lg flex items-center gap-2">
                  <SiMailboxdotorg className="text-sm" /> Email
                </h3>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="Example@domain.com"
                className="rounded-lg border border-Blacky focus:shadow-lg focus:shadow-Secound outline-none w-full p-3 bg-BlackyFade text-Blacky transition-all duration-500"
              />
            </div>
          </div>

          {/* Phone Number - يأخذ السطر كاملاً أو يمكن ضمه للشبكة */}
          <label htmlFor="phone" className="mt-4 block mb-2">
            <h3 className="text-Blacky text-lg flex items-center gap-2">
              <FaPhoneAlt className="text-sm" /> Phone Number
            </h3>
          </label>
          <input
            id="phone"
            type="number"
            placeholder="01110101010"
            className="block rounded-lg border border-Blacky focus:shadow-lg focus:shadow-Secound outline-none w-full p-3 bg-BlackyFade text-Blacky transition-all duration-500"
          />

          {/* Message */}
          <label htmlFor="message" className="mt-4 block mb-2">
            <h3 className="text-Blacky text-lg flex items-center gap-2">
              <BiSolidMessage className="text-sm" /> Message
            </h3>
          </label>
          <textarea
            id="message"
            required
            className="resize-none block rounded-lg border border-Blacky focus:shadow-lg focus:shadow-Secound outline-none w-full p-3 bg-BlackyFade text-Blacky transition-all duration-500 h-32 md:h-40"
          />

          {/* Submit Button - تم توسيطه في الموبايل وجعله متناسقاً */}
          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              className="bg-Prime hover:bg-Secound text-Whitey mt-6 rounded-xl px-10 py-3 w-full md:w-fit font-bold transition-colors duration-300 shadow-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
