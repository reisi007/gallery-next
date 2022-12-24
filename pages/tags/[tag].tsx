import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Gallery } from '../../components/images-next/gallery/Gallery';
import { readMultipleImagesInternal } from '../../components/images-next/static/readImageInternal';
import { ImageInfo } from '../../components/images-next/types/ImageTypes';
import { BasePage } from '../../components/images-next/page/BasePage';
import { loadTagDetails } from '../../components/static/loadJson';

export default function TagPage({
  tag: name,
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BasePage title={name}>
      <Gallery images={images} />
    </BasePage>
  );
}

type PropParams = {
  tag: string
  images: Array<[string, ImageInfo]>

};

export const getStaticProps: GetStaticProps<PropParams, PathParams> = async (context) => {
  const { params } = context;
  if (params === undefined) {
    return { notFound: true };
  }
  const { tag } = params;
  const data = await loadTagDetails();

  const tagDetail = data[tag];

  if (tagDetail === undefined) {
    return { notFound: true };
  }

  const imageInfos = await readMultipleImagesInternal(tagDetail.images);
  return {
    props: {
      tag: tagDetail.name,
      images: Object.entries(imageInfos),
    },
  };
};

interface PathParams extends ParsedUrlQuery {
  tag: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await loadTagDetails();
  const paths: Array<{ params: PathParams }> = Object.keys(data)
    .map((tag) => ({ params: { tag } }));
  return {
    paths,
    fallback: false,
  };
};
