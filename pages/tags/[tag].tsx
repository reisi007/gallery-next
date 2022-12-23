import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import {loadGalleryCache, urlsafeName} from '../../components/static/loadJson';
import {ParsedUrlQuery} from 'querystring';
import {Gallery} from '../../components/images-next/gallery/Gallery';
import {readMultipleImagesInternal} from '../../components/images-next/static/readImageInternal';
import {ImageInfo} from '../../components/images-next/types/ImageTypes';
import {BasePage} from '../../components/images-next/page/BasePage';

export default function TagPage({tag: name, images}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <BasePage title={name}>
    <Gallery images={images}/>
  </BasePage>;

}

type PropParams = {
  tag: string
  images: Array<[string, ImageInfo]>

}

export const getStaticProps: GetStaticProps<PropParams, PathParams> = async (context) => {
  const {params} = context;
  if(params === undefined) {
    return {notFound: true};
  }
  // TODO remove this and compute tags via js
  const cache = await loadGalleryCache();
  const tagId = cache.computedTags.findIndex(e => !Array.isArray(e) && urlsafeName(e) === params.tag);
  const images = cache.computedTags[tagId + 1];
  const tag = cache.computedTags[tagId];
  if(!Array.isArray(images) || Array.isArray(tag)) {
    return {notFound: true};
  }


  const imageInfos = await readMultipleImagesInternal(images.map(e => e.filename));
  return {
    props: {
      tag: tag.name,
      images: Object.entries(imageInfos),
    },
  };
};

interface PathParams extends ParsedUrlQuery {
  tag: string;
}


export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const cache = await loadGalleryCache();
  const paths: Array<{ params: PathParams }> = [];
  for(let i = 0; i < cache.computedTags.length; i += 2) {
    const tag = cache.computedTags[i];
    const images = cache.computedTags[i + 1];
    if(!Array.isArray(tag) && Array.isArray(images)) {
      paths.push({
        params: {
          tag: urlsafeName(tag),
          name: tag.name,
          images: images.map(i => i.filename),
        },
      });
    }
  }
  return {paths, fallback: false};
};
