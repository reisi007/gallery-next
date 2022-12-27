import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import { loadImageDetails } from '../components/static/loadJson';
import { ExifInfo, ImageInfo } from '../components/images-next/types/ImageTypes';
import { GalleryPage } from '../components/GalleryPage';
import { Image } from '../components/images-next/utils/Image';
import { readExifJsonInternal, readImageInternal } from '../components/images-next/static/readImageInternal';

export default function ImagePage({
  filename,
  imageInfo,
  exif,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title={imageInfo.metadata.title}>
      <Image className="my-4" filename={filename} {...imageInfo} />
      <div className="mx-auto my-4 grid w-full grid-cols-1 sm:w-3/4 sm:grid-cols-2 md:w-1/2">
        {Object.entries(exif)
          .map(([k, v]) => (
            <Fragment key={k}>
              <div>{k}</div>
              <div>{v}</div>
            </Fragment>
          ))}
      </div>
    </GalleryPage>
  );
}

type PropParams = {
  filename: string
  imageInfo: ImageInfo
  exif: ExifInfo

};
export const getStaticProps: GetStaticProps<PropParams, PathParams> = async (context) => {
  const params = context?.params;
  if (params === undefined) {
    return { notFound: true };
  }
  const { image: filename } = params;
  return {
    props: {
      filename,
      imageInfo: await readImageInternal(filename),
      exif: (await readExifJsonInternal(filename)).exif,
    },
  };
};

interface PathParams extends ParsedUrlQuery {
  image: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const data = await loadImageDetails();
  const paths: Array<{ params: PathParams }> = Object.keys(data)
    .map((image) => ({ params: { image: image.toLowerCase() } }));
  return {
    paths,
    fallback: false,
  };
};
