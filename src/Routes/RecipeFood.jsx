import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../Component/ListCard";
import { HiOutlineClock, HiOutlineKey } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import DefaultImage from "../Assets/wwww.jpg";
import Errors from "../Component/Errors";

let OptionFood = ({ data }) => {
  let style = {
    color: "#ffbe0b",
    fontSize: "1.2em",
  };

  return (
    <div className="options_food">
      <div className="select_of">
        <BsBoxSeam style={style} />
        <p>{data.servings || "Tidak ditemukan"}</p>
      </div>
      <div className="select_of">
        <HiOutlineClock style={style} />
        <p>{data.times || "Tidak ditemukan"}</p>
      </div>
      <div className="select_of">
        <HiOutlineKey style={style} />
        <p>{data.dificulty || "Tidak ditemukan"}</p>
      </div>
    </div>
  );
};

let Result = ({ result }) => {
  let { id } = useParams();
  let [simpan, setSimpan] = useState("Simpan resep");
  let [color, setColor] = useState("#ffbe0b");
  let [store, setStore] = useState(localStorage.getItem("resep_saved"));

  useEffect(() => {
    let storage = JSON.parse(store) || [];
    if (storage.includes(id)) {
      setSimpan("Resep tersimpan");
      setColor("#50CB93");
    }
  }, [id, store]);

  let ClickSave = () => {
    let item = JSON.parse(store) || [];
    if (item.includes(id)) {
      // remove
      let res_item = item.filter((f) => f !== id);
      localStorage.setItem("resep_saved", JSON.stringify(res_item));
      setStore(JSON.stringify(res_item));
      setSimpan("Simpan resep");
      setColor("#ffbe0b");
    } else {
      // add
      item.push(id);
      localStorage.setItem("resep_saved", JSON.stringify(item));
      setStore(JSON.stringify(item));
      setSimpan("Resep tersimpan");
      setColor("#50CB93");
    }
  };

  return (
    <div className="food_place">
      <section className="top_place">
        <h2>{result.title}</h2>
        <img src={result.thumb || DefaultImage} alt="gambar-makanan" />
        <OptionFood data={result} />
      </section>
      <section className="bottom_place">
        <div className="bagian tentang">
          <h3>Deskripsi</h3>
          <p>{result.desc.replace(/<.*?>/gi, "")}</p>
        </div>
        <div className="bagian bahan">
          <h3>Bahan-Bahan</h3>
          <ul>
            {result.ingredient.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
        <div className="bagian langkah">
          <h3>Langkah-langkah</h3>
          <div className="step_group">
            {result.step.map((el, i) => (
              <div className="step" key={i}>
                <h2>{i + 1}</h2>
                <p>{el.split(" ").splice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="footer_place">
          <p onClick={ClickSave} style={{ backgroundColor: color }}>
            {simpan}
          </p>
          <p>
            {result.author.user} - {result.author.datePublished}
          </p>
        </div>
      </section>
    </div>
  );
};

export default function RecipeFood() {
  const [result, setResult] = useState(<Loading />);
  let { id } = useParams();
  let url = "/api/recipe/" + id;

  useEffect(() => {
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          controller.abort();
          return setResult(<Errors />);
        }
        setResult(<Result result={data.results} />);
      })
      .catch((err) => {
        if (err.message === "AbortError") return;
      });

    return () => controller.abort();
  }, [url]);

  return <>{result}</>;
}
