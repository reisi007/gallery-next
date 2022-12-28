import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Head from 'next/head';
import { FooterContent } from './images-next/page/FooterContent';
import styles from './images-next/utils/Utils.module.css';

export type GalleryPageProps = { children: ReactNode, title: string, className?: string };

export type HeaderProps = { title: string, description?: string, keywords?: Array<string> };

export function GalleryPage({
  children,
  className,
  title,
  keywords,
  description,
}: GalleryPageProps & HeaderProps) {
  const keywordString = keywords?.join(',');
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        {keywordString !== undefined && keywordString.length > 0 && <meta name="keywords" content={keywordString} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <header className="my-4">
        <h1>{title}</h1>
      </header>
      <main className={classNames(styles.container, className)}>
        {children}
      </main>
      <FooterContent />
    </>
  );
}
