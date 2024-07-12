export default interface Favorite {
  id: string;
  name: string;
  userId: string,
  articleId: string;
}

export interface FavoriteDto {
  name: string;
}