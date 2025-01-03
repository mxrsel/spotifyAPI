export interface Artist {
    _id: string
    name: string;
    artistImage: string | null
    artistBio: string
}

export interface Album {
    _id: string
    name: string
    artist: Artist
    released: string
    albumImage: string | null
}

export interface Composition {
    _id: string
    name: string
    album: Album
    timing: string
}

export interface ArtistMutation {
    name: string;
    artistImage: File | null
    artistBio: string
}

export interface AlbumMutation {
    name: string
    artist: string
    released: string
    albumImage: File | null
}

export interface CompositionMutation {
    name: string
    album: string
    timing: string
}