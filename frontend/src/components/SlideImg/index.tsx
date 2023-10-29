import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from "./index.module.scss";
import {
  ArrowBackIosNewOutlined as PrevIcon,
  ArrowForwardIosOutlined as NextIcon,
} from "@mui/icons-material";
import Image from "next/image";

export const SlideImg = () => {
  const imgList = ["/adimg1.jpg", "/adimg2.jpg", "/adimg3.jpg", "/adimg4.jpg"];

  function PrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className={Styles.slickPrev}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <PrevIcon />
      </div>
    );
  }

  function NextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className={Styles.slickNext}
        style={{
          ...style,
          display: "block",
        }}
        onClick={onClick}
      >
        <NextIcon />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    arrow: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {imgList.map((item, Idx) => {
        return (
          <div key={Idx} className={Styles.div}>
            <Image
              width={1180}
              height={300}
              src={item}
              alt="ad"
              className={Styles.img}
            />
          </div>
        );
      })}
    </Slider>
  );
};
