import React, { useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import logoCMR from '../assets/images/logoCMR.svg';

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const theme = useTheme();

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return (
        <AppBar position="static" style={headerStyle}>
            <Toolbar style={{ justifyContent: 'center', paddingTop: '20px' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img
                        src={logoCMR}
                        alt="NEXUS Logo"
                        style={isMobile ? mobileLogoStyle : logoStyle}
                    />
                    <Typography variant="h6" style={{ marginTop: theme.spacing(0.5) }}>
                        NEXUS
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const headerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    boxShadow: '0px 4px 2px -2px gray',
};

const logoStyle: React.CSSProperties = {
    width: '300px',
    marginBottom: '5px',
};

const mobileLogoStyle: React.CSSProperties = {
    width: '250px',
    marginBottom: '5px',
};

export default Header;