import classNames from 'classnames';
import Link from 'next/link';
import { Styleable } from '../images-next/types/Styleable';
import { SubcategoryDetail } from '../static/loadJson';
import { ImageInfo } from '../images-next/types/ImageTypes';
import { Breakpoint, Image, ImageBreakpoints } from '../images-next/utils/Image';

const SUBCATEGORY_IMAGE_BREAKPOINTS: ImageBreakpoints = {
  [Breakpoint.default]: 1,
  [Breakpoint.sm]: 1,
  [Breakpoint.md]: 2,
  [Breakpoint.lg]: 2,
  [Breakpoint.xl]: 3,
  [Breakpoint['2xl']]: 3,
};

export function Subcategories({
  className,
  subcategories,
  subcategoryImages,
}: Pick<Styleable, 'className'> & { subcategories: Array<SubcategoryDetail>, subcategoryImages: { [key: string]: ImageInfo } }) {
  return (
    <div className={classNames('grid md:grid-cols-2 xl:grid-cols-3 my-2', className)}>
      {subcategories.map((s) => <SubcategoryCard {...s} key={s.url} imageInfo={subcategoryImages[s.image]} />)}
    </div>
  );
}

function SubcategoryCard({
  url,
  name,
  image,
  imageInfo,
}: SubcategoryDetail & { imageInfo: ImageInfo }) {
  return (
    <Link href={url} className="black relative">
      <Image className="h-96 max-h-96" moreHeightConstraints="24rem" filename={image} size={imageInfo.size} breakpoints={SUBCATEGORY_IMAGE_BREAKPOINTS} alt={imageInfo.metadata.title} />
      <span className="absolute inset-x-0 bottom-0 bg-black/80 p-2 text-center text-xl text-white">{name}</span>
    </Link>
  );
}
