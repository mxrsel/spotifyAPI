import React, {ChangeEvent, FormEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import FileInput from "../UI/FileInput/FileInput.tsx";
import {CloudUpload} from "@mui/icons-material";
import {ArtistMutation} from "../../types.ts";

interface Props {
    onSubmit: (artist: ArtistMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
    const [form , setForm] = useState<ArtistMutation>({
        name: '',
        artistImage: null,
        artistBio: '',
        isPublished: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files && files[0]) {
            setForm((prev) => ({
                ...prev,
                artistImage: files![0]
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(form)
    }


    return (
        <form onSubmit={handleSubmit}>

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
                label="artistBio"
                name="artistBio"
                value={form.artistBio}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />

            <FileInput
                fullWidth
                label="Image"
                name="artistImage"
                buttonText="Choose file"
                buttonProps={{startIcon: <CloudUpload/>}}
                onChange={handleFileChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{mt: 2}} onClick={() => form.isPublished = true}>
                Create Artist
            </Button>
        </form>
    );
};

export default AlbumForm;