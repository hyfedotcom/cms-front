export interface Media {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export type MediaFile = {
  url: string;
  width: number;
  height: number;
};
export interface MediaData {
  placeholder?: MediaFile;
  video?: MediaFile;
}
