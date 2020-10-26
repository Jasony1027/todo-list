import React from "react";

export default function List(props) {
  const { newsList } = props;
  if (!newsList || newsList.length === 0)
    return <p>Sorry, No News Available...</p>;
  return (
    <ul>
      <h2>Most Popular News</h2>
      {newsList.map((news) => {
        let imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png"
        try {
        if (news.media != undefined){
          if(news.media[0].type == "image"){
            imgUrl = news.media[0]["media-metadata"][2].url
          }
        }
        }catch(e){
          console.log(e)
        }
        return (
          <li key={news.id} className="newsItem">
            <p className="newsSection">{news.section}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsLink"
            >
              <h4 className="newsTitle">{news.title} </h4>
            </a>
            <p className="newsAbstract">{news.abstract}</p>
            <p className="newsPublished">{news.published_date}</p>
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsLink"
            >
              <img src={imgUrl} alt="news" className="newsImg"/>
            </a>
            <div className="newsDetails">
              <p className="newsUpdated">Last Updated: {news.updated}</p>
              <p className="newsSource">Source: {news.source}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
