import Table from "./components/Table/Table";
import Home from "./components/Home/MainButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function App() {
  const [tables, setTable] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tables`).then((response) => {
      setTable(response.data);
    });
  }, []);

  if (!tables) return null;
  return (
    <Router>
      <Routes>
        {tables.map((table) => (
          <Route
            exact
            path={table.link}
            element={<Table tableId={table.id} />}
          />
        ))}
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
