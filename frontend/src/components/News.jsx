import React, { useState, useEffect } from "react";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://devclash-server.onrender.com";
    fetch(url)
      .then((response) => response.text())
      .then((xml) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "text/xml");
        const fetchedArticles = Array.from(xmlDoc.querySelectorAll("item"));

        setArticles(fetchedArticles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <img
          src="https://i.gifer.com/74H8.gif"
          alt=""
          style={{ marginLeft: "20vw", width: "5vw" }}
          className="bg-black"
        />
      </div>
    );
  }

  return (
    <>
      <div id="news-container" className="w-full text-center">
        <center>
          <h1 className="text-base font-semibold rounded-3xl bg-sky-400 text-white p-1 text-nowrap w-min mb-[10px]">
            Best Study News
          </h1>
          {articles.map((article, index) => {
            const title = article.querySelector("title").textContent;
            const link = article.querySelector("link").textContent;
            const description =
              article.querySelector("description").textContent;
            const pubDate = article.querySelector("pubDate").textContent;

            let currentTime = new Date();
            let timestamp = new Date(pubDate);
            let timeDiff = currentTime - timestamp;
            let seconds = Math.floor(timeDiff / 1000);
            let minutes = Math.floor(seconds / 60);
            let hours = Math.floor(minutes / 60);
            let days = Math.floor(hours / 24);
            let timeAgo;
            if (days > 0) {
              timeAgo = days + " day" + (days > 1 ? "s" : "") + " ago";
            } else {
              timeAgo = hours + " hour" + (hours > 1 ? "s" : "") + " ago";
            }

            return (
              <div>
                <div
                  key={index}
                  className="card mb-[20px] bg-sky-200 dark:bg-sky-600 w-[40vw] rounded-lg mt-[0px]"
                  data-aos="fade-down"
                >
                  <header>
                    <h3>
                      <br />
                      <b className="text-xs">{title}</b>
                    </h3>
                  </header>
                  {/* <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs"
                  >
                    read more...
                  </a>
                  <hr className="bg-black-800" />
                  <p className="text-xs">{timeAgo}</p>
                </div>
              </div>
            );
          })}
        </center>
      </div>
    </>
  );
};

export default News;
