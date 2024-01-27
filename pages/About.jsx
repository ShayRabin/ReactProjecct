import React from "react";
import "../styles/CreateCards.css";
import "../styles/About.css";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

export default function About(theme) {
  return (
    <>
      {
        <ThemeProvider theme={theme}>
          <Box component="div" className="containerAbout">
            <Typography component="div" variant="h3" className="tempTitle">
              <div>About Us</div>
            </Typography>
            <Typography variant="h1">Music App</Typography>
            <Box className="underlineAbout"></Box>
            <Typography
              component="div"
              variant="body1"
              className="containerAboutText"
            >
              <div>
                At Music App, we are passionate about music. Our mission is to
                provide a platform where music enthusiasts can store, organize,
                and explore their favorite music.
              </div>
            </Typography>
            <Typography
              className="tempTitle"
              component="div"
              variant="h4"
              style={{ direction: "ltr" }}
            >
              Our Commitment
            </Typography>
            <Box component="div" className="underlineAbout"></Box>
            <Typography
              component="div"
              variant="body1"
              className="containerAboutText"
            >
              <div>
                We are committed to offering a seamless music experience. Our
                dedicated team of music lovers is continuously working to
                improve the app and provide you with the best music management
                and listening tools.
              </div>
            </Typography>
            <Typography variant="h2" style={{ direction: "ltr" }}>
              <div>Contact Us</div>
            </Typography>
            <Box className="underlineAbout"></Box>
            <Box
              style={{ textAlign: "justify", direction: "ltr", margin: "2px" }}
            >
              <List>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Location:"
                    secondary="123 Music Street, Cityville, State 12345"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    component="div"
                    variant="body1"
                    primary="Support Email:"
                    secondary="support@musicapp.com"
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </ThemeProvider>
      }
    </>
  );
}
