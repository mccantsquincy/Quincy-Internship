import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CountDownTimer from "../countdown/CountDownTimer";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [visible, setVisible] = useState(8);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  async function getexploreData(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setExploreData(data);
  }

  useEffect(() => {
    setLoading(true);
    getexploreData(value);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [value]);

  const loadMore = () => {
    setVisible(visible + 4);
  };

  const filter = (event) => {
    setValue(event);
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
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
          ))
        : exploreData.slice(0, visible).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
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
      <div className="col-md-12 text-center">
        {visible < exploreData.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
