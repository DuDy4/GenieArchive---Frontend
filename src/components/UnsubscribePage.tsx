import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UnsubscribePage: React.FC = () => {
    const [response, setResponse] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);
    const { tenantId } = useParams<{ tenantId: string }>();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${apiUrl}/user-info/${tenantId}`);
                setUserInfo(res.data);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        if (tenantId) {
            fetchUserInfo();
        }
    }, [tenantId, apiUrl]);

    const handleUnsubscribe = async () => {
        try {
            const res = await axios.post(`${apiUrl}/unsubscribe/${tenantId}`);
            setResponse("Unsubscribed successfully.");
        } catch (error) {
            console.error("Failed to unsubscribe:", error);
            setResponse("Failed to unsubscribe. Please try again later.");
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.card}>
                <div className="flex flex-row justify-center">
                    <img src='/images/image9.png' style={{width: '88px'}} alt='Unsubscribe' />
                </div>
                <div>
                    <h2 style={styles.title}>Unsubscribe from Meeting Reminders</h2>

                    {userInfo && (
                        <p style={styles.message}>
                            Hello { userInfo.name && userInfo.name.split(' ')[0] }, You are about to unsubscribe from our meeting reminders service.
                            <br/><br/>
                            If you'll unsubscribe, you won't receive any future meeting reminders to {userInfo.email}.
                        </p>
                    )}

                    {!response ? (
                        <button style={styles.unsubscribeButton} onClick={handleUnsubscribe}>
                            Unsubscribe
                        </button>
                    ) : (
                        <div>
                            <p style={styles.responseMessage}>{response}</p>
                            <button
                                style={styles.homeButton}
                                onClick={() => navigate('/')}
                            >
                                Go to Home
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    card: {
        maxWidth: '450px',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
    },
    title: {
        fontSize: '26px',
        color: '#333333',
        marginBottom: '20px',
    },
    message: {
        fontSize: '16px',
        color: '#555555',
        marginBottom: '20px',
        lineHeight: '1.5',
    },
    unsubscribeButton: {
        padding: '12px 24px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#dc3545',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    homeButton: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '15px',
        color: '#ffffff',
        backgroundColor: '#007bff',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    responseMessage: {
        fontSize: '16px',
        color: '#28a745',
        marginTop: '20px',
        fontWeight: 'bold' as const,
    },
};

export default UnsubscribePage;
