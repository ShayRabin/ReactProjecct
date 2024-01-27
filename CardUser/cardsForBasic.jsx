import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styles/CreateCards.css";
import ShowCard from "./ShowCardB";
import { useContext, useState } from "react";
import { GeneralContext } from "../App";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Box from "@mui/material/Box";

export default function MyCardBasic({ card }) {
  const { snackbar, user } = useContext(GeneralContext);

  const [cards, setCards] = useState([]);

  function favoriteCard(cardId) {
    const confirmQuestion = window.confirm(
      "You sure you want to add this card to favorite ?"
    );
    if (!confirmQuestion) return;

    fetch(
      `https://api.shipap.co.il/cards/${cardId}/favorite?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
      }
    )
      .then(() => {
        setCards(cards.filter((card) => card.id !== cardId));
      })
      .finally(() => (window.location.href = "./favorite"));
  }

  function undoFavoriteCard(cardId) {
    const confirmQuestion = window.confirm(
      "You sure you want to delete this card from favorite ?"
    );
    if (!confirmQuestion) return;
    fetch(
      `https://api.shipap.co.il/cards/${cardId}/unfavorite?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
      }
    )
      .then(() => {
        snackbar("the card is delete from favorite");
      })
      .finally(() => (window.location.href = "./cards"));
  }

  function handleFavoriteClick() {
    if (card.favorite) {
      undoFavoriteCard(card.id);
      snackbar("the card is delete from favorite");
    } else {
      favoriteCard(card.id);
      snackbar("the card is added to favorite");
    }
  }

  return (
    <Box>
      <Card id="boxCards" sx={{ maxWidth: 345 }}>
        <CardHeader
          id="liners"
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {card.title[0]}
            </Avatar>
          }
          title={card.title}
          subheader={card.createdTime}
        />
        <CardMedia
          id="imgCard"
          component="img"
          height="194"
          image={card.imgUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography id="liners" variant="body2" color="text.secondary">
            {"the subtitle : " + card.subtitle}
          </Typography>
          <Typography id="liners" variant="body2" color="text.secondary">
            {"the description : " + card.description}
          </Typography>
          <Typography id="liners" variant="body2" color="text.secondary">
            {"the phone : " + card.phone}
          </Typography>
          <Typography id="liners" variant="body2" color="text.secondary">
            {"the email : " + card.email}
          </Typography>
          <Typography id="liners" variant="body2" color="text.secondary">
            {"the web : " + card.web}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {user.business || user.admin || user.id ? (
            <IconButton
              onClick={handleFavoriteClick}
              id="btnCreateAndPress"
              style={{ width: "auto" }}
              aria-label="add to favorites"
            >
              {card.favorite ? (
                <FavoriteIcon style={{ color: "inherit" }} color="secondary" />
              ) : (
                <FavoriteBorderIcon
                  style={{ color: "inherit" }}
                  color="secondary"
                />
              )}
            </IconButton>
          ) : null}
          <span>
            <ShowCard theIDcard={card} />
          </span>
        </CardActions>
      </Card>
    </Box>
  );
}
