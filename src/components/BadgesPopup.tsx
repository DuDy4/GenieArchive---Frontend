import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, LinearProgress, Tooltip, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 
import StarIcon from "@mui/icons-material/Star"; 
import { useApiClient } from "../utils/AxiosMiddleware";

interface BadgesPopupProps {
    open: boolean;
    onClose: () => void;
}

const BadgesPopup: React.FC<BadgesPopupProps> = ({ open, onClose }) => {
    const [badges, setBadges] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { makeRequest } = useApiClient();

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                setLoading(true);
                const response = await makeRequest("GET", "/user-badges");
                setBadges(response);
            } catch (error) {
                setError("Failed to load badges. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchBadges();  // Fetch badges only when the popup opens
        }
    }, [open]);  // Only trigger when the `open` prop changes

    const categorizeBadges = () => {
        const dailyBadges = badges.filter(badge => badge.frequency === "daily");
        const weeklyBadges = badges.filter(badge => badge.frequency === "weekly");
        const allTimeBadges = badges.filter(badge => badge.frequency !== "daily" && badge.frequency !== "weekly");
        return { dailyBadges, weeklyBadges, allTimeBadges };
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const { dailyBadges, weeklyBadges, allTimeBadges } = categorizeBadges();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ p: 0, background: "linear-gradient(to right, #4facfe, #00f2fe)" }}>
                <Box 
                    sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        height: 120, 
                        color: "white", 
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)" 
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: 36 }}>
                        Your Challenges
                    </Typography>
                    <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16, color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ backgroundColor: "#f9f9f9", padding: 4 }}>
                <BadgeSection title="🔥 Daily Challenges" badges={dailyBadges} />
                <BadgeSection title="🌟 Weekly Milestones" badges={weeklyBadges} />
                <BadgeSection title="🏆 All-Time Achievements" badges={allTimeBadges} />
            </DialogContent>
        </Dialog>
    );
};

const BadgeSection: React.FC<{ title: string; badges: any[] }> = ({ title, badges }) => {
    return (
        <Paper sx={{ marginBottom: 3, padding: 4, borderRadius: "15px", backgroundColor: "#f0f4f8", boxShadow: "0px 8px 16px rgba(0,0,0,0.2)" }}>
            <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", color: "#333" }}>
                {title}
            </Typography>
            <Grid container spacing={4}>
                {badges.length > 0 ? (
                    badges.map(badge => (
                        <Grid item xs={12} sm={6} md={4} key={badge.badge_id}>
                            <BadgeItem badge={badge} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
                        No badges available in this category. Start earning!
                    </Typography>
                )}
            </Grid>
        </Paper>
    );
};

const BadgeItem: React.FC<{ badge: any }> = ({ badge }) => {
    const isAchieved = badge.progress.count >= badge.progress.goal;
    const progressPercentage = Math.min((badge.progress.count / badge.progress.goal) * 100, 100);

    return (
        <Paper 
            sx={{ 
                padding: 3, 
                borderRadius: "12px", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                backgroundColor: isAchieved ? "#e0f7fa" : "#fff", 
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", 
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" }
            }}
        >
            <Tooltip 
                title={isAchieved ? "Achievement unlocked!" : `${badge.progress.count} / ${badge.progress.goal}`} 
                arrow
            >
                <img 
                    src={isAchieved 
                        ? "https://frontedresources.blob.core.windows.net/images/badge-lamp.png" 
                        : "https://frontedresources.blob.core.windows.net/images/badge-lamp-bw.png"
                    } 
                    alt={badge.name} 
                    style={{ width: 60, height: 60, marginBottom: 12 }} 
                />
            </Tooltip>
            <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>{badge.name}</Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: "#666", textAlign: "center" }}>{badge.description}</Typography>
            <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 10, borderRadius: 5 }} />
                <Typography variant="caption" sx={{ textAlign: "center", display: "block", marginTop: 1, fontWeight: "bold" }}>
                    {isAchieved ? "Completed" : `${Math.min(badge.progress.count, badge.progress.goal)} / ${badge.progress.goal}`}
                </Typography>
            </Box>
            {isAchieved && <StarIcon sx={{ color: "#ffb300", marginTop: 1 }} />}
        </Paper>
    );
};


export default BadgesPopup;
