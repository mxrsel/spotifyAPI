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
                <MenuItem>
                    Profile
                </MenuItem>
                <MenuItem >
                    <NavLink
                        to='/composition_history'
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