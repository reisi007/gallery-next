import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment, useMemo } from 'react';
import Link from 'next/link';
import { ImageDetail, loadImageDetails, NameWithUrl } from '../components/static/loadJson';
import { ExifInfo, ExifTagsType, ImageInfo } from '../components/images-next/types/ImageTypes';
import { GalleryPage } from '../components/GalleryPage';
import { Image } from '../components/images-next/utils/Image';
import { readExifJsonInternal, readImageInternal } from '../components/images-next/static/readImageInternal';
import { formatDateTime } from '../components/images-next/utils/Age';

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
    <GalleryPage title={imageInfo.metadata.title} keywords={useMemo(() => tags.map((e) => e.name), [tags])}>
      <Image className="my-4" filename={filename} {...imageInfo} />
      <h3>EXIF Daten</h3>
      <div className="mx-auto my-4 grid w-full grid-cols-1 sm:w-3/4 sm:grid-cols-2 md:w-1/2">
        {Object.entries(exif)
          .map(([k, v]) => {
            if (v === undefined) {
              return false;
            }
            return (
              <Fragment key={k}>
                <div>{exifKey2String(k)}</div>
                <div>{exifValue2String(k, v)}</div>
              </Fragment>
            );
          })}
      </div>
      <MoreLinks prefix="categories" title="Kategorien" links={categories} />
      <MoreLinks prefix="tags" title="Tags" links={tags} />
    </GalleryPage>
  );
}

function exifValue2String(key: ExifTagsType, value: string): string {
  switch (key) {
    case 'CREATION_DATETIME':
      return formatDateTime(value);
    default:
      return value;
  }
}

function exifKey2String(key: ExifTagsType): string {
  switch (key) {
    case 'CAMERA_MAKE':
      return 'Kamera Hersteller';
    case 'CAMERA_MODEL':
      return 'Kamera Modell';
    case 'LENS_MODEL':
      return 'Objektiv';
    case 'FOCAL_LENGTH':
      return 'Brennweite';
    case 'APERTURE':
      return 'Brennweite';
    case 'SHUTTER_SPEED':
      return 'Verschlusszeit';
    default:
      return key;
  }
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
    .map((image) => ({ params: { image } }));
  return {
    paths,
    fallback: false,
  };
};
