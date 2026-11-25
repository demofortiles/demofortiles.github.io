import { imgSrcSet, imgUrl, type ImgSrc } from "../../data/content";

interface Props {
  src: ImgSrc;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  width?: number;
  style?: React.CSSProperties;
}

/** Responsive, lazy-loaded image with srcset for Pexels IDs. */
export function Img({ src, alt, className = "", sizes = "100vw", eager, width = 1200, style }: Props) {
  return (
    <img
      src={imgUrl(src, width)}
      srcSet={imgSrcSet(src)}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={style}
    />
  );
}
