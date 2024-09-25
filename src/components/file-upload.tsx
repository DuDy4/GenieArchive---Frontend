import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, LinearProgress, IconButton } from "@mui/material";
import { PictureAsPdf, InsertDriveFile, Close } from "@mui/icons-material";
import axios from "axios";
import { useApiClient } from "../utils/AxiosMiddleware";

const FileUpload = ({ onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { makeRequest } = useApiClient();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setSuccessMessage(null);
        setErrorMessage(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
            "application/vnd.ms-powerpoint": [".ppt"],
        },
        maxFiles: 1,
    });

    const uploadFile = async () => {
        if (!file) {
            setErrorMessage("Please select a file.");
            return;
        }

        setErrorMessage(null);
        setSuccessMessage(null);
        setUploading(true);
        setUploadProgress(0);

        try {
            const response = await makeRequest('POST', "/generate-upload-url", { file_name: file.name });
            const fileUploadUrl = response.upload_url;

            await axios.put(fileUploadUrl, file, {
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                },
            });

            setSuccessMessage("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            setErrorMessage("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box
            sx={{
                position: 'relative', // Needed for the absolute positioning of the close button
                border: "2px dashed #aaa",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
                backgroundColor: isDragActive ? "#f0f0f0" : "white",
                "&:hover": {
                    borderColor: "#4a90e2",
                },
            }}
        >
            {/* X button (this is independent of the file drop area) */}
            <IconButton
                onClick={onClose} // Call the onClose prop when the button is clicked
                sx={{ position: 'absolute', top: 8, right: 8, color: 'gray' }}
            >
                <Close />
            </IconButton>

            {/* Only the file drop area should trigger the file selection popup */}
            <Box
                {...getRootProps()}
                sx={{
                    padding: "16px",
                    backgroundColor: "#fafafa",
                    border: "2px dashed #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { borderColor: "#4a90e2" }
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                    {file ? "Change File" : "Drag and drop files here"}
                </Typography>
                {!file && <Button variant="contained" sx={{ mt: 2 }}>Browse files</Button>}
                {file && <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {file.type === "application/pdf" ? <PictureAsPdf sx={{ fontSize: "48px", color: "#e74c3c" }} /> : <InsertDriveFile sx={{ fontSize: "48px", color: "#3498db" }} />}
                    <Box sx={{ ml: 2 }}>
                        <Typography>{file.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{(file.size / (1024 * 1024)).toFixed(2)} MB</Typography>
                    </Box>
                </Box>}
            </Box>

            {file && <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={uploadFile} disabled={uploading || uploadProgress > 0}>
                {uploadProgress > 0 ? `Uploading (${uploadProgress}%)...` : "Upload"}
            </Button>}
            {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />}
            {successMessage && <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>{successMessage}</Typography>}
            {errorMessage && <Typography variant="body1" color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}
        </Box>
    );
};

export default FileUpload;
