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
    value: React.ReactNode;
  };
}
