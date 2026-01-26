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
    <section id="contact" className="bg-WhiteyFade relative">
      <Image
        src="/Image/WorldMap.png"
        alt="WorldMap"
        fill
        loading="lazy"
        className="object-cover absolute"
      />

      <div className="flex item-center flex-col justify-center z-10 w-[95%] md:w-[80%] lg:w-[60%] mx-auto py-8">
        <h2 className="text-Blacky text-4xl z-20 w-fit mx-auto my-6 border-b-2 border-Blacky pt-7 GlueSecound flex justify-center items-center gap-3">
          <FaGlobeAmericas /> Contact Me <FaGlobeAfrica />
        </h2>

        <form className="bg-WhiteyFade backdrop-blur-[5px] rounded-2xl outline-1 outline-Blacky border-Secound border-2 text-Whitey p-4 m-4 text-md">
          <h2 className="text-2xl text-Blacky w-fit mx-auto my-3.5">
            Send Me a Message
          </h2>

          {/* Full Name */}
          <label htmlFor="fullName" className="mt-4 block">
            <h3 className="text-Blacky flex justify-start items-center gap-2 text-xl">
              <FaUserAlt />
              Full Name
            </h3>
          </label>
          <input
            id="fullName"
            type="text"
            className="block rounded-lg border-1 border-Blacky focus:shadow-lg focus:shadow-Secound w-full p-2 bg-BlackyFade my-1 transition-all duration-500"
            required
            placeholder="Ahmed Kamal"
          />
          {/* Email */}
          <label htmlFor="email" className="mt-4 block">
            <h3 className="text-Blacky text-xl flex justify-start items-center gap-2">
              <SiMailboxdotorg />
              Email
            </h3>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Example@domain.com"
            className="block rounded-lg border-1 border-Blacky focus:shadow-lg focus:shadow-Secound w-full p-2 bg-BlackyFade my-1 transition-all duration-500"
          />

          {/* Phone Number */}
          <label htmlFor="phone" className="mt-4 block">
            <h3 className="text-Blacky text-xl flex justify-start items-center gap-2">
              <FaPhoneAlt />
              Phone Number
            </h3>
          </label>
          <input
            id="phone"
            type="number"
            placeholder="01110101010"
            className="block rounded-lg border-1 border-Blacky focus:shadow-lg focus:shadow-Secound w-full p-2 bg-BlackyFade my-1 transition-all duration-500"
          />

          {/* Message */}
          <label htmlFor="message" className="mt-4 block">
            <h3 className="text-Blacky text-xl flex justify-start items-center gap-2">
              <BiSolidMessage /> Message
            </h3>
          </label>
          <textarea
            id="message"
            required
            className="resize-none block rounded-lg border-1 border-Blacky focus:shadow-lg focus:shadow-Secound w-full p-2 bg-BlackyFade my-1 transition-all duration-500 h-36"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-Prime text-Whitey mt-4 rounded-2xl px-7 py-2.5 w-fit mx-8"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
