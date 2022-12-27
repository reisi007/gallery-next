import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { loadRootCategories, SubcategoryDetail } from '../components/static/loadJson';
import { GalleryPage } from '../components/GalleryPage';
import { Breakpoint, ImageBreakpoints, ImageWithText } from '../components/images-next/utils/Image';
import { MetadataMap } from '../components/images-next/types/ImageTypes';
import { readMultipleImagesInternal } from '../components/images-next/static/readImageInternal';

const TAGS_IMAGE_BREAKPOINTS: ImageBreakpoints = {
  [Breakpoint.default]: 1,
  [Breakpoint.sm]: 1,
  [Breakpoint.md]: 2,
  [Breakpoint.lg]: 2,
  [Breakpoint.xl]: 3,
  [Breakpoint['2xl']]: 3,
};

export default function Categories({
  subcategories,
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title="Alle Kategorien">
      <div className="my-2 grid md:grid-cols-2 xl:grid-cols-3">
        {subcategories.map(({
          image,
          url,
          name,
        }) => {
          const imageInfo = images[image];
          return <ImageWithText key={url} className="h-96 max-h-96" breakpoints={TAGS_IMAGE_BREAKPOINTS} filename={image} text={name} url={`categories/${url}`} {...imageInfo} />;
        })}
      </div>
    </GalleryPage>
  );
}

export const getStaticProps: GetStaticProps<{ subcategories: Array<SubcategoryDetail>, images: MetadataMap<string> }> = async () => {
  const subcategories = await loadRootCategories();
  const images = await readMultipleImagesInternal(subcategories.map((e) => e.image));
  return {
    props: {
      subcategories,
      images,
    },
  };
};
