import { AttendeeInfoSocials } from "../types";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import iconRoutes from "../../utils/iconRoutes.json";


const AboutSection: React.FC<AttendeeInfoProps> = ({ profileSummary }) => {

    console.log("profileSummary", profileSummary)
  return (
      <div className="py-[10px] pb-[20px] space-y-3 px-[12px] rounded-[8px] border border-[#dddddd] bg-white">

            <div className="flex-1 flex flex-col gap-2 justify-center align-start">
              <div className="font-medium text-[12px] text-[#9F9F9F]">
                About
              </div>
              <div className="font-medium text-[#37455C] text-[14px]">
                {profileSummary}
              </div>
            </div>

    </div>
  );
};

export default AboutSection;
