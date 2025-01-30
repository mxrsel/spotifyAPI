import {Route, Routes} from "react-router-dom";
import SpotifyToolbar from "./components/UI/Toolbar/SpotifyToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";
import Artist from "./features/artists/Artist.tsx";
import ArtistAlbums from "./features/artists/ArtistAlbums.tsx";
import AlbumCompositions from "./features/albums/AlbumCompositions.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import History from "./features/history/History.tsx";
import NewAlbum from "./containers/newAlbum/newAlbum.tsx";
import NewArtist from "./containers/newArtist/newArtist.tsx";
import NewComposition from "./containers/newComposition/newComposition.tsx";
import AdminLayout from "./features/admin/AdminLayout.tsx";
import {useAppSelector} from "./app/hooks.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminArtistList from "./features/admin/AdminArtistList.tsx";
import AdminAlbumList from "./features/admin/AdminAlbumList.tsx";
import AdminCompositionList from "./features/admin/AdminCompositionList.tsx";

const App = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
        <div>

            <header>
                <SpotifyToolbar />
            </header>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path="/" element={<Artist />} />
                <Route path="/albums/:artistId/albums" element={<ArtistAlbums />} />
                <Route path="/albums/:albumId" element={<AlbumCompositions />} />
                <Route path='/histories' element={<History/>}/>
                <Route path='/newAlbum' element={<NewAlbum/>}/>
                <Route path='/newArtist' element={<NewArtist/>}/>
                <Route path='/newComposition' element={<NewComposition/>}/>


                <Route path='/admin' element={
                    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                        <AdminLayout/>
                    </ProtectedRoute>}>
                    <Route path='artists' element={<AdminArtistList/>}/>
                    <Route path='albums' element={<AdminAlbumList/>}/>
                    <Route path='compositions' element={<AdminCompositionList/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App;