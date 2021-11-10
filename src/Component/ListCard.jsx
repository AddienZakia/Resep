import { useEffect, useState } from "react";
import { HiOutlineClock, HiOutlineKey } from "react-icons/hi";
import { BsBoxSeam, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Errors from "./Errors";

let Load = ({ data }) => {
  let style = {
    color: "#ffbe0b",
  };

  let linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <section id="list_card">
      <div className="menu_masakan">
        {data.map((el, i) => (
          <div className="list_masakan" key={i}>
            <img src={el.thumb} alt={"image" + i} />
            <Link to={"/recipe/" + el.key} style={linkStyle}>
              <h2>{el.title}</h2>
            </Link>
            <div className="footer">
              <div className="select">
                <BsBoxSeam style={style} />
                <p>{el.portion || el.serving || "Tidak ditemukan"}</p>
              </div>
              <div className="select">
                <HiOutlineClock style={style} />
                <p>{el.times || "Tidak ditemukan"}</p>
              </div>
              <div className="select">
                <HiOutlineKey style={style} />
                <p>{el.dificulty || el.difficulty || "Tidak ditemukan"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

let Loading = () => {
  return (
    <div className="loading_text">
      <BsSearch style={{ fontSize: "4em", color: "#A7BBC7" }} />
      <p>Mencari masakan...</p>
    </div>
  );
};

export default function ListCard({ count }) {
  const [list, setList] = useState(<Loading />);

  useEffect(() => {
    let controller = new AbortController();

    let fetchApi = () => {
      fetch("/api/recipes", {
        signal: controller.signal
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            setList(<Errors />);
          }
          setList(<Load data={data.results.splice(count)} />);
        })
        .catch((err) => {
          if (err.message === "AbortError") return;
        });
    };

    fetchApi();
    return () => controller.abort();
  }, [count]);

  return <>{list}</>;
}

export { Load, Loading };
