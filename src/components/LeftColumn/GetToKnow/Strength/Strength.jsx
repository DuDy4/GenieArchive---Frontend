import React, {useState} from "react";
import "./style.css";
import { FluentIosArrow24Filled2 } from "../../../../icons/FluentIosArrow24Filled2";
import { FluentIosArrow24Filled5 } from "../../../../icons/FluentIosArrow24Filled5";

export const Strength = ({ title, text }) => {

  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
  <div className="frame-31">
    <div className="frame-24" onClick={toggleContentVisibility}>
      <div className="text-wrapper-19">{title}</div>
      <FluentIosArrow24Filled5 className={`fluent-ios-arrow-2 ${isContentVisible ? '' : 'open'}`} />
    </div>
    {isContentVisible &&
        <div>
            <img className="line-3" alt="Line" src="https://c.animaapp.com/zzQb4IEW/img/line-12-1.svg" />
            <p className="text-wrapper-20">
                 {text}
            </p>
       </div>}
  </div>
  );
};
