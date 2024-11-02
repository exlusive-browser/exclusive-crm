import React, { useState, useEffect, useCallback } from 'react';
import clientIcon from "../assets/images/client.svg";

const Subheader: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [showUserName, setShowUserName] = useState<boolean>(false);

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handleMouseEnter = (item: string) => {
        setActiveItem(item);
    };

    const handleMouseLeave = () => {
        setActiveItem(null);
    };

    const handleClick = (item: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setActiveItem(item);
        window.history.pushState(null, '', `/${item}`);
    };

    return (
        <div style={isMobile ? mobileSubheaderStyle : subheaderStyle}>
            <nav style={isMobile ? mobileMenuStyle : menuStyle}>
                {["Clients", "Opportunities", "Tracking"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        style={getMenuItemStyle(item)}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(event) => handleClick(item, event)}
                    >
                        {item}
                    </a>
                ))}
            </nav>
            <div style={userStyle}>
                {isMobile ? (
                    <div style={mobileUserContainer}>
                        <img
                            src={clientIcon}
                            alt="Profile Icon"
                            style={iconStyle}
                            onClick={() => setShowUserName(prev => !prev)}
                        />
                        {showUserName && (
                            <span style={userNameStyle}>Nathalia M. De La Rans Blanco</span>
                        )}
                    </div>
                ) : (
                    <>
                        <img src={clientIcon} alt="Profile Icon" style={iconStyle} />
                        <span style={userNameStyle}>Nathalia M. De La Rans Blanco</span>
                    </>
                )}
            </div>
        </div>
    );

    function getMenuItemStyle(item: string): React.CSSProperties {
        return {
            ...menuItemStyle,
            backgroundColor: activeItem === item ? '#4a6868' : 'transparent',
        };
    }
};

const subheaderStyle: React.CSSProperties = {
    backgroundColor: '#708d8d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    height: '70px',
    flexWrap: 'wrap',
};

const mobileSubheaderStyle: React.CSSProperties = {
    backgroundColor: '#708d8d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
};

const menuStyle: React.CSSProperties = {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
};

const mobileMenuStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
};

const menuItemStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '300',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.2s ease',
    fontSize: '14px',
};

const userStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const mobileUserContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const iconStyle: React.CSSProperties = {
    width: '20px',
    cursor: 'pointer',
};

const userNameStyle: React.CSSProperties = {
    color: 'white',
    fontWeight: '300',
    fontSize: '14px',
    marginTop: '5px',
};

export default Subheader;
