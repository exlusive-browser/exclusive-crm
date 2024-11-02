import React, { useState } from 'react';
import clientIcon from "../assets/images/client.svg";

const Subheader: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleMouseEnter = (item: string) => {
        setActiveItem(item);
    };

    const handleMouseLeave = () => {
    };

    const handleClick = (item: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setActiveItem(item);

        window.history.pushState(null, '', `/${item}`);
    };

    return (
        <div style={subheaderStyle}>
            <nav style={menuStyle}>
                <a
                    href="#"
                    style={getMenuItemStyle("Clients")}
                    onMouseEnter={() => handleMouseEnter("Clients")}
                    onMouseLeave={handleMouseLeave}
                    onClick={(event) => handleClick("Clients", event)}
                >
                    Clients
                </a>
                <a
                    href="#"
                    style={getMenuItemStyle("Opportunities")}
                    onMouseEnter={() => handleMouseEnter("Opportunities")}
                    onMouseLeave={handleMouseLeave}
                    onClick={(event) => handleClick("Opportunities", event)}
                >
                    Opportunities
                </a>
                <a
                    href="#"
                    style={getMenuItemStyle("Tracking")}
                    onMouseEnter={() => handleMouseEnter("Tracking")}
                    onMouseLeave={handleMouseLeave}
                    onClick={(event) => handleClick("Tracking", event)}
                >
                    Tracking
                </a>
            </nav>
            <div style={userStyle}>
                <img src={clientIcon} alt="Profile Icon" style={iconStyle} />
                <span style={userNameStyle}>Nathalia M. De La Rans Blanco</span>
            </div>
        </div>
    );

    function getMenuItemStyle(item: string): React.CSSProperties {
        return {
            ...menuItemStyle,
            backgroundColor: activeItem === item ? '#4a6868' : 'transparent',
            padding: '5px 10px',
            borderRadius: '5px',
            transition: 'background-color 0.2s ease',
            display: 'inline-block',
        };
    }
};

const subheaderStyle: React.CSSProperties = {
    backgroundColor: '#708d8d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '45px 40px',
    height: '70px',
    marginTop: '0',
};

const menuStyle: React.CSSProperties = {
    display: 'flex',
    gap: '50px',
};

const menuItemStyle: React.CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '300',
    position: 'relative',
};

const userStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
};

const iconStyle: React.CSSProperties = {
    width: '20px',
    marginRight: '10px',
};

const userNameStyle: React.CSSProperties = {
    color: 'white',
    fontWeight: '300',
};

export default Subheader;
