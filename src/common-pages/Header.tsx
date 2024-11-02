import React from 'react';
import logoCMR from '../assets/images/logoCMR.svg';

const Header: React.FC = () => {
    return (
        <header style={headerStyle}>
            <img src={logoCMR} alt="NEXUS Logo" style={logoStyle} />
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

export default Header;
