import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if ((!fileName.endsWith('.yaml') && !fileName.endsWith('.yml'))) {
                setErrorMessage('Only yaml files are possible to upload.')
                setSuccessMessage('');
                setSelectedFile(null);
                return;
            }
            setErrorMessage("");
            setSelectedFile(file);
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage("Please select a file first.");
            setSuccessMessage('');
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        
        try {
            const response = await fetch('http://localhost:8081/validate', {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("File is validated! Please, wait while cv is generating.");
                setUploading(!uploading);
            } else {
                setErrorMessage(data.message || "Unknown error");
            }
        } catch {
            setErrorMessage("Something went wrong. Please try again.");
            setSuccessMessage('');
        }
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
            {errorMessage && (
                <Typography variant='body2' sx={{color: 'red', textAlign: 'center'}}>
                    {errorMessage}
                </Typography>
            )}
            {successMessage && (
                <Typography variant='body2' sx={{color: 'green', textAlign: 'center'}}>
                    {successMessage}
                </Typography>
            )}
        </Box>
    )
}

export default FileUpload