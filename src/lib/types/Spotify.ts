export interface SpotifyToken {
    authenticated: boolean
    token: string
    refresh_token: string
}

export interface songsJSON {
    name: string;
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
    artists: {
      name: string;
    }[];
  }