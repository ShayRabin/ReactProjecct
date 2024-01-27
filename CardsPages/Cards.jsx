import { useContext, useEffect, useState } from "react";
import "../styles/CreateCards.css";
import MyCardBasic from "../CardUser/cardsForBasic";
import { GeneralContext } from "../App";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Cards() {
  const [cards, setCards] = useState([]);

  const { user } = useContext(GeneralContext);

  useEffect(() => {
    fetch(
      `https://api.shipap.co.il/cards?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, [cards]);

  return (
    <>
      {
        <Box className="inComing">
          <Typography variant="h3" className="tempTitle">
            View All Tickets - Main Page
          </Typography>
          <Box className="underlineAbout"></Box>
          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <MyCardBasic card={card} user={user} />
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
}
