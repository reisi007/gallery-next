import path from 'path';
import {promises as fs} from 'fs';
import exp from 'constants';

const privateDir = path.join(process.cwd(), 'private');


export async function loadGalleryCache(): Promise<GalleryCache> {
  return JSON.parse(await fs.readFile(path.join(privateDir, 'gallery.cache.json'), 'utf8'));
}

type GalleryCache = {
  imageInformationData: { [key: string]: Image }
  rootCategory: Array<Category>
  computedTags: Array<Tag | Array<Image>>
}

type Category = {
  categoryName: { complexName: string }
  images: Array<Image>,
  thumbnailImage: Image
  subcategories?: Array<Category>
}

type Tag = { name: string };
type Image = {
  filename: string
  title: string,
  tags: Array<Tag>
  exifInformation: Partial<Record<ExifKey, string>>,
  categories: Array<string>
}

type ExifKey =
  'CAMERA_MAKE'
  | 'CAMERA_MODEL'
  | 'LENS_MODEL'
  | 'FOCAL_LENGTH'
  | 'CREATION_DATETIME'
  | 'APERTURE'
  | 'SHUTTER_SPEED'
  | 'ISO'

export function urlsafeName(tag: { name:string }) {
  return tag.name.toLowerCase().replaceAll(' ', '_');
}


