import {Route, Routes} from "react-router-dom";
import SpotifyToolbar from "./components/UI/Toolbar/SpotifyToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import Artist from "./features/artists/Artist.tsx";
import ArtistAlbums from "./features/artists/ArtistAlbums.tsx";
import AlbumCompositions from "./features/albums/AlbumCompositions.tsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<SpotifyToolbar/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path="/artists" element={<Artist />} />
                <Route path="/artists/:artistId/albums" element={<ArtistAlbums />} />
                <Route path="/albums/:albumId" element={<AlbumCompositions />} />
            </Routes>
        </div>
    );
};

export default App;