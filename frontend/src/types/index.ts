export interface Comment {
  id: number;
  postId: number;
  nickname: string;
  comment: string;
  date: string;
}
export interface Recipe {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  likes: number;
  comments: number;
  category: string;
  recipe: string;
  date: string;
  writer: string;
  isHot?: boolean;
}
export interface CsItem {
  id: number;
  title: string;
  nickname: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}
export interface PlaceProps {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  isHot: boolean;
  date: string;
  writer: string;
}
export interface NewItem {
  imgSrc: string;
  imgArt: string;
  title: string;
  url: string;
  date: string;
}
