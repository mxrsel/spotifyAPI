export interface User {
    username: string;
    password: string;
    token: string;
}

export interface Artist {
    _id: string
    name: string;
    artistImage: string | null
    artistBio: string
}

export interface ArtistMutation {
    name: string;
    artistImage: File | null;
    artistBio: string;
}

export interface Album {
    _id: string
    name: string
    artist: Artist
    released: number
    albumImage: string | null
}

export interface AlbumMutation {
    artist: string;
    name: string;
    released: number
    albumImage: File | null
}

export interface Composition {
    _id: string
    name: string
    album: Album
    timing: string
}

export interface CompositionMutation {
    album: string;
    name: string;
    timing: string
}

export interface CompositionHistoryTypes {
    user: User
    composition: Composition
    datetime: string
}

export interface CompositionHistoryMutation {
    user: string;
    composition: string
    datetime: string
}

export type ApiArtist = Omit<ArtistMutation, '_id'>;
export type ApiAlbum = Omit<AlbumMutation, '_id'>;

