import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { readMultipleImagesInternal } from '../../components/images-next/static/readImageInternal';
import { ImageInfo } from '../../components/images-next/types/ImageTypes';
import { GalleryPage } from '../../components/GalleryPage';
import { loadTagDetails } from '../../components/static/loadJson';
import { GalleryWithInfo } from '../../components/GalleryWithInfo';

export default function TagPage({
  tag: name,
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage
      title={name}
      keywords={useMemo(() => [name], [name])}
      description={`Hier findest du ${images.length} Bilder zum Thema ${name}!`}
    >
      <GalleryWithInfo images={images} />
    </GalleryPage>
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
