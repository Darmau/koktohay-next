export type Props = {
  children: React.ReactNode;
};

export interface Labels {
  [key: string]: Labels | any;
}

export interface ContentsProps {
  [key: string]: any;
  pageSize?: number;
  pagination?: {
    pageCount: number;
    total: number;
    page: number;
  };
}

export interface ContentList {
  id: string;
  attributes: {
    [x: string]: any;
    title: string;
    publishDate?: Date;
    url: string;
    localizations?: {
      data: ContentList[];
    }
    value: React.ReactNode;
  };
}

export interface Photo {
  smallSrc: string;
  smallHeight: number;
  smallWidth: number;
  alt: string;
  original: string;
  largeWidth: number;
  largeHeight: number;
  width: number;
  height: number;
}

export interface Photos {
  photos: Photo[];
}