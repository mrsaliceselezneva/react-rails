import axios from "axios";
import React from "react";
import enterList from "./DragEnerList";
import "./Card.css";
import { connect } from "react-redux";

export default function Card(props) {
  const [cards, setCards] = React.useState(null);
  const [CardTitle, setCardTitle] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tables/${props.tableId}/lists/${props.listId}/cards`
      )
      .then((response) => {
        setCards(response.data);
      });
  }, [props.listId]);

  function createCard(CardTitle, newListId) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/tables/${props.tableId}/lists/${newListId}/cards`,
        {
          title: CardTitle,
          list_id: newListId,
        }
      )
      .then((response) => {
        setCards(response.data);
      });
  }

  function deleteCard(cardId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/tables/${props.tableId}/lists/${props.listId}/cards/${cardId}`
      )
      .then(() => {
        setCards(cards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  function updateCard(cardId, title) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/tables/${props.tableId}/lists/${props.listId}/cards/${cardId}`,
        {
          title,
        }
      )
      .then((response) => {
        setCards(response.data);
      });
  }

  function dragStartHandler(event, card) {}

  function dragEndHandler(event, card, cards) {
    event.preventDefault();
    if (props.listId !== enterList[enterList.length - 1]) {
      createCard(card.title, enterList[enterList.length - 1]);
      deleteCard(card.id);
      window.location.reload();
    }
  }

  function dragOverHandler(event, card) {
    event.preventDefault();
  }

  function dragEnterHandler(event) {
    enterList.push(props.listId);
  }

  if (!cards) return null;

  return (
    <div onDragEnter={(event) => dragEnterHandler(event)}>
      <input
        placeholder="Имя карточки"
        onChange={(event) => setCardTitle(event.target.value)}
      />

      <button
        className="pressed-button"
        onClick={() => createCard(CardTitle, props.listId)}
      >
        Create Card
      </button>
      <div>
        <ul className="list1a">
          {cards.map((card) => (
            <div
              onDragStart={(event) =>
                dragStartHandler(event, card, props.listId)
              }
              onDragEnd={(event) => dragEndHandler(event, card, cards)}
              onDragOver={(event) => dragOverHandler(event, card)}
              draggable={true}
            >
              <li>
                <input
                  value={card.title}
                  onChange={(event) => {
                    const updateCards = cards.reduce(
                      (prevCards, updatedCards) => {
                        if (updatedCards.id !== card.id) {
                          return [...prevCards, updatedCards];
                        }

                        const updatedCard = {
                          ...updatedCards,
                          title: event.target.value,
                        };
                        return [...prevCards, updatedCard];
                      },
                      []
                    );
                    setCards(updateCards);
                  }}
                  onBlur={() => updateCard(card.id, card.title)}
                />
                <button
                  className="pressed-button"
                  onClick={() => deleteCard(card.id)}
                >
                  Delete Card
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
