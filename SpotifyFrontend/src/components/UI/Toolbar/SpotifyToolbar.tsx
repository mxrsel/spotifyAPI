import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import SpotifyLogo from './assets/SpotifyLogo.svg'

const SpotifyToolbar = () => {
    return (
       <>
       <div className='navbar' style={{backgroundColor: 'black'}}>
           <NavLink to='/'>
               <Box
                   component='img'
                   sx={{height: 54}}
                   alt='Logo'
                   src={SpotifyLogo}
               />
           </NavLink>

           <NavLink to='/register' className='btn btn-light' style={{borderRadius: '20px'}}>
               Sign Up
           </NavLink>
       </div>
       </>
    );
};

export default SpotifyToolbar;