import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
  }

  useEffect(() => {
    getTopSellers();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div
          className="row"
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="top__sellers__skeleton-1"></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="top__sellers__skeleton-2"></div>

                        <div className="top__sellers__skeleton-3"></div>
                      </div>
                    </li>
                  ))
                : sellers.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
