export interface Artist {
    _id: string
    name: string;
    artistImage: string | null
    artistBio: string
    isPublished: boolean
}

export type ArtistWithoutId = Omit<Artist, "_id">;
export type AlbumWithoutId = Omit<Album, '_id'>;
export type CompositionWithoutId = Omit<Composition, '_id'>;

export interface Album {
    _id: string
    name: string
    artist: string
    released: number
    albumImage: string | null
    isPublished: boolean
}

export interface Composition {
    _id: string
    name: string
    album: string
    timing: string
    composition_number: number
    isPublished: boolean
}

export interface CompositionHistoryTypes {
    user: string
    composition: string
    datetime: string
}

export interface UserTypes {
    username: string
    password: string
    token: string
    role: string
}