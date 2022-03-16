import axios from "axios";
import React from "react";
import Card from "../Card";
import "./Lists.css";

export default function List({ tableId }) {
  const [lists, setLists] = React.useState(null);
  const [ListName, setListName] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tables/${tableId}/lists`)
      .then((response) => {
        setLists(response.data);
      });
  }, []);

  function createList(listName) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/tables/${tableId}/lists`, {
        name: listName,
      })
      .then((response) => {
        setLists(response.data);
      });
  }

  function deleteList(listId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/tables/${tableId}/lists/${listId}`
      )
      .then(() => {
        setLists(lists.filter((list) => list.id !== listId));
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  if (!lists) return null;
  return (
    <table className="one">
      {lists.map((list) => {
        return (
          <td>
            {list.name}
            <br />
            <button
              className="floating-button"
              onClick={() => {
                const { id } = list;
                deleteList(id);
              }}
            >
              Delete List
            </button>
            <br />
            <br />
            <Card tableId={tableId} listId={list.id} />
          </td>
        );
      })}

      <input
        placeholder="Имя списка"
        onChange={(event) => setListName(event.target.value)}
      />

      <button className="floating-button" onClick={() => createList(ListName)}>
        Create List
      </button>
    </table>
  );
}
