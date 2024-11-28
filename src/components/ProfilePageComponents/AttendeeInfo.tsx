import { AttendeeInfoSocials } from "../types";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import iconRoutes from "../../utils/iconRoutes.json";
import ProfileCategoryDialog from "./ProfileCategoryDialog";

interface AttendeeInfoProps {
  attendeeInfo: any;
  name: string;
}

const AttendeeInfo: React.FC<AttendeeInfoProps> = ({ attendeeInfo, name, profileCategory, strengths }) => {
  return (
    <div className="space-y-[23.5px] ">
      <div className="py-[10px] pb-[20px] space-y-3 px-[12px] rounded-[8px] border border-[#dddddd] bg-white">
        <div
          className="max-h-[200px] overflow-hidden"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFCC00',
          }}
        >
          <img
            src={attendeeInfo?.picture}
            alt="user photo"
            className="h-full"
          />
        </div>

        { profileCategory && strengths && <ProfileCategoryDialog profileCategory={profileCategory} strengths={strengths} /> }

        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="font-semibold text-heading text-[18px] leading-[27px]">
            {name}
          </div>

          <div className="flex gap-[4px]">
            {attendeeInfo?.social_media_links?.map(({ url, platform }: AttendeeInfoSocials, index: number) => {
              return iconRoutes[platform.toLowerCase()] ? (
                <div key={index}>
                  <Link
                    to={url.includes("https") ? url : `https://${url}`}
                    target="_blank"
                  >
                    <img
                      src={iconRoutes[platform.toLowerCase()]}
                      className="min-w-[27px] max-w-[27px]"
                      title={platform}
                      alt={`${platform} icon`}
                    />
                  </Link>
                </div>
              ) : null;
            })}
          </div>
        </div>
        <hr className="separator" />

          <div className="flex items-center justify-between w-full">
            <div className="flex-1 flex flex-col gap-2 justify-center align-start">
              <div className="font-medium text-[12px] leading-[18px] text-[#9F9F9F]">
                Company Name
              </div>
              <div className="font-semibold text-[#37455C] text-[14px] leading-[21px]">
                {attendeeInfo?.company}
              </div>
            </div>

            <div className="h-[30px] mx-6 w-[1px] bg-[#DDDDDD]"></div>

            <div className="flex-1 flex flex-col gap-2 justify-center align-start">
              <div className="font-medium text-[12px] text-[#9F9F9F]">
                Position
              </div>
              <div className="font-semibold text-[#37455C] text-[14px]">
                {attendeeInfo?.position}
              </div>
            </div>
          </div>


      </div>
    </div>
  );
};

export default AttendeeInfo;
