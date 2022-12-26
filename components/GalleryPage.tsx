import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Head from 'next/head';
import { CONTAIINER_CLASSES } from './images-next/utils/Css';
import { FooterContent } from './images-next/page/FooterContent';

export type GalleryPageProps = { children: ReactNode, title: string, className?: string };

export function GalleryPage({
  children,
  className,
  title,
}: GalleryPageProps) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <header>
        <h1>{title}</h1>
      </header>
      <main className={classNames(CONTAIINER_CLASSES, className)}>
        {children}
      </main>
      <FooterContent />
    </>
  );
}
