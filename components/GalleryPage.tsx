import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { CONTAIINER_CLASSES } from './images-next/utils/Css';
import { Footer } from './images-next/page/Footer';

export type GalleryPageProps = { children: ReactNode, title: string, className?: string };

export function GalleryPage({
  children,
  className,
  title,
}: GalleryPageProps) {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main className={classNames(CONTAIINER_CLASSES, className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
