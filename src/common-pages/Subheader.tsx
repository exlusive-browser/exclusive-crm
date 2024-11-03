import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Subheader: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [showUserName, setShowUserName] = useState<boolean>(false);
    const [appBarHeight] = useState<number>(80);
    const mobileAppBarHeight = 100;

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handleMenuClick = (item: string) => {
        setActiveItem(item);
        window.history.pushState(null, '', `/${item}`);
    };

    const handleIconClick = () => {
        setShowUserName(prev => !prev);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#708d8d', height: isMobile ? mobileAppBarHeight : appBarHeight }}>
            <Toolbar style={{ justifyContent: 'space-between', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: isMobile ? 'flex-start' : 'space-between' }}>
                    {["Clients", "Opportunities", "Tracking"].map((item) => (
                        <IconButton
                            key={item}
                            onClick={() => handleMenuClick(item)}
                            style={{
                                color: 'white',
                                padding: '10px 15px',
                                backgroundColor: activeItem === item ? '#4a6868' : 'transparent',
                                borderRadius: '6px',
                                transition: 'background-color 0.3s ease',
                                margin: isMobile ? '0 0px' : '0 0px',
                            }}
                            onMouseEnter={() => setActiveItem(item)}
                            onMouseLeave={() => {
                                if (activeItem !== item) {
                                    setActiveItem(null);
                                }
                            }}
                        >
                            <Typography variant="body2" style={{ color: 'white' }}>
                                {item}
                            </Typography>
                        </IconButton>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <IconButton onClick={handleIconClick} style={{ padding: 0 }}>
                        <PersonIcon style={{ width: '30px', height: '30px', cursor: 'pointer', color: 'white' }} />
                    </IconButton>
                    { }
                    {!isMobile && (
                        <Typography variant="body2" style={{ color: 'white', marginLeft: '5px' }}>
                            Nathalia De La Rans Blanco
                        </Typography>
                    )}
                    { }
                    {isMobile && showUserName && (
                        <Typography variant="body2" style={{ color: 'white', marginTop: '5px' }}>
                            Nathalia De La Rans Blanco
                        </Typography>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Subheader;
