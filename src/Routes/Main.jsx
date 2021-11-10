import image from "../Assets/mainImage.png";
import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineKey,
} from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";
import LinkCard from "../Component/ListCard";
//hi
export default function Main() {
  let iconStyle = {
    fontSize: "2em",
  };

  return (
    <>
      <div className="main_jombotron">
        <section>
          <h1>Masak apa hari ini ?</h1>
          <p>Yuk cari menu masakan mu untuk hari inidddddddd</p>
          <Link to="/recipes">
            <span>Explore</span>
          </Link>
        </section>
        <img src={image} alt="img2" />
      </div>

      <div className="main_features" id="features">
        <h1>Resep Masakan</h1>
        <p id="description">
          Terdapat beberapa fitur yang berguna untuk membantu mu mencari resep
          masakan
        </p>
        <section>
          <div className="fitur">
            <HiOutlineDocumentText style={iconStyle} />
            <p>Detail informasi pada sebuah masakan</p>
          </div>
          <div className="fitur">
            <HiOutlineClock style={iconStyle} />
            <p>Jumlah waktu pengerjaan</p>
          </div>
          <div className="fitur">
            <BsBoxSeam style={iconStyle} />
            <p>Total porsi pembuatan</p>
          </div>
          <div className="fitur">
            <HiOutlineKey style={iconStyle} />
            <p>Tingkat kesulitan</p>
          </div>
        </section>
      </div>

      <div className="main_menu">
        <h1>Menu Masakan</h1>
        <p>Beberapa menu masakan yang sudah kamu temui</p>
        <LinkCard count={4} />
        <Link to="/recipes">
          <span>Lebih Banyak</span>
        </Link>
      </div>
    </>
  );
}
