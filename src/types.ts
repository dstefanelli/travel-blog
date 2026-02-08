export type PostEntity = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | RichTextBlock[] | null;
  markdown?: string | null;
  createdAt: string;
  travelDate?: string | null;
  coverImage: ContentMediaCover;
  gallery?: ContentMediaCover[] | null;
};

export type RichTextBlock = {
  type?: string;
  text?: string;
  children?: RichTextBlock[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  level?: number;
  format?: string;
};

export type ContentMediaCover = {
  id: number;
  alternativeText?: string | null;
  caption?: string | null;
  url?: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
};
