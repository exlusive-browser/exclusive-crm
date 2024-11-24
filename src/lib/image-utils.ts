import { BASE_URL } from "../config";

export const importImage = (imgName: string): string =>
  new URL(`../assets/images/${imgName}`, import.meta.url).href;

export const importAsset = (subfolder: string, imgName: string): string =>
  new URL(`../assets/${subfolder}/${imgName}`, import.meta.url).href;

export const getImgUrl = (imgId: string): string =>
  `${BASE_URL}/images/${imgId}`;
