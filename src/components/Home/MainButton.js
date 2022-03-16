import axios from "axios";
import React from "react";
import "./MainButton.css";

export default function AllTables() {
  const [tables, setTables] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tables`).then((response) => {
      setTables(response.data);
    });
  }, []);

  function createTable() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/tables`, {
        link: "1234",
      })
      .then((response) => {
        setTables(response.data);
        window.location.assign(
          `http://localhost:3006/${
            response.data[response.data.length - 1].link
          }`
        );
      });
  }

  if (!tables) return null;
  return (
    <button
      className="floating-button"
      onClick={() => {
        createTable();
      }}
    >
      Create Table
    </button>
  );
}
