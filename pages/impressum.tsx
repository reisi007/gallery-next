import { GalleryPage } from '../components/GalleryPage';
import Markdown from '../components/images-next/impressum.mdx';

export default function Impressum() {
  return (
    <GalleryPage className="mt-4" title="Impressum">
      <Markdown />
    </GalleryPage>
  );
}
