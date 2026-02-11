/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/jsx-no-undef */
"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

import { useShare } from "@/Hooks/useShare";
import { useIsMobile } from "@/Hooks/useIsMobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Share2,
  Copy,
  QrCode,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  Download,
} from "lucide-react";

export default function ShareButton() {
  const { url, copy, share } = useShare();
  const isMobile = useIsMobile();

  const qrRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        image: "/logo.png",
        dotsOptions: { type: "rounded", color: "#020617" },
        cornersSquareOptions: { type: "extra-rounded" },
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { margin: 6, crossOrigin: "anonymous" },
      });
    }

    qrRef.current.innerHTML = "";
    qrCode.current.append(qrRef.current);
  }, [url]);

  const downloadQR = () => {
    qrCode.current?.download({
      name: "share-qrcode",
      extension: "png",
    });
  };

  const content = (
    <div className="px-4 pb-6 pt-2">
      <ShareActions
        copy={copy}
        share={share}
        qrRef={qrRef}
        downloadQR={downloadQR}
      />
    </div>
  );

  // 📱 Mobile → Bottom Sheet
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="rounded-t-2xl">
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-muted" />
          <h3 className="px-4 pt-4 text-base font-semibold">مشاركة الصفحة</h3>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  // 💻 Desktop → Dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[320px]">{content}</DropdownMenuContent>
    </DropdownMenu>
  );
}
function ShareActions({
  copy,
  share,
  qrRef,
  downloadQR,
}: {
  copy: () => void;
  share: {
    whatsapp: () => void;
    facebook: () => void;
    instagram: () => void;
    linkedin: () => void;
  };
  qrRef: React.RefObject<HTMLDivElement>;
  downloadQR: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Copy */}
      <button
        onClick={copy}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-muted"
      >
        <Copy className="h-4 w-4" />
        نسخ الرابط
      </button>

      {/* Social */}
      <div className="grid grid-cols-2 gap-2">
        <Action icon={MessageCircle} label="واتساب" onClick={share.whatsapp} />
        <Action icon={Facebook} label="فيسبوك" onClick={share.facebook} />
        <Action icon={Instagram} label="إنستجرام" onClick={share.instagram} />
        <Action icon={Linkedin} label="لينكدإن" onClick={share.linkedin} />
      </div>

      <Separator />

      {/* QR */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <QrCode className="h-4 w-4" />
          QR Code
        </div>

        <div className="flex justify-center rounded-xl bg-white p-3">
          <div ref={qrRef} />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={downloadQR}
        >
          <Download className="mr-2 h-4 w-4" />
          تحميل QR
        </Button>
      </div>
    </div>
  );
}

function Action({
  icon: Icon,
  label,
  onClick,
}: {
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition hover:bg-muted"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
