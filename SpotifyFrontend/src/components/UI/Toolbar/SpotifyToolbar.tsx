import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import SpotifyLogo from './assets/SpotifyLogo.svg'
import {useAppSelector} from "../../../app/hooks.ts";
import UnknownUser from "./UnknownUser.tsx";
import ExistsUser from "./ExistsUser.tsx";

const SpotifyToolbar = () => {
    const user = useAppSelector((state) => state.users.user)
    return (
       <>
       <div className='navbar position-sticky' style={{backgroundColor: 'black'}}>
           <NavLink to='/'>
               <Box
                   component='img'
                   sx={{height: 54}}
                   alt='Logo'
                   src={SpotifyLogo}
               />
           </NavLink>

           {user ? (
               <>
                  <ExistsUser user={user}/>
               </>
           ) : (
               <>
                   <UnknownUser />
               </>
           )}

       </div>
       </>
    );
};

export default SpotifyToolbar;