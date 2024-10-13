import XIcon from "/images/twitter-icon.svg";
import { useState } from "react";
import { CrossIcon, GreenTimelineIcon, TickIcon } from "./icons";
import { Link } from "react-router-dom";
import Chart, { icons } from "./chart";
import { Tooltip } from "@mui/material";
import useGoodToKnow from "../hooks/useGoodToKnow";
import useAttendeeInfo from "../hooks/useAttendeeInfo";
import { AttendeeInfoSocials, Connection, Hobby, News } from "../types";
import useGetToKnow from "../hooks/useGetToKnow";
import useWorkExperience from "../hooks/useWorkExperience";
import useStrengths from "../hooks/useStrengths";
import LoadingGenie from "./ui/loading-genie";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react"
import { isArray } from "chart.js/helpers";
import iconRoutes from "../utils/iconRoutes.json";

interface ProfilesDetailsProps {
  name: string;
  uuid: string;
}


const ProfileDetails: React.FC<ProfilesDetailsProps> = ({ name, uuid }) => {
  const { user } = useAuth0();
  const [practicesExpandedIndex, setPracticesExpandedIndex] = useState<number | null>(null);
    const [phrasesExpandedIndex, setPhrasesExpandedIndex] = useState<number | null>(null);
    const [avoidExpandedIndex, setAvoidExpandedIndex] = useState<number | null>(null);

  const { attendeeInfo, isLoadingAttendeeInfo } = useAttendeeInfo(
    user?.tenantId!,
    uuid
  );
  const { goodToKnow, isLoadingGoodToKnow } = useGoodToKnow(
    user?.tenantId!,
    uuid
  );

  const { getToKnow, isLoadingGetToKnow } = useGetToKnow(user?.tenantId!, uuid);
  const { workExperience, isLoadingWorkExperience } = useWorkExperience(
    user?.tenantId!,
    uuid
  );
  console.log("GoodToKnow: ", goodToKnow);
  const strengths = useStrengths(user?.tenantId!, uuid);

      const toggleExpandPractices = (index: number) => {
        setPracticesExpandedIndex(practicesExpandedIndex === index ? null : index);
      };

        const toggleExpandPhrases = (index: number) => {
            setPhrasesExpandedIndex(phrasesExpandedIndex === index ? null : index);
        };

        const toggleExpandAvoid = (index: number) => {
            setAvoidExpandedIndex(avoidExpandedIndex === index ? null : index);
        };

    if (
        attendeeInfo?.error === "Profile not found under this tenant" &&
        goodToKnow?.error === "Profile not found under this tenant" &&
        getToKnow?.error === "Profile not found under this tenant" &&
        workExperience?.error === "Profile not found under this tenant" &&
        strengths?.error === "Profile not found under this tenant"
    ) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-[18px] text-[#9F9F9F]">
                    An error occurred. It seems you do not have access to this profile.
                </p>
            </div>
        );
    }

  if (
    isLoadingAttendeeInfo ||
    isLoadingGoodToKnow ||
    isLoadingGetToKnow ||
    isLoadingWorkExperience
  ) {
    return (
                <LoadingGenie withLoadingCircle={true} />

    );
  }

  return (
    <div
      className="w-[1050px] px-[15px] py-[3rem] my-0 mx-auto grid overflow-auto"
      style={{
        gridTemplateColumns: "1fr 2fr",
        gap: "24px",
      }}>
      <div className="space-y-[23.5px]">
        <div className="py-[10px] pb-[20px] space-y-3 px-[12px] rounded-[16px] border border-[#dddddd]">
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

          <div className="flex flex-wrap items-center justify-between w-full">
            <div className="font-semibold text-heading text-[18px] leading-[27px]">
              {name}
            </div>

            <div className="flex gap-[4px]">
              {attendeeInfo?.social_media_links && attendeeInfo?.social_media_links.map(
                  ({ url, platform }: AttendeeInfoSocials, index: number) => {
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
                            alt={`${platform} icon`} // Dynamically set the alt text based on the platform
                          />
                        </Link>
                      </div>
                    ) : null;
                  }
                )}
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

        <div className="py-[12px] space-y-2 rounded-[16px] px-[12px] border relative border-[#DDDDDD]">
          <div className="font-semibold text-[16px] text-heading">
            {name.split(" ")[0]}'s work history
          </div>

          <div className="relative">
            {/* <img
              src="/images/Group 71.png"
              alt="timeline"
              className="absolute left-4  h-full mt-5 pb-7 overflow-hidden w-[2.5px]"
            /> */}

            <div className="flex ml-[10px] flex-col gap-[20px]">
              {workExperience && Array.isArray(workExperience) && workExperience?.map(
                ({ title, end_date, start_date, company }, index) => (
                  <div
                    className={`primary-text flex items-start gap-4 before:content-[''] before:absolute before:w-[2.5px] before:h-full before:left-1.5 before:top-0 relative before:overflow-hidden ${
                      end_date === null ? "before:bg-[#00C875]" : ""
                    } ${
                      typeof end_date === "string" ? "before:bg-[#0073EA]" : ""
                    } ${
                      index === workExperience.length - 1
                        ? "before:-mt-10"
                        : "before:pb-16 before:mt-4"
                    }`}
                    key={index}>
                    <GreenTimelineIcon
                      className="min-w-[24px] z-[99] mt-2"
                      fill={
                        // (timeline === "pending" ? "#FFCB00" : "") ||
                        (end_date === null ? "#00C875" : "") ||
                        (typeof end_date === "string" ? "#0073EA" : "")
                      }
                      //  ${
                      //     timeline === "primary" ? "!text-[#37455C]" : ""
                      //   }
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
                        : moment(end_date).format("MMM YYYY")}{" "}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[24px] w-full justify-betwee">
          <Chart uuid={uuid} />

          <div className="border w-[50%] rounded-[16px] border-primary-border py-[12px] px-[12px] space-y-4">
            <h3 className="font-semibold !text-[16px] text-heading">
              Good to know
            </h3>
            {goodToKnow && goodToKnow.connections && Array.isArray(goodToKnow.connections)
                && goodToKnow.connections.length > 0 && (

            <div>
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Relevant connections
              </h4>

              <div className="flex gap-2">
                {goodToKnow.connections && Array.isArray(goodToKnow.connections) && goodToKnow?.connections?.map(
                  ({ name, image_url, linkedin_url}: Connection, index: number) => (
                    <Link to={linkedin_url} target="_blank" key={index}>
                      <Tooltip title={name} arrow placement="top">
                        <div className="w-[48px] rounded-full">
                          <img
                            src={image_url || "/images/anonymous-user-8.svg"}
                            alt="connection image"
                            className="rounded-full max-w-full"
                          />
                        </div>
                      </Tooltip>
                    </Link>
                  )
                )}
              </div>
            </div>)}

            {goodToKnow && goodToKnow.hobbies && Array.isArray(goodToKnow.hobbies) && goodToKnow.hobbies.length > 0 && (
            <div>
              <h4 className="uppercase text-heading font-bold text-[12px]">
                {name} "Icebreakers"
              </h4>

              <div className="flex gap-2">
                {goodToKnow.hobbies && Array.isArray(goodToKnow.hobbies) && goodToKnow?.hobbies?.map(
                  ({ hobby_name, icon_url }: Hobby, index: number) => (
                    <Tooltip
                      arrow
                      placement="top"
                      key={index}
                      title={hobby_name}>
                      <div className="w-12 h-12">
                        <img
                          src={icon_url}
                          alt="hobby image"
                          className="max-w-full"
                        />
                      </div>
                    </Tooltip>
                  )
                )}
              </div>
            </div>)}

            {goodToKnow && goodToKnow.news && Array.isArray(goodToKnow.news) && goodToKnow.news.length > 0 && (

            <div className="space-y-2">
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Top news
              </h4>

              <div className="flex flex-col gap-4">
                {goodToKnow.news && Array.isArray(goodToKnow.news) && goodToKnow?.news?.map(
                  ({ media, title, link }: News, index: number) => (
                    <Link
                      to={link}
                      target="_blank"
                      key={index}
                      className="flex items-center gap-2 bg-[#FAFAFA] px-2 py-1">

                      <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
                          <div
                            className="flex justify-between items-center cursor-pointer gap-2"
                          >
                          {iconRoutes[media.toLowerCase()] ? (
                              <div className="bg-[#0073EA12] rounded-lg px-2 py-1 flex justify-center items-center max-w-[48px]">
                                <img src={iconRoutes[media.toLowerCase()]} alt="news icon" />
                              </div>
                            ) : null}

                            <p className="font-normal text-[12px] leading-[18px] underline text-[#0073EA]">
                              {title}{" "}
                            </p>

                          </div>
                        </div>
                    </Link>
                  )
                )}
              </div>
            </div>)}
          </div>
        </div>

        {getToKnow && <div className="border space-y-6 border-primary-border py-[20px] px-[12px] rounded-2xl">
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <h3
                className="font-semibold text-[16px] text-heading
              ">
                Get to know {name.split(" ")[0]}
              </h3>


            <div className="primary-text !text-[12px] !font-medium">
                  {getToKnow?.title}
            </div>
          </div>

          {/* Best Practices Drawer */}
                    <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
                      <h3 className="font-medium text-[16px] text-heading">
                        Best practices
                      </h3>

                      {getToKnow.best_practices && Array.isArray(getToKnow.best_practices) && getToKnow.best_practices.map(
                        ({ reasoning, phrase_text }: any, index: number) => (
                          <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
                            <div
                              className="flex justify-between items-center cursor-pointer gap-2"
                              onClick={() => toggleExpandPractices(index)}
                            >
                            <div className="flex flex-row gap-3">
                              <TickIcon />
                              <span className="font-semibold text-gray-700">{phrase_text}</span>
                            </div>
                              <span className="text-gray-500 ml-4">
                                {practicesExpandedIndex === index ? '▲' : '▼'}
                              </span>
                            </div>
                            {practicesExpandedIndex === index && (
                              <div className="mt-4 pl-4">
                                <strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span>
                              </div>
                            )}
                          </div>
                        )
                      )}
                      </div>
                    </div>


            {/* Phrases to Use Drawer */}
                      <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
                        <h3 className="font-medium text-[16px] text-heading">
                          Phrases to use
                        </h3>
                        {getToKnow.phrases_to_use && Array.isArray(getToKnow.phrases_to_use) && getToKnow.phrases_to_use.map(
                          ({ reasoning, phrase_text }: any, index: number) => (
                            <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
                              <div
                                    className="flex justify-between items-center cursor-pointer gap-2"
                                    onClick={() => toggleExpandPhrases(index)}
                                  >
                                    <div className="flex flex-row gap-3">
                                        <TickIcon />
                                        <span className="font-semibold text-gray-700">{phrase_text}</span>
                                    </div>
                                    <span className="text-gray-500 ml-4">
                                  {phrasesExpandedIndex === index ? '▲' : '▼'}
                                </span>
                              </div>
                              {phrasesExpandedIndex === index && (
                                <div className="mt-4 pl-4">
                                  <strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>

            {/* Avoid Drawer */}
                      <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
                        <h3 className="font-medium text-[16px] text-heading">Avoid</h3>
                        {getToKnow.avoid && Array.isArray(getToKnow.avoid) && getToKnow.avoid.map(
                          ({ reasoning, phrase_text }: any, index: number) => (
                            <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
                              <div
                                    className="flex justify-between items-start cursor-pointer gap-2"
                                    onClick={() => toggleExpandAvoid(index)}
                                  >
                                  <div className="flex flex-row gap-3">
                                    <CrossIcon />
                                    <span className="font-semibold text-gray-900">"{phrase_text.replace(/\./g, '')}"</span>
                                  </div>
                                    <span className="text-gray-500 ml-4">
                                  {avoidExpandedIndex === index ? '▲' : '▼'}
                                </span>
                              </div>
                              {avoidExpandedIndex === index && (
                                <div className="mt-4 pl-4">
                                  <strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span>
                                </div>
                              )}
                            </div>
                          )
                        )}
            </div>
          </div> }
        </div>
        </div>
  );
};

export default ProfileDetails;
