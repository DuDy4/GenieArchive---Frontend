import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Connection, Hobby, News } from "../types";

interface GoodToKnowProps {
  goodToKnow: any;
  handleDialogOpen: () => void;
  name: string;
}

const GoodToKnow: React.FC<GoodToKnowProps> = ({ goodToKnow, handleDialogOpen, name }) => {



  return (
    <div className="flex flex-col w-full " >

      <div className="flex w-full justify-between ">
        <div className="border w-full rounded-[8px] border-primary-border py-[12px] px-[12px] bg-white">
                <h3 className="font-semibold !text-[16px] text-heading">
                  Ice Breakers
                </h3>
          {goodToKnow?.connections && Array.isArray(goodToKnow.connections) && goodToKnow.connections.length > 0 && (
            <div className="py-[10px] pb-[10px] ">
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Relevant connections
              </h4>
              <div className="flex gap-2">
                {goodToKnow.connections.map(({ name, image_url, linkedin_url }: Connection, index: number) => (
                  <Link to={linkedin_url} target="_blank" key={index}>
                    <Tooltip title={name} arrow placement="top">
                      <div className="w-[48px] rounded-full">
                        <img
                          src={image_url || "/images/anonymous-user-8.svg"}
                          alt="Profile picture"
                          className="rounded-full max-w-full"
                        />
                      </div>
                    </Tooltip>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {goodToKnow?.hobbies && Array.isArray(goodToKnow.hobbies) && goodToKnow.hobbies.length > 0 && (
            <div className="py-[10px] pb-[10px]">
              <h4 className="uppercase text-heading font-bold text-[12px]">
                {name.split(' ')[0]}'s interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {goodToKnow.hobbies.map(({ hobby_name, icon_url }: Hobby, index: number) => (
                  <Tooltip arrow placement="top" key={index} title={hobby_name}>
                    <div className="w-12 h-12">
                      <img
                        src={icon_url}
                        alt="hobby image"
                        className="max-w-full"
                      />
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {goodToKnow?.news && Array.isArray(goodToKnow.news) && goodToKnow.news.length > 0 && (
            <div className="py-[10px] pb-[20px]" onClick={handleDialogOpen}>
              <div className="cursor-pointer">
                <div className="flex flex-col">
                  <div className="button-container">
                    <button className="social-activity-button" onClick={handleDialogOpen}>Social activity</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodToKnow;
