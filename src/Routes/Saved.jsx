import { useEffect, useState } from "react";
import { Loading } from "../Component/ListCard";
import DefaultImage from "../Assets/wwww.jpg";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

let Card = ({ data, link }) => {
  let linkStyle = {
    textDecoration: "none",
    color: "black",
  };
  return (
    <>
      <img src={data.thumb || DefaultImage} alt="gambar" />
      <Link to={link} style={linkStyle}>
        <p className="saved_title">{data.title}</p>
      </Link>
    </>
  );
};

let NotFound = () => {
  return (
    <div className="nf">
      <BsSearch style={{ fontSize: "4em", color: "#A7BBC7" }} />
      <p id="notFound">Kamu belum ada menyimpan resep</p>
    </div>
  );
};

export default function Saved() {
  let [store, setStore] = useState([]);
  let [save, setsave] = useState([]);

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem("resep_saved")) || [];
    setsave((prev) => [...prev, ...storage]);

    const controller = new AbortController();
    let arr = [];
    for (let i = 0; i < storage.length; i++) {
      let link = "/api/recipe/" + storage[i];
      fetch(link, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          arr.push(<Card data={data.results} link={"/recipe/" + storage[i]} />);
          setStore([...arr]);
        })
        .catch((err) => {
          if (err.message === "AbortError") return;
        });
    }

    return () => controller.abort();
  }, []);

  let Selection = () => {
    if (save.length === 0) return <NotFound />;
    if (store.length === 0) {
      return <Loading />;
    } else {
      return (
        <section>
          {store.map((element, i) => (
            <div className="saved_card" key={i}>
              {element}
            </div>
          ))}
        </section>
      );
    }
  };

  return (
    <div className="saved">
      <div className="title_saved">
        <h1>Resep simpanan</h1>
        <p>Halaman ini berisi resep yang sudah kamu simpan</p>
      </div>
      <Selection />
    </div>
  );
}
