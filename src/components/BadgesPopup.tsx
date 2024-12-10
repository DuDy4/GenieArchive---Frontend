import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, LinearProgress, Tooltip, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useApiClient } from "../utils/AxiosMiddleware";

interface BadgesPopupProps {
    open: boolean;
    onClose: () => void;
    unseenBadges: string[];
    cleanUnseenBadges: () => void;
}

const BadgesPopup: React.FC<BadgesPopupProps> = ({ open, onClose, unseenBadges, cleanUnseenBadges }) => {
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
                console.log("Badges fetched successfully!: ", badges);
            }
        };

        if (open) {
            fetchBadges();  // Fetch badges only when the popup opens
        }

        return () => {
            const response = makeRequest("POST", "/badge-seen");
            console.log("Response: ", response);
            cleanUnseenBadges();
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
                <BadgeSection title="🔥 Daily Challenges" badges={dailyBadges} unseenBadges={unseenBadges} />
                <BadgeSection title="🌟 Weekly Milestones" badges={weeklyBadges} unseenBadges={unseenBadges} />
                <BadgeSection title="🏆 All-Time Achievements" badges={allTimeBadges} unseenBadges={unseenBadges} />
            </DialogContent>
        </Dialog>
    );
};

const BadgeSection: React.FC<{ title: string; badges: any[]; unseenBadges: string[] }> = ({ title, badges, unseenBadges }) => {
    return (
        <Paper sx={{ marginBottom: 3, padding: 4, borderRadius: "15px", backgroundColor: "#f0f4f8", boxShadow: "0px 8px 16px rgba(0,0,0,0.2)" }}>
            <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold", color: "#333" }}>
                {title}
            </Typography>
            <Grid container spacing={4}>
                {badges.length > 0 ? (
                    badges.map(badge => (
                        <Grid item xs={12} sm={6} md={4} key={badge.badge_id}>
                            <BadgeItem badge={badge} unseenBadges={unseenBadges}/>
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

const BadgeItem: React.FC<{ badge: any; unseenBadges: string[] }> = ({ badge, unseenBadges }) => {
    const isAchieved = badge.progress.count >= badge.progress.goal;
    const progressPercentage = Math.min((badge.progress.count / badge.progress.goal) * 100, 100);

    return (
        <Paper
            sx={{
                position: "relative", // Ensure the ribbon is positioned relative to the card
                padding: 3,
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                backgroundColor: (isAchieved && !badge.seen) ? "#fff3e0" : isAchieved ? "#e0f7fa" : "#fff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                border: (isAchieved && !badge.seen) ? "2px solid #ff9800" : "none", // Highlight last earned badges
                "&:hover": { transform: "scale(1.05)" },
            }}
        >
            {(isAchieved && !badge.seen) && (
                <img
                    src="https://img.icons8.com/color/48/new--v1.png"
                    alt="Last earned"
                    className="new-badge"
                    style={{
                        position: "absolute",
                        top: "3%",
                        left: "3%",
                    }}
                />
            )}
            <div style={{ alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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
                            style={{ width: 60, height: 60, marginBottom: 12, alignSelf: "center" }}
                        />
                    </Tooltip>
                </div>
                <Typography variant="h6" sx={{ marginBottom: 1, textAlign: "center" }}>{badge.name}</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2, color: "#666", textAlign: "center" }}>{badge.description}</Typography>
            </div>
            <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progressPercentage} sx={{ height: 10, borderRadius: 5 }} />
                <Typography variant="caption" sx={{ textAlign: "center", display: "block", marginTop: 1, fontWeight: "bold" }}>
                    {isAchieved ? (
                        <div className="flex flex-row justify-center gap-1">
                            <StarIcon sx={{ color: "#ffb300" }} />
                            <div className="flex flex-column justify-center item-center">
                                <span className="self-center">Completed</span>
                            </div>
                            <StarIcon sx={{ color: "#ffb300" }} />
                        </div>) : `${Math.min(badge.progress.count, badge.progress.goal)} / ${badge.progress.goal}`}
                </Typography>
            </Box>
        </Paper>
    );
};


export default BadgesPopup;
