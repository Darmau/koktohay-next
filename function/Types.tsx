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
  src: string;
  height: number;
  width: number;
  alt: string;
  large: string;
  original: string;
}

export interface Photos {
  photos: Photo[];
}