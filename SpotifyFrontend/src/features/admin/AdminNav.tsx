import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

const AdminNav = () => {
    return (
        <Grid container>
            <Grid>
                <Typography variant="h5">
                    Admin Nav
                </Typography>
            </Grid>
            <Grid>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/artists'>
                            <ListItemText primary='Artists'/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/albums'>
                            <ListItemText primary='Albums'/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/compositions'>
                            <ListItemText primary='Compostions'/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/users'>
                            <ListItemText primary='Users'/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default AdminNav;