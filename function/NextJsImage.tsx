import Image from "next/image";
import Link from "next/link";
import type { RenderPhotoProps } from "react-photo-album";

const NextJsImage: React.FC<RenderPhotoProps> = ({
  imageProps: { src, alt, title, className, onClick },
  wrapperStyle,
}) => (
  <div style={wrapperStyle} className="overflow-hidden rounded-lg">
    <Link href={`/album/${title}`}>
      <div
        className="relative h-full w-full transition-all duration-300 hover:scale-105"
      >
        <Image
          fill
          src={src}
          alt={alt}
          title={alt}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className={className}
          onClick={onClick}
        />
      </div>
    </Link>
  </div>
);

export default NextJsImage;
