import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { GalleryPage } from '../components/GalleryPage';
import { loadImageDetails } from '../components/static/loadJson';

export default function Index({ numberOfImages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <GalleryPage title="Übersicht">
      <Head>
        <meta name="google-site-verification" content="WzDto29AqxoBHzInsq0NZnNhkrP26qqIsFPQmtBiCKw" />
      </Head>
      <h3>Herzlich Willkommen auf meiner Webseite</h3>
      <p className="text-center">
        Auf dieser Webseite kannst du
        {' '}
        <big className="font-logo text-primary">{numberOfImages}</big>
        {' '}
        meiner Bilder sehen. Klicke dich einfach durch!
      </p>
    </GalleryPage>
  );
}

export const getStaticProps: GetStaticProps<{ numberOfImages: number }> = async () => {
  const numberOfImages = Object.keys(await loadImageDetails()).length;

  return {
    props: { numberOfImages },
  };
};
