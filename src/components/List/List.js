import axios from "axios";
import React from "react";
import Card from "../Card";
import "./List.css";

export default function List({ enterListId, tableId }) {
  const [list, setList] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tables/${tableId}/lists/${enterListId}`
      )
      .then((response) => {
        setList(response.data);
      });
  }, []);

  function deleteList(listId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/tables/${tableId}/lists/${listId}`
      )
      .then(() => {
        setList(list.filter((list) => list.id !== listId));
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  if (!list) return null;

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
}
