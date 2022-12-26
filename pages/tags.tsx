import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { GalleryPage } from '../components/GalleryPage';
import { loadTagDetails } from '../components/static/loadJson';

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title="Tag Übersicht">
      <ul>
        {tags.map(([url, name]) => <li key={url}><Link href={`/tags/${url}`}>{name}</Link></li>)}
      </ul>
    </GalleryPage>
  );
}

export const getStaticProps: GetStaticProps<{ tags: Array<[string, string]> }> = async () => {
  const tags: Array<[string, string]> = Object.entries(await loadTagDetails())
    .map(([url, tag]) => [url, tag.name]);

  return {
    props: { tags },
  };
};
