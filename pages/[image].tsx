import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { ImageDetail, loadImageDetails, NameWithUrl } from '../components/static/loadJson';
import { ExifInfo, ImageInfo } from '../components/images-next/types/ImageTypes';
import { GalleryPage } from '../components/GalleryPage';
import { Image } from '../components/images-next/utils/Image';
import { readExifJsonInternal, readImageInternal } from '../components/images-next/static/readImageInternal';

export default function ImagePage({
  imageDetails,
  imageInfo,
  exif,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    filename,
    tags,
    categories,
  } = imageDetails;
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
      <MoreLinks prefix="categories" title="Kategorien" links={categories} />
      <MoreLinks prefix="tags" title="Tags" links={tags} />
    </GalleryPage>
  );
}

function MoreLinks({
  title,
  links,
  prefix,
}: { title: string, prefix: string, links: Array<NameWithUrl> }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="flex items-center justify-center">
        {links.map(({
          url,
          name,
        }) => <Link className="m-2 text-center" key={url} href={`${prefix}/${url}`}>{name}</Link>)}
      </div>
    </div>
  );
}

type PropParams = {
  imageDetails: ImageDetail
  imageInfo: ImageInfo
  exif: ExifInfo

};
export const getStaticProps: GetStaticProps<PropParams, PathParams> = async (context) => {
  const params = context?.params;
  if (params === undefined) {
    return { notFound: true };
  }
  const { image: url } = params;
  const imageDetails = (await loadImageDetails())[url];

  return {
    props: {
      imageDetails,
      imageInfo: await readImageInternal(url),
      exif: (await readExifJsonInternal(url)).exif,
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
