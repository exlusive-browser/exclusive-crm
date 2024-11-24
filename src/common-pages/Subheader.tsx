import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Subheader: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showUserName, setShowUserName] = useState<boolean>(false);

  const handleMenuClick = (item: string) => {
    setActiveItem(item);
  };

  const handleIconClick = () => {
    setShowUserName((prev) => !prev);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#708d8d",
        height: { xs: 100, sm: 80 }, // Altura adaptativa según el tamaño de pantalla
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "flex-start", sm: "space-between" },
          }}
        >
          {["Clients", "Opportunities", "Tracking", "charts"].map((item) => (
            <Link
              key={item}
              onClick={() => handleMenuClick(item)}
              href={`/${item}`}
              sx={{
                textDecoration: "none",
                color: "white",
                padding: "10px 15px",
                backgroundColor:
                  activeItem === item ? "#4a6868" : "transparent",
                borderRadius: "6px",
                transition: "background-color 0.3s ease",
                margin: { xs: "0 0px", sm: "0 5px" },
                ":hover": { backgroundColor: "#4a6868" },
              }}
            >
              <Typography variant="body2">{item}</Typography>
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <IconButton onClick={handleIconClick} sx={{ padding: 0 }}>
            <PersonIcon
              sx={{
                width: "30px",
                height: "30px",
                cursor: "pointer",
                color: "white",
              }}
            />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              marginLeft: { sm: "5px" },
              display: { xs: showUserName ? "block" : "none", sm: "block" },
            }}
          >
            Nathalia De La Rans Blanco
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Subheader;
