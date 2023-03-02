import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

const NextJsImage: React.FC<RenderPhotoProps> = ({
    imageProps: { src, alt, title, sizes, className, onClick },
    wrapperStyle,
}) => (
    <div style={wrapperStyle}>
        <div style={{ display: "block", position: "relative", width: "100%", height: "100%" }}>
            <Image fill src={src} alt={alt} title={title} sizes={sizes} className={className} onClick={onClick} />
        </div>
    </div>
);

export default NextJsImage;