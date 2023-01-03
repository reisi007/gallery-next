import Link from 'next/link';
import classNames from 'classnames';
import { Gallery, GalleryProps } from './images-next/gallery/Gallery';
import styles from './images-next/caroussel/FullscreenImage.module.css';

export function GalleryWithInfo(props: Omit<GalleryProps, 'children'>) {
  return (
    <Gallery {...props}>
      {(fileName) => <Link href={`/${fileName.toLowerCase()}`} className={classNames(styles.actionButton, 'black')}>i</Link>}
    </Gallery>
  );
}
