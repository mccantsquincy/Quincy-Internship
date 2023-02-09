import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CountDownTimer from "../countdown/CountDownTimer";
import Slider from "react-slick";

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);

  async function getNewItemsData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
  }

  useEffect(() => {
    getNewItemsData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div
          className="row"
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <Slider {...settings}>
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item nft_coll">
                    <div className="author_list_pp"></div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra"></div>
                      <div className="new__items__skeleton-1 lazy nft__item_preview"></div>
                    </div>
                    <div className="nft__item_info">
                      <div class="new__items__skeleton-2"></div>
                      <div className="new__items__skeleton-3"></div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {newItems.map((item) => (
                <div key={item.id}>
                  <div className="nft__item nft_coll">
                    <div className="author_list_pp new__items__author-img">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt="authorphoto"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate ? (
                      <CountDownTimer expiryDate={item.expiryDate} />
                    ) : null}
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
