import Link from 'next/link';
import { GalleryPage } from '../components/GalleryPage';

export default function Index() {
  return (
    <GalleryPage title="Übersicht">
      <ul>
        <li><Link href="/categories/chronologisch">Alle Bilder Chronologisch</Link></li>
        <li><Link href="/categories/ausruestung">Nach Ausrüstung gruppiert</Link></li>
        <li><Link href="/categories/fotoshootings">Fotoshootings</Link></li>
        <li><Link href="/tags">Alle Tags</Link></li>
      </ul>
    </GalleryPage>
  );
}
