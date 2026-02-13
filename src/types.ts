export type PostEntity = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  location?: string | null;
  tags?: string[] | null;
  content?: string | RichTextBlock[] | null;
  markdown?: string | null;
  createdAt: string;
  travelDate?: string | null;
  contenZone?: ContentZoneBlock[] | null;
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
  name?: string;
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

export type RichTextZoneBlock = {
  __component: "sections.rich-text";
  id: number;
  body?: RichTextBlock[] | null;
};

export type SliderZoneBlock = {
  __component: "sections.slider";
  id: number;
  caption?: string | null;
  ratio?: string | null;
  autoplay?: boolean | null;
  images?: ContentMediaCover[] | null;
};

export type PictureZoneBlock = {
  __component: "sections.picture";
  id: number;
  alt?: string | null;
  image?: ContentMediaCover | null;
};

export type MarkdownZoneBlock = {
  __component: "sections.markdown";
  id: number;
  body?: string | null;
};

export type ContentZoneBlock =
  | RichTextZoneBlock
  | SliderZoneBlock
  | PictureZoneBlock
  | MarkdownZoneBlock;
