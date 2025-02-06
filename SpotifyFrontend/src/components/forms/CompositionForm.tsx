import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CompositionMutation} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllAlbums} from "../../store/thunks/albumThunk/albumThunk.ts";

interface Props {
    onSubmit: (composition: CompositionMutation) => void;
}

const CompositionForm: React.FC<Props> = ({onSubmit}) => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector((state) => state.albums.albums);
    const [form , setForm] = useState<CompositionMutation>({
        album: '',
        name: '',
        timing: '',
        composition_number: '',
        isPublished: false
    });

    useEffect(() => {
        dispatch(getAllAlbums())
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


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(form)
    }


    return (
        <form onSubmit={handleSubmit}>

            {albums.length === 0 ? null : (
                <Grid size={{xs: 12}}>
                    <FormControl fullWidth>
                        <InputLabel id="artist">Album</InputLabel>
                        <Select
                            labelId="albums"
                            id="album_id"
                            value={form.album}
                            name="album"
                            required
                            label="Choose Album"
                            onChange={selectChangeHandler}
                        >
                            <MenuItem value="" disabled>
                                Select Artist
                            </MenuItem>
                            {albums.map((album) => (
                                <MenuItem key={album._id} value={album._id}>
                                    {album.name}
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

            <TextField
                label="timing"
                name="timing"
                value={form.timing}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />


            <Button type="submit" variant="contained" color="primary" sx={{mt: 2}} onClick={() => form.isPublished = true}>
                Create Composition
            </Button>
        </form>
    );
};

export default CompositionForm;