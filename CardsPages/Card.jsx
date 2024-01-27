import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../styles/CreateCards.css";
import { useContext, useState } from "react";
import ModalCardsEdit from "../CardBusiness/ModalCardsEdit";
import { GeneralContext } from "../App";
import Box from "@mui/material/Box";

export default function MyCard({ card }) {
  const { snackbar } = useContext(GeneralContext);
  const TheCard = {
    title: card.title,
    description: card.description,
    subtitle: card.subtitle,
    phone: card.phone,
    email: card.email,
    web: card.web,
    imgUrl: card.imgUrl,
    imgAlt: card.imgAlt,
    state: card.state,
    country: card.country,
    city: card.city,
    street: card.street,
    houseNumber: card.houseNumber,
    zip: card.zip,
  };

  const [cards, setCards] = useState([]);

  function removeCard(cardId) {
    const confirmQuestion = window.confirm(
      "are you sure you want to delete this card?"
    );
    if (!confirmQuestion) return;
    fetch(
      `https://api.shipap.co.il/business/cards/${cardId}?token=88d63d7d-5fb8-11ee-aae9-14dda9d4a5f088d63d7d-5fb8-11ee-aae9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      }
    )
      .then(() => {
        setCards(cards.filter((card) => card.id !== cardId));
      })
      .finally(() => snackbar("the card is deleted success !"));
  }

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
      .finally(() => (window.location.href = "./"));
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
          <span>
            <ModalCardsEdit editProp={card.id} theIDcard={TheCard} />
          </span>
          <IconButton
            id="btnCreateAndPress"
            style={{ width: "auto" }}
            aria-label="delete"
            onClick={() => removeCard(card.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
