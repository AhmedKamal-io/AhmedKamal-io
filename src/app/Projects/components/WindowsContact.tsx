import {
  Send,
  Paperclip,
  MoreVertical,
  Trash2,
  Smile,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export function WindowsContact() {
  return (
    <div className="flex flex-col h-full bg-[#1f1f1f] text-[#e3e3e3] rounded-sm overflow-hidden">
      {/* 1. Gmail Header Bar - شريط العنوان العلوي */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3f3f3f]">
        <div className="flex items-center gap-2">
          <Image
            src={`/icons/gmail/gmail-logo.png`}
            width={20}
            height={20}
            alt="Gmail"
            className=" bg-[#ea4335] rounded-full shadow-[0_0_8px_rgba(234,67,53,0.4)]"
          />
          <span className="text-[12px] font-medium tracking-wide">
            New Message
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Trash2
            size={14}
            className="no-drag cursor-pointer text-gray-400 hover:text-red-400 transition-colors"
          />
        </div>
      </div>

      {/* 2. Form Area - منطقة إدخال البيانات */}
      <div className="flex-1 flex flex-col p-0 bg-[#1f1f1f]">
        {/* Recipient Field */}
        <div className="flex items-center px-4 py-2 border-b border-[#333] group focus-within:bg-[#252525] transition-colors">
          <span className="text-[12px] text-gray-500 w-10">To</span>
          <input
            type="text"
            defaultValue="ahmed.kamal@dev.com"
            className="no-drag bg-transparent border-none outline-none text-[13px] w-full text-blue-400 font-medium"
            spellCheck="false"
          />
          <span className="text-[10px] text-gray-600 no-drag cursor-pointer hover:text-gray-400">
            Cc Bcc
          </span>
        </div>

        {/* Subject Field */}
        <div className="flex items-center px-4 py-2 border-b border-[#333] focus-within:bg-[#252525] transition-colors">
          <input
            type="text"
            placeholder="Subject"
            className="no-drag bg-transparent border-none outline-none text-[13px] w-full placeholder:text-gray-600 focus:placeholder:text-gray-500"
          />
        </div>

        {/* Message Body - منطقة الرسالة */}
        <div className="flex-1 p-4 relative">
          <textarea
            placeholder="Type your message here..."
            className="no-drag w-full h-full bg-transparent border-none outline-none text-[14px] resize-none leading-relaxed placeholder:text-gray-700 scrollbar-thin scrollbar-thumb-[#333]"
            style={{ caretColor: "#0b57d0" }}
          />
        </div>
      </div>

      {/* 3. Bottom Toolbar - شريط الأدوات السفلي */}
      <div className="px-4 py-3 bg-[#1f1f1f] border-t border-[#333] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Custom Send Button */}
          <button
            className="no-drag bg-[#0b57d0] hover:bg-[#0b66ff] active:scale-95 text-white text-[13px] font-medium px-5 py-1.5 rounded-full flex items-center gap-2 transition-all shadow-lg"
            onClick={() => alert("Message Sent!")}
          >
            Send
            <Send size={14} />
          </button>

          {/* Action Icons */}
          <div className="flex items-center gap-1 text-gray-400">
            <button className="no-drag p-2 hover:bg-[#333] hover:text-white rounded-md transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="no-drag p-2 hidden sm:block hover:bg-[#333] hover:text-white rounded-md transition-colors">
              <Smile size={16} />
            </button>
            <button className="no-drag p-2 hidden sm:block hover:bg-[#333] hover:text-white rounded-md transition-colors">
              <ImageIcon size={16} />
            </button>
          </div>
        </div>

        <button className="no-drag p-2 hover:bg-[#333] rounded-md transition-colors">
          <MoreVertical size={16} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
