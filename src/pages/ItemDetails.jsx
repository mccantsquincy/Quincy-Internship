import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getItemDetails() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
    );
    console.log(data);
    setItemDetails(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetails();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div
            className="container"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            {loading ? (
              <div className="row mobile">
                <div className="col-md-6 text-center">
                  <div className="item__details__skeleton-1"></div>
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="item__details__skeleton-2"></div>
                    <div className="item__details__skeleton-3"></div>
                    <div className="item__details__skeleton-4"></div>
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <div className="top__sellers__skeleton-1"></div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="author_list_info">
                          <div className="item__details__skeleton-3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <div className="top__sellers__skeleton-1"></div>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <div className="item__details__skeleton-3"></div>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <div className="item__details__skeleton-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {itemDetails.title} #{itemDetails.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    </div>
                    <p>{itemDetails.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              {itemDetails.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img
                                className="lazy"
                                src={itemDetails.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              {itemDetails.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
