import { Content404 } from '../components/images-next/404';
import { GalleryPage } from '../components/GalleryPage';

export default function ErrorPage() {
  return (
    <GalleryPage title="404: Seite nicht gefunden">
      <Content404 />
    </GalleryPage>
  );
}
