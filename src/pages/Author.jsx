import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState([]);
  const [nftCollection, setNftCollection] = useState([]);
  const [follow, setFollow] = useState(true);
  const [followerCount, setFollowerCount] = useState([]);

  async function getAuthors() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setAuthor(data);
    setNftCollection(data.nftCollection);
    setFollowerCount(data.followers);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthors();
  }, []);

  const followFunction = () => {
    setFollow(false);
    setFollowerCount(followerCount + 1);
  };

  const unfollowFunction = () => {
    setFollow(true);
    setFollowerCount(followerCount - 1);
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div
              className="row"
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followerCount}</div>
                      {follow ? (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={followFunction}
                        >
                          Follow
                        </Link>
                      ) : (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={unfollowFunction}
                        >
                          Unfollow
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorImg={author.authorImage}
                    nftCollection={nftCollection}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
