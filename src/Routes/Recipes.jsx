import { useState } from "react";
import image from "../Assets/jumbotron.png";
import ListCard, { Load, Loading } from "../Component/ListCard";
import Error from "../Component/Errors";

export default function Recipes() {
  let count = 1;
  let [page, setPage] = useState(0);
  let [result, setResult] = useState(<ListCard count={count} />);
  let [input, setInput] = useState("Cari masakan yang kamu inginkan");

  let fetch_click = () => {
    let url = `/api/recipes/${page}`;
    setPage(page + 1);
    setResult(<Loading />);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          return setResult(<Error />);
        }
        setResult(<Load data={data.results.splice(count)} />);
      });
  };

  let handlerSubmit = (event) => {
    event.preventDefault();
    setResult(<Loading />);
    let url = "/api/search/?q=" + input;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length === 0)
          return setResult(<Loading text="Masakan tidak ada ditemukan !" />);
        setResult(<Load data={data.results.splice(0, 9)} />);
      });
  };

  return (
    <div className="recipes_route">
      <img src={image} alt="jumbotron" id="design" />
      <div className="text_recipes">
        <h1>Explore Masakan</h1>
        <p>Yuk lihat resep masakan lebih banyak lagi</p>
      </div>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="Cari masakan yang kamu inginkan"
          onChange={(event) => setInput(event.target.value)}
        />
        <input type="submit" value="Cari" />
      </form>
      {result}
      <p id="refresh" onClick={fetch_click}>
        Resep lainnya
      </p>
    </div>
  );
}
