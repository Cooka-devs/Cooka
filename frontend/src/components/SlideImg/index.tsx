import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from "./index.module.css";
export const SlideImg = () => {
  const imgList = ["adimg1.jpg", "adimg2.jpg", "adimg3.jpg", "adimg4.jpg"];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    arrow: true,
  };
  return (
    <Slider {...settings}>
      {imgList.map((item) => {
        return (
          <div style={{ textAlign: "center" }}>
            <img
              src={item}
              alt="ad"
              style={{ width: "118rem", height: "30rem", paddingLeft: "2rem" }}
              className={Styles.img}
            />
          </div>
        );
      })}
    </Slider>
  );
};
