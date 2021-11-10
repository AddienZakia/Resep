import { useState, useEffect } from "react";
import { FcMenu } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Header() {
  const [header, setheader] = useState("header");

  useEffect(() => {
    let stop = false;
    if (stop) return;
    window.addEventListener("resize", (e) => {
      if (window.innerWidth <= 760 && header.includes("headeractive")) {
        document.body.style.overflow = "hidden";
      } else if (window.innerWidth <= 760 && !header.includes("headeractive")) {
        document.body.style.overflow = "unset";
      } else if (window.innerWidth > 760) {
        document.body.style.overflow = "unset";
      }
    });
    return () => (stop = true);
  }, [header]);

  let td = {
    textDecoration: "none",
  };

  let buttonStyle = {
    fontSize: "1.5em",
  };

  let clicked = () => {
    let text = "hidden";
    let classname = header === "header" ? "header headeractive" : "header";
    if (header.includes("headeractive")) text = "unset";
    document.body.style.overflow = text;
    setheader(classname);
  };

  let removeBg = () => {
    if (!header.includes("headeractive")) return;
    document.body.style.overflow = "unset";
    setheader("header");
  };

  return (
    <div className={header}>
      <div className="headeractiveBg" onClick={removeBg}></div>
      <div id="logo">
        Resep<span>.</span>
      </div>
      <ul>
        <li>
          <Link to="/" style={td}>
            <span onClick={removeBg}>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/recipes" style={td}>
            <span onClick={removeBg}>Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/saved" style={td}>
            <span onClick={removeBg}>Saved</span>
          </Link>
        </li>
      </ul>
      <div id="burger" onClick={clicked}>
        <FcMenu style={buttonStyle} />
      </div>
    </div>
  );
}
