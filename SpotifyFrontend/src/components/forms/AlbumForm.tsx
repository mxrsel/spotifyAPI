import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import FileInput from "../UI/FileInput/FileInput.tsx";
import {CloudUpload} from "@mui/icons-material";
import {AlbumMutation} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllArtists} from "../../store/thunks/artistThunk/artistThunk.ts";

interface Props {
    onSubmit: (album: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector((state) => state.artists.artists);
    const [form , setForm] = useState<AlbumMutation>({
        artist: '',
        name: '',
        released: '',
        albumImage: null,
        isPublished: false
    });

    useEffect(() => {
        dispatch(getAllArtists())
    }, [dispatch]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const selectChangeHandler = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files[0]) {
            setForm((prev) => ({
                ...prev,
                albumImage: files![0]
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(form)
    }


    return (
        <form onSubmit={handleSubmit}>

            {artists.length === 0 ? null : (
                <Grid size={{xs: 12}}>
                    <FormControl fullWidth>
                        <InputLabel id="artist">Artist</InputLabel>
                        <Select
                            labelId="artist"
                            id="artist_id"
                            value={form.artist}
                            name="artist"
                            required
                            label="Choose Artist"
                            onChange={selectChangeHandler}
                        >
                            <MenuItem value="" disabled>
                                Select Artist
                            </MenuItem>
                            {artists.map((artist) => (
                                <MenuItem key={artist._id} value={artist._id}>
                                    {artist.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            )}

            <TextField
                label="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />

            <FileInput
                fullWidth
                label="Image"
                name="albumImage"
                buttonText="Choose file"
                buttonProps={{startIcon: <CloudUpload/>}}
                onChange={handleFileChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{mt: 2}} onClick={() => form.isPublished = true}>
                Create Album
            </Button>
        </form>
    );
};

export default AlbumForm;