import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { loadCategoryDetails, SubcategoryDetail } from '../../components/static/loadJson';
import { ImageInfo } from '../../components/images-next/types/ImageTypes';
import { GalleryPage } from '../../components/GalleryPage';
import { readMultipleImagesInternal } from '../../components/images-next/static/readImageInternal';
import { Subcategories } from '../../components/categories/Subcategories';
import { GalleryWithInfo } from '../../components/GalleryWithInfo';

export default function CategoryPage({
  category: name,
  subcategories,
  subcategoryImages,
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title={name}>
      <h2 className="my-2">Unterkategorien</h2>
      <Subcategories className="mb-8" subcategories={subcategories} subcategoryImages={subcategoryImages} />
      <h2 id="bilder" className="my-2">Bilder</h2>
      <GalleryWithInfo images={images} />
    </GalleryPage>
  );
}

interface PathParams extends ParsedUrlQuery {
  categories: Array<string>;
}

type PropParams = {
  category: string

  subcategories: Array<SubcategoryDetail>

  subcategoryImages: { [key: string]: ImageInfo }
  images: Array<[string, ImageInfo]>

};

export const getStaticProps: GetStaticProps<PropParams, PathParams> = async (context) => {
  const { params } = context;
  if (params === undefined) {
    return { notFound: true };
  }
  const { categories } = params;
  const categoryUrl = categories.join('/');

  const data = await loadCategoryDetails();

  const categoryDetail = data[categoryUrl];

  return {
    props: {
      subcategories: categoryDetail.subcategories,
      category: categoryDetail.name,
      images: Object.entries(await readMultipleImagesInternal(categoryDetail.images)),
      subcategoryImages: await readMultipleImagesInternal(categoryDetail.subcategories.map((e) => e.image)),
    },
  };
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await loadCategoryDetails();
  const paths: Array<{ params: PathParams }> = Object.keys(data)
    .map((category) => ({ params: { categories: category.split('/') } }));
  return {
    paths,
    fallback: false,
  };
};
