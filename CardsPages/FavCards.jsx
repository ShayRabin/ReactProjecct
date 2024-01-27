import React from "react";
import MyCard from "./Card";
import MyCardBasic from "../CardUser/MyCardBasic";
import "../styles/CreateCards.css";
import { useContext } from "react";
import { GeneralContext } from "../App";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function FavCards() {
  const [cards, setCards] = React.useState([]);

  const { user } = useContext(GeneralContext);

  React.useEffect(() => {
    fetch(
      `https://api.shipap.co.il/cards/favorite?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
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
            My Favorite Cards
          </Typography>
          <Box className="underlineAbout"></Box>
          <Grid container spacing={3}>
            {cards.map((card) =>
              user.business || user.admin ? (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <MyCard card={card} />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <MyCardBasic card={card} />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      }
    </>
  );
}
