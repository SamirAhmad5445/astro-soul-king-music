export type Artist = {
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  description: string;
  isActivated: boolean;
  followersCount: number;
};

export type ArtistStatus = {
  albumsCount: number;
  songsCount: number;
  followersCount: number;
};

export type Album = {
  name: string;
  description: string;
  releaseDate: Date;
};

export type Song = {
  name: string;
  releaseDate: Date;
  likesCount: number;
  playsCount: number;
};

export type AlbumResponse = Album & {
  artistName: string;
};

export type SongResponse = Song & {
  artistName: string;
  albumName: string;
};
