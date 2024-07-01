import React, { useContext, useState, useEffect } from 'react';
// import {profile} from "../../providers/test_provider" 
import "./style.css";

export const Frame = ({ className, profile }) => {
  console.log('Frame - profile:', profile);
  const [currentProfile, setCurrentProfile] = useState(profile); // Initialize with null
  useEffect(() => {
      if (profile) {
          setCurrentProfile(profile); // Set currentProfile when profile is available
      }
  }, [profile]);

  
  interests = currentProfile.interests;
  console.log('interests' + interests);
  news = currentProfile.news;
  connections = currentProfile.connections;
  console.log("connections" + connections);

  return (
    <div className={`frame ${className}`}>
      <div className="div-wrapper">
        <div className="text-wrapper">Good to know</div>
      </div>
      <div className="div">
        <div className="div">
          <div className="text-wrapper-2">RELEVANT CONNECTIONS</div>
          {connections && connections.length > 0 && (
            <div className="div-4">
              {connections.map((connection, index) => {
                const title = Object.keys(connection)[0];
                const connectionImageUrl = connection[title];
                return (
                  <div key={index}>
                    <img className="image" title={title} src={connectionImageUrl} alt={title} />
                  </div>
                );
              })}
            </div>
          )}
          {connections && connections.length === 0 && (
          <div className="div-2">
            <img className="img" alt="Ellipse" title="John Doe" src="https://static.thenounproject.com/png/6967179-200.png" />
          </div>
          )}
        </div>
      </div>
      {interests && interests.length > 0 && (
        <div className="div-3">
          <div className="text-wrapper-2">INTEREST IN</div>
          <div className="div-4">
            {interests.map((hobby, index) => {
              console.log(hobby);
              const title = Object.keys(hobby)[0];
              const imageUrl = hobby[title];
              return (
                <div key={index}>
                  <img className="image" title={title} src={imageUrl} alt={title} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {news && news.length > 0 && (
        <div className="div-3">
          <div className="text-wrapper-2">TOP NEWS</div>
            {news.map((news_object, index) => {
              console.log(news_object);
              const title = Object.keys(news_object)[0];
              const newsUrl = news_object[title];
              return (
                <div key={index}>
                  <div className="div-5">
                    <div className="ellipse-wrapper">
                      <img className="ellipse" alt="Ellipse" src="https://static.thenounproject.com/png/342864-200.png" />
                    </div>
                    <p className="p"><a href={newsUrl} target="_blank" rel="noopener noreferrer">{title}</a></p>
                  </div>
                </div>
              );
            })}
          </div>
      )}
    </div>
  );
};
