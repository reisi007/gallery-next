import path from 'path';
import { promises as fs } from 'fs';

const privateDir = path.join(process.cwd(), 'private');

export async function loadImageDetails(): Promise<ImageDetails> {
  return JSON.parse(await fs.readFile(path.join(privateDir, 'images.json'), 'utf8'));
}

export async function loadCategoryDetails(): Promise<CategoryDetails> {
  return JSON.parse(await fs.readFile(path.join(privateDir, 'categories.json'), 'utf8'));
}

export async function loadTagDetails(): Promise<TagDetails> {
  return JSON.parse(await fs.readFile(path.join(privateDir, 'tags.json'), 'utf8'));
}

export async function loadRootCategories(): Promise<Array<SubcategoryDetail>> {
  return JSON.parse(await fs.readFile(path.join(privateDir, 'rootCategories.json'), 'utf8'));
}

export type ImageDetails = { [filenameWithoutExtension: string]: ImageDetail };
export type ImageDetail = { filename: string, categories: Array<string>, tags: Array<string> };

export type CategoryDetails = { [filenameWithoutExtension: string]: CategoryDetail };
export type CategoryDetail = { name: string, images: Array<string>, subcategories: Array<SubcategoryDetail> };
export type SubcategoryDetail = { url: string, name: string, image: string };

export type TagDetails = { [filenameWithoutExtension: string]: TagDetail };
export type TagDetail = { name: string, images: Array<string> };
