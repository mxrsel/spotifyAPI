import React, {useState} from 'react';
import {User} from "../../../types.ts";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logoutUser} from "../../../store/slices/userSlice/userSlice.ts";
import {logout} from "../../../store/thunks/userThunk/userThunk.ts";

interface Props {
    user: User
}

const ExistsUser: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const onClose = () => {
        setAnchorEl(null);
    }

    const userLogout = () => {
        dispatch(logout());
        dispatch(logoutUser())
    }

    return (
        <>
            <div>
            <Button
            onClick={onClick}
            style={{color: 'white'}}>
                {user.username}
            </Button>
            <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}>

                {user && user.role === 'admin' &&
                    <MenuItem>
                        <NavLink to='/admin' className='text-decoration-none text-black'>
                            For Admin
                        </NavLink>
                    </MenuItem>
                }
                <MenuItem>
                    <NavLink to='/newArtist' className='text-decoration-none text-black'>
                        Add New Artist
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/newAlbum' className='text-decoration-none text-black'>
                        Add New Album
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/newComposition' className='text-decoration-none text-black'>
                        Add New Composition
                    </NavLink>
                </MenuItem>
                <MenuItem >
                    <NavLink
                        to='/histories'
                    className='text-decoration-none text-black'>
                        History
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    Settings
                </MenuItem>
                <MenuItem
                onClick={userLogout}>
                    Log out
                </MenuItem>
            </Menu>
            </div>
        </>
    );
};

export default ExistsUser;