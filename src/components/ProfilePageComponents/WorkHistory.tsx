import { GreenTimelineIcon } from "../icons";
import moment from "moment";
import { WorkExperience } from "../types";

interface WorkHistoryProps {
  workExperience: WorkExperience[];
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ workExperience }) => {
  return (
    <div className="py-[12px] space-y-2 rounded-[8px] px-[12px] border relative border-[#DDDDDD] bg-white">
      <div className="font-semibold text-[16px] text-heading">
        Work History
      </div>

      <div className="relative">
        <div className="flex ml-[10px] flex-col gap-[20px]">
          {workExperience && Array.isArray(workExperience) && workExperience.map(({ title, end_date, start_date, company }, index) => (
            <div
              className={`primary-text flex items-start gap-4 before:content-[''] before:absolute before:w-[2.5px] before:h-full before:left-1.5 before:top-0 relative before:overflow-hidden ${
                end_date === null ? "before:bg-[#00C875]" : ""
              } ${
                typeof end_date === "string" ? "before:bg-[#0073EA]" : ""
              } ${
                index === workExperience.length - 1
                  ? "before:-mt-1"
                  : "before:pb-16 before:mt-4"
              }`}
              key={index}>
              <GreenTimelineIcon
                className="min-w-[24px] z-[99] mt-2"
                fill={
                  (end_date === null ? "#00C875" : "") ||
                  (typeof end_date === "string" ? "#0073EA" : "")
                }
              />
              <p className={`primary-text !text-[12px] !font-medium`}>
                <span className="!font-bold !text-black">
                  {title.name}
                </span>{" "}
                <br />
                <span>{company.name}</span> <br />
                {moment(start_date).format("MMM YYYY")} -&gt;{" "}
                {end_date === null
                  ? "Present"
                  : moment(end_date).format("MMM YYYY")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
