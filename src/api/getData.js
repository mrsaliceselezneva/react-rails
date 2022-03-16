import axios from "axios";

const getData = async () => {
  const res = await axios.get("http://localhost:3000/tables/1").then((res) => {
    console.log(res);
  });
};
