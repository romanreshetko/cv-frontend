import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleUpload = () => {
        // TODO
    }

    useEffect(() => {
        setUploading(true)
    }, [selectedFile]);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <Typography variant='h2' gutterBottom sx={{fontWeight: 'bold', textAlign: 'center', color: '#333'}}>
                RESUME AS CODE
            </Typography>
            <Typography variant='h6' gutterBottom sx={{textAlign: 'center', color: '#333'}}>
                Upload a File
            </Typography>
            <Button component='label' variant='contained' sx={{mb: 2}}>
                Choose File
                <input type='file' id='file-input' onChange={handleFileChange} style={{display: 'none'}}/>
            </Button>

            {selectedFile && <Typography variant='body1' sx={{
                mb: 2, fontWeight: 'bold', color: '#333'
            }}>{selectedFile.name}</Typography>}

            <Button variant='contained' color='primary' disabled={!uploading} onClick={handleUpload}
            sx={{bgcolor: '#007bff', fontSize: '1rem'}}>
                Upload
            </Button>
        </Box>
    )
}

export default FileUpload