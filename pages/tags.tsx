import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { GalleryPage } from '../components/GalleryPage';
import { loadTagDetails } from '../components/static/loadJson';
import { ImageInfo } from '../components/images-next/types/ImageTypes';
import { readImageInternal } from '../components/images-next/static/readImageInternal';
import { asyncMap } from '../components/images-next/utils/asyncFlatMap';
import { ImageWithText } from '../components/images-next/utils/Image';

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title="Tag Übersicht">
      <div className="my-2 grid md:grid-cols-2 xl:grid-cols-3">
        {tags.map(([url, name, image, imageInfo]) => (
          <ImageWithText key={url} moreHeightConstraints="24rem" filename={image} text={name} className="h-96 max-h-96" url={`/tags/${url}`} {...imageInfo} />))}
      </div>
    </GalleryPage>
  );
}

export const getStaticProps: GetStaticProps<{ tags: Array<[string, string, string, ImageInfo]> }> = async () => {
  const tags = await asyncMap(Object.entries(await loadTagDetails()), async ([url, tag]): Promise<[string, string, string, ImageInfo]> => {
    const image = tag.images[0];
    return [url, tag.name, image, await readImageInternal(image)];
  });

  return {
    props: { tags },
  };
};
