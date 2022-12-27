import Link from 'next/link';
import { GalleryPage } from '../components/GalleryPage';

export default function Index() {
  return (
    <GalleryPage title="Übersicht">
      <ul>
        <li><Link href="/categories">Alle Kategorien</Link></li>
        <li><Link href="/tags">Alle Tags</Link></li>
      </ul>
    </GalleryPage>
  );
}
