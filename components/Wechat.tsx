import QRcode from "@/public/img/wechat-qr.jpg";
import Image from "next/image";

export default function Wechat() {
  return (
    <div className="rounded-lg bg-gray-50 p-8">
      <h3 className="text-base font-semibold leading-7 text-gray-900">
        关注公众号
      </h3>
      <div className="mt-4 space-y-1 text-sm leading-6 text-gray-600">
        <Image 
          src={QRcode}
          width={256}
          height={256}
          alt="公众号二维码"
        />
      </div>
    </div>
  );
}
