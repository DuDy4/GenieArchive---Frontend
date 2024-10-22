import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, LinearProgress, IconButton, Paper, Grid, Tooltip } from "@mui/material";
import { PictureAsPdf, InsertDriveFile, Close, CloudDone, ErrorOutline } from "@mui/icons-material";
import axios from "axios";
import { useApiClient } from "../utils/AxiosMiddleware";

interface FileUploadProps {
    onClose: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onClose }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [uploading, setUploading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]); // Ensure it's initialized as an empty array
    const [categories, setCategories] = useState<string[]>([]);
    const { makeRequest } = useApiClient();

    useEffect(() => {
        // Fetch already uploaded files on mount
        const fetchUploadedFiles = async () => {
            try {
                const response = await makeRequest('GET', "/uploaded-files");
                console.log("Uploaded files:", response);
                setUploadedFiles(response.files || []); // Safely set as an empty array if response.data is undefined
                setCategories(response.categories || []);
            } catch (error) {
                console.error("Failed to fetch uploaded files.", error);
                setUploadedFiles([]); // Ensure it stays as an empty array even on error
            }
        };
        fetchUploadedFiles();
    }, []);

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
        <Paper elevation={3} sx={{width: 'fitContent', padding: 3, borderRadius: 2, backgroundColor: '#e3f2fd', position: 'relative', minWidth: 'fitContent'}}>
            <Grid container spacing={2}>
                <Typography variant="h4" sx={{ color: '#1565c0', padding: '10px' }}>Upload Company Files</Typography>
                <Typography variant="body2" sx={{ color: '#1565c0', padding: '10px', textAlign: 'center' }}>
                    Uploading files from the recommended categories helps Genie provide more precise solutions,
                     aligning your products with your customer's specific pain points.
                </Typography>

                {/* Left Column: File upload section */}
                <Grid item xs={9}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: "2px dashed #90caf9",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            backgroundColor: isDragActive ? "#bbdefb" : "#e3f2fd",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
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

                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        {uploadedFiles.length > 0 ? uploadedFiles.map((file) => (
                            <Grid item xs={12} key={file.uuid}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #90caf9', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <InsertDriveFile sx={{ fontSize: 40, color: "#3498db", mr: 2 }} />
                                        <Box>
                                            <Typography variant="body1">{file.file_name}</Typography>
                                            <Box sx={{ mt: 1 }}>
                                                {file.categories.map((category: string) => (
                                                    <Typography key={category} variant="body2" sx={{ display: 'inline-block', mr: 1, color: '#90caf9' }}>
                                                        {category}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Tooltip title={`Status: ${file.status}`}>
                                        {file.status === "COMPLETED" ? (
                                            <CloudDone sx={{ color: "#4caf50", fontSize: 40 }} />
                                        ) : (
                                            <ErrorOutline sx={{ color: "#e74c3c", fontSize: 40 }} />
                                        )}
                                    </Tooltip>
                                </Box>
                            </Grid>
                        )) : (
                            null)}
                    </Grid>
                </Grid>

                {/* Right Column: Categories section */}
                <Grid item xs={3}>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" sx={{ color: '#1565c0', mb: 1 }}>Recommended categories</Typography>
                        <Grid container spacing={1}>
                            {categories.map((category) => {
                                if (category === 'OTHER') return null;
                                const category_name = category !== 'FAQ' ? category.charAt(0) + category.slice(1).toLowerCase().replace(/_/g, ' ') : category;
                                const fulfilled = uploadedFiles.some((file) => file.categories.includes(category));
                                return (
                                    <Grid item key={category}>
                                        <Box title={fulfilled ? `Files uploaded under ${category}` : `No files uploaded under ${category}`} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            {fulfilled && (
                                                <CloudDone sx={{ fontSize: 20, color: '#4caf50', mr: 1 }} />
                                            )}
                                            <Typography
                                                variant="body1"
                                                title={fulfilled ? `Files uploaded under ${category}` : `No files uploaded under ${category}`}
                                                sx={{
                                                    color: fulfilled ? '#4caf50' : '#b0bec5',
                                                    fontWeight: fulfilled ? 'bold' : 'normal'
                                                }}
                                            >
                                                {category_name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FileUpload;
