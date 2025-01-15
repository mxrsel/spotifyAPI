import {Route, Routes} from "react-router-dom";
import SpotifyToolbar from "./components/UI/Toolbar/SpotifyToolbar.tsx";
import RegisterPage from "./features/users/RegisterPage.tsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<SpotifyToolbar/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </div>
    );
};

export default App;