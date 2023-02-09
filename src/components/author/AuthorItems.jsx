import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorImg, nftCollection }) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
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
            : nftCollection.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorImg} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
