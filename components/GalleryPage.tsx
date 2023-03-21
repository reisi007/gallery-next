import React from 'react';

import { PathEntry } from './images-next/page/NavMenu';
import { BasePage, BasePageProps } from './images-next/page/BasePage';
import { HeaderProps } from './images-next/page/Header';

const PATHS: { [key: string]: PathEntry } = {
  categories: {
    title: 'Alle Kategorien',
    important: true,
  },
  tags: {
    title: 'Alle Tags',
    important: true,
  },
  'https://reisinger.pictures': {
    title: 'Fotoshooting mit mir',
    important: true,
  },
};

export function GalleryPage({
  children,
  ...props
}: BasePageProps & Omit<HeaderProps, 'menuItems'>) {
  return (
    <BasePage menuItems={PATHS} {...props}>{children}</BasePage>
  );
}
