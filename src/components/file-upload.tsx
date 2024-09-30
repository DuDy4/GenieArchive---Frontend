import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, LinearProgress, IconButton, Paper, Grid } from "@mui/material";
import { PictureAsPdf, InsertDriveFile, Close } from "@mui/icons-material";
import axios from "axios";
import { useApiClient } from "../utils/AxiosMiddleware";

interface FileUploadProps {
    onClose: () => void; // Assuming onClose is always provided
}

const FileUpload: React.FC<FileUploadProps> = ({ onClose }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [uploading, setUploading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const { makeRequest } = useApiClient();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
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
    });

    const uploadFile = async (file: File) => {
        setUploading(true);
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
        try {
            const response = await makeRequest('POST', "/generate-upload-url", { file_name: file.name });
            const fileUploadUrl = response.upload_url;

            await axios.put(fileUploadUrl, file, {
                headers: { "x-ms-blob-type": "BlockBlob" },
                onUploadProgress: (event) => {
                    const progress = Math.round((event.loaded * 100) / event.total);
                    setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
                },
            });

            setErrorMessages((prev) => ({ ...prev, [file.name]: "" }));
        } catch (error) {
            setErrorMessages((prev) => ({ ...prev, [file.name]: "Upload failed. Please try again." }));
        } finally {
            setUploading(false);
        }
    };

    const uploadAllFiles = async () => {
        for (const file of files) {
            if (!uploadProgress[file.name]) {
                await uploadFile(file);
            }
        }
    };

    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
        setUploadProgress((prevProgress) => {
            const { [fileName]: _, ...rest } = prevProgress;
            return rest;
        });
        setErrorMessages((prevMessages) => {
            const { [fileName]: _, ...rest } = prevMessages;
            return rest;
        });
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#e3f2fd', position: 'relative' }}>
            {/* <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: '#1565c0',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    boxShadow: 2,
                }}
            >
                <Close />
            </IconButton> */}
            <Box
                {...getRootProps()}
                sx={{
                    border: "2px dashed #90caf9",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: isDragActive ? "#bbdefb" : "#e3f2fd",
                    cursor: "pointer",
                    "&:hover": { borderColor: "#64b5f6" },
                }}
            >
                <input {...getInputProps()} />
                <Typography variant="h6" sx={{ color: '#1565c0' }}>
                    {isDragActive ? "Drop files here..." : "Drag & drop files here, or click to select files"}
                </Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#42a5f5', color: 'white' }}>Browse Files</Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {files.map((file) => (
                    <Grid item xs={12} key={file.name}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #90caf9', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {file.type === "application/pdf" ? (
                                    <PictureAsPdf sx={{ fontSize: 40, color: "#e74c3c", mr: 2 }} />
                                ) : (
                                    <InsertDriveFile sx={{ fontSize: 40, color: "#3498db", mr: 2 }} />
                                )}
                                <Box>
                                    <Typography variant="body1">{file.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{(file.size / (1024 * 1024)).toFixed(2)} MB</Typography>
                                    {uploadProgress[file.name] >= 0 && (
                                        <LinearProgress variant="determinate" value={uploadProgress[file.name]} sx={{ mt: 1, width: '100%' }} />
                                    )}
                                    {errorMessages[file.name] && (
                                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errorMessages[file.name]}</Typography>
                                    )}
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={() => uploadFile(file)}
                                    disabled={uploading || uploadProgress[file.name] > 0}
                                    sx={{ backgroundColor: '#42a5f5', color: 'white', mr: 1 }}
                                >
                                    {uploadProgress[file.name] > 0 ? `Uploading (${uploadProgress[file.name]}%)` : "Upload"}
                                </Button>
                                <IconButton onClick={() => removeFile(file.name)}>
                                    <Close />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {files.length > 1 && (
                <Button
                    variant="contained"
                    onClick={uploadAllFiles}
                    disabled={uploading}
                    sx={{ mt: 2, backgroundColor: '#42a5f5', color: 'white', width: '100%' }}
                >
                    Upload All
                </Button>
            )}
        </Paper>
    );
};

export default FileUpload;
