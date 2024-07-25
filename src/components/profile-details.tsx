import UserImage from "/images/user-image.png";
import LinkedIcon from "/images/linkedin-icon.svg";
import XIcon from "/images/twitter-icon.svg";
import { CrossIcon, GreenTimelineIcon, TickIcon } from "./icons";
import { Link } from "react-router-dom";
import Chart from "./chart";
import { Tooltip } from "@mui/material";

const phrases = [
  '"With our solution, you can take command of your projects more effectively, driving your team towards even greater success."',
  `"I understand that you're looking for solutions that not only help you achieve your goals efficiently but also set you up for future"`,
];

const bestPractices = [
  {
    title: "Joe values clarity and specifics.",
    description:
      "What to do: Provide detailed, concrete information about how your product works and its benefits.",
  },
  {
    title: "Joe is interested in long-term success and future possibilities.",
    description:
      "What to do: Balance your pitch by discussing both immediate and future benefits, with a strong emphasis on the latter.",
  },
  {
    title: "Joe respects and responds to confidence and decisiveness.",
    description:
      "What to do: Be assertive and confident in your presentation, showing how your product is the best choice for a leader like him.",
  },
  {
    title: "Joe appreciates professionalism and structure.",
    description:
      "What to do: Ensure your presentation is well-organized, professional, and to the point.",
  },
];

const avoids = [
  "Build Rapport: Start by discussing Joe's recent achievements and future plans.",
  "Use Visual Aids: Incorporate charts or projections that highlight future benefits and growth potential.",
  "Follow-Up: Send materials that emphasize continuous improvement and future developments related to your product.",
];

const relevantConnections = [
  {
    name: "John Doe",
    connection: "../../images/relevant-connection-1.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "John Doe",
    connection: "../../images/relevant-connection-2.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "John Doe",
    connection: "../../images/relevant-connection-3.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "John Doe",
    connection: "../../images/relevant-connection-4.png",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "John Doe",
    connection: "../../images/relevant-connection-5.png",
    linkedin: "https://www.linkedin.com/",
  },
];

const interests = [
  {
    title: "Surfing",
    image: "../../images/surfing-image.svg",
  },
  {
    title: "Golf",
    image: "../../images/golf-image.svg",
  },
  {
    title: "Fan of Boston Celtics Team",
    image: "../../images/boston-celtics-image.svg",
  },
  {
    title: "Football",
    image: "../../images/football-image.svg",
  },
];

const topNews = [
  {
    image: "../../images/linkedin-icon.png",
    title: "Linkedin post ”saving the whales”",
    link: "https://www.linkedin.com/",
  },
  {
    image: "../../images/linkedin-icon.png",
    title: "There was an article about Joe in Forbes",
    link: "https://www.linkedin.com/",
  },
];

const playbooks = [
  {
    title: "Mail intro - 06/14/24",
    timeline: "success",
  },
  {
    title: "Invite Joe to the next Hackathon and use your software-08/17/24",
    timeline: "success",
  },
  {
    title: (
      <>
        Invite Joe to interact with fellow de <br />  the company community
        -08/22/24
      </>
    ),
    timeline: "success",
  },
  {
    title: "First meeting -08/22/24",
    timeline: "primary",
  },
  {
    title: "Connect on LinkedIn - 08/23/24",
    timeline: "pending",
  },
  {
    title: "Meeting follow up  -08/25/24",
    timeline: "pending",
  },
  {
    title:
      "Give Joe the Data and let him build the use case and convince his manager - 08/27/24",
    timeline: "pending",
  },
  {
    title: "Send an update on hackathon participation - 08/30/24",
    timeline: "pending",
  },
  {
    title: "Define a limited POC to Joe group 08/30/24",
    timeline: "pending",
  },
  {
    title: "Present POC metrics - 08/30/24",
    timeline: "pending",
  },
  {
    title:
      "Ask for a meeting with Jim the CRO to present metrics and talk about enterprise deal-08/31/24",
    timeline: "pending",
  },
  {
    title: "Close the deal- 09/01/24",
    timeline: "pending",
  },
];

interface ProfilesDetailsProps {
  name: string;
}

const ProfileDetails: React.FC<ProfilesDetailsProps> = ({ name }) => {
  return (
    <div
      className="w-[1050px] px-[15px] py-[3rem] my-0 mx-auto grid overflow-auto"
      style={{
        gridTemplateColumns: "1fr 2fr",
        gap: "24px",
      }}>
      <div className="space-y-[23.5px]">
        <div className="py-[10px] pb-[20px] space-y-3 px-[12px] rounded-[16px] border border-[#dddddd]">
          <img
            src={UserImage}
            alt="user photo"
            className="bg-cover max-w-full"
          />

          <div className="flex items-center justify-between w-full">
            <div className="font-semibold text-heading text-[18px] leading-[27px]">
              {name}
            </div>

            <div className="flex gap-[4px]">
              <Link to="https://www.linkedin.com/" target="_blank">
                <img
                  src={LinkedIcon}
                  className="min-w-[27px]"
                  alt="linkedin icon"
                />
              </Link>
              <Link to="https://www.linkedin.com/" target="_blank">
                <img src={XIcon} className="min-w-[27px]" alt="x icon" />
              </Link>
            </div>
          </div>

          <hr className="separator" />

          <div className="flex items-center justify-evenly w-full">
            <div className="flex flex-col gap-2">
              <div className="font-medium text-[12px] leading-[18px] text-[#9F9F9F]">
                Company Name
              </div>
              <div className="font-semibold whitespace-nowrap text-[#37455C] text-[14px] leading-[21px]">
                Poodle Cyber security
              </div>
            </div>

            <div className="h-[30px] mx-6 w-[1px] bg-[#DDDDDD]"></div>

            <div className="flex flex-col gap-2">
              <div className="font-regular text-[12px] leading-[18px] text-[#9F9F9F]">
                Position
              </div>
              <div className="font-semibold text-[#37455C] whitespace-nowrap text-[14px] leading-[21px]">
                Engineer Manager
              </div>
            </div>
          </div>
        </div>

        <div className="py-[12px] space-y-2 rounded-[16px] px-[12px] border relative border-[#DDDDDD]">
          <div className="font-semibold text-[16px] text-heading">
            Joe's Playbook
          </div>

          <div className="relative">
            <img
              src="/images/Group 71.png"
              alt="timeline"
              className="absolute left-4  h-full mt-5 pb-7 overflow-hidden"
            />

            <div className="flex ml-[10px] flex-col gap-[20px]">
              {playbooks.map(({ title, timeline }, index) => (
                <div
                  className={`primary-text flex items-center gap-4 ${
                    timeline === "primary" ? "font-semibold" : ""
                  }`}
                  key={index}>
                  <GreenTimelineIcon
                    className="min-w-[24px] z-[99]"
                    fill={
                      (timeline === "pending" ? "#FFCB00" : "") ||
                      (timeline === "success" ? "#00C875" : "") ||
                      (timeline === "primary" ? "#0073EA" : "")
                    }
                  />
                  <p
                    className={`primary-text !text-[12px] !font-medium ${
                      timeline === "primary" ? "!text-[#37455C]" : ""
                    }`}>
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[24px] w-full justify-betwee">
          <Chart />

          <div className="border w-[50%] rounded-[16px] border-primary-border py-[12px] px-[12px] space-y-4">
            <h3 className="font-semibold !text-[16px] text-heading">
              Good to know
            </h3>

            <div>
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Relevant connections
              </h4>

              <div className="flex gap-2">
                {relevantConnections.map(
                  ({ name, connection, linkedin }, index) => (
                    <Link to={linkedin} target="_blank" key={index}>
                      <Tooltip title={name} arrow placement="top">
                        <img src={connection} alt="connection image" />
                      </Tooltip>
                    </Link>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Interest in
              </h4>

              <div className="flex gap-2">
                {interests.map(({ image, title }, index) => (
                  <Tooltip arrow placement="top" key={index} title={title}>
                    <img src={image} alt="connection image" />
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="uppercase text-heading font-bold text-[12px]">
                Top news
              </h4>

              <div className="flex flex-col gap-4">
                {topNews.map(({ image, title, link }, index) => (
                  <Link
                    to={link}
                    target="_blank"
                    key={index}
                    className="flex items-center gap-2 bg-[#FAFAFA] px-2 py-1">
                    <div className="bg-[#0073EA12] rounded-lg px-2 py-1 flex justify-center items-center">
                      <img src={image} alt="connection image" />
                    </div>

                    <p className="font-normal text-[12px] leading-[18px] underline text-[#0073EA]">
                      {title}{" "}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border space-y-6 border-primary-border py-[20px] px-[12px] rounded-2xl">
          <div className="space-y-3">
            <div className="flex gap-4 items-center">
              <h3
                className="font-semibold text-[16px] text-heading
              ">
                Get to know Joe
              </h3>

              <div className="flex gap-2">
                <Tooltip arrow placement="top" title="Achiever">
                  <img
                    src="/images/achiever-icon.svg"
                    alt="good to know image"
                    className="min-w-[22px] cursor-pointer"
                  />
                </Tooltip>
                <Tooltip arrow placement="top" title="Command">
                  <img
                    src="/images/command-icon.svg"
                    alt="good to know image"
                    className="min-w-[22px] cursor-pointer"
                  />
                </Tooltip>
                <Tooltip arrow placement="top" title="Focus">
                  <img
                    src="/images/focus-icon.svg"
                    alt="good to know image"
                    className="min-w-[22px] cursor-pointer"
                  />
                </Tooltip>
                <Tooltip arrow placement="top" title="Futuristic">
                  <img
                    src="/images/futuristic-icon.svg"
                    alt="good to know image"
                    className="min-w-[22px] cursor-pointer"
                  />
                </Tooltip>
                <Tooltip arrow placement="top" title="Developer">
                  <img
                    src="/images/developer-icon.svg"
                    alt="good to know image"
                    className="min-w-[22px] cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>

            <div className="primary-text !text-[12px] !font-medium">
              Given Joe's personality traits as an Achiever, Futuristic,
              Developer, Focus and Command, here are strategies to effectively
              engage with him:
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
              <h3 className="font-medium text-[16px] text-heading">
                Best practices
              </h3>

              <div className="flex flex-col gap-4">
                {bestPractices.map(({ title, description }, index) => (
                  <div className="flex gap-1" key={index}>
                    <TickIcon />

                    <div>
                      <p className="primary-text !text-[12px] !font-medium">
                        {title}
                      </p>
                      <p className="primary-text !text-[12px] !font-medium">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-[16px] border-primary-border py-[12px] px-[12px] space-y-4">
              <h3 className="font-medium text-[16px] text-heading">
                Phrases to use:
              </h3>

              <div className="flex flex-col gap-4">
                {phrases.map((phrase, index) => (
                  <div className="flex items-center gap-1" key={index}>
                    <TickIcon />
                    <p className="primary-text !text-[12px] !font-medium">
                      {phrase}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-[16px] border-primary-border py-[12px] px-[12px] space-y-4">
              <h3 className="font-medium text-[16px] text-heading">Avoid</h3>

              <div className="flex flex-col gap-4">
                {avoids.map((avoid, index) => (
                  <div className="flex gap-1 items-center" key={index}>
                    <CrossIcon />
                    <p className="primary-text !text-[12px] !font-medium">
                      {avoid}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
