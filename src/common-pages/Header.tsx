import React, { useState, useEffect, useCallback } from 'react';
import logoCMR from '../assets/images/logoCMR.svg';

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

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
        <header style={headerStyle}>
            <img
                src={logoCMR}
                alt="NEXUS Logo"
                style={isMobile ? mobileLogoStyle : logoStyle}
            />
        </header>
    );
};

const headerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '15px 0px',
    textAlign: 'center',
    boxShadow: '0px 4px 2px -2px gray',
};

const logoStyle: React.CSSProperties = {
    width: '300px',
    marginBottom: '10px',
};

const mobileLogoStyle: React.CSSProperties = {
    width: '200px',  // Ajusta el tamaño del logo para pantallas móviles
    marginBottom: '10px',
};

export default Header;
