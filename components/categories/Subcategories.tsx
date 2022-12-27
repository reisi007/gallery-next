import classNames from 'classnames';
import { Styleable } from '../images-next/types/Styleable';
import { SubcategoryDetail } from '../static/loadJson';
import { ImageInfo } from '../images-next/types/ImageTypes';
import { Breakpoint, ImageBreakpoints, ImageWithText } from '../images-next/utils/Image';

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
  return <ImageWithText className="h-96 max-h-96" moreHeightConstraints="24rem" breakpoints={SUBCATEGORY_IMAGE_BREAKPOINTS} text={name} url={url} filename={image} {...imageInfo} />;
}
