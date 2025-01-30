export interface User {
    _id: string
    username: string;
    token: string
}

export interface RegisterResponse {
    user: User;
    message: string
}

export interface ValidationErr {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    }
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string
}

export interface RegisterUser {
    username: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
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
    released: string
    albumImage: File | null
}

export interface Composition {
    _id: string
    name: string
    album: Album
    timing: string
    composition_number: number
}

export interface CompositionMutation {
    album: string;
    name: string;
    timing: string
    composition_number: string
}

export interface CompositionHistoryTypes {
    _id: string
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

