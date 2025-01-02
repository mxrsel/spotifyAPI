export interface Artist {
    _id: string
    name: string;
    artistImage: string | null
    artistBio: string
}

export type ArtistWithoutId = Omit<Artist, "_id">;
export type AlbumWithoutId = Omit<Album, '_id'>;
export type CompositionWithoutId = Omit<Composition, '_id'>;

export interface Album {
    _id: string
    name: string
    artist: string
    released: string
    albumImage: string | null
}

export interface Composition {
    _id: string
    name: string
    album: string
    timing: string
}