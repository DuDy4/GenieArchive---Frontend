import CustomDrawer from "./ui/drawer";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { Meeting, Profile } from "../types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface SearchAttendesProps {
  openSearchBar: boolean;
  setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchAttendes: React.FC<SearchAttendesProps> = ({
  openSearchBar,
  setOpenSearchBar,
}) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Profile[] | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      const meetingsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/TestOwner/meetings`
      );

      // Map each meeting to a promise that resolves with the profiles data
      const profilePromises = meetingsResponse.data?.map(
        async (meeting: Meeting) => {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/tenant_id}/${
              meeting.uuid
            }/profiles/?tenant_id=TestOwner`
          );

          const enhancedProfiles = response.data.map((profile: Profile) => ({
            ...profile,
            uuid: meeting?.uuid,
            title: meeting?.subject,
          }));
          return enhancedProfiles;
        }
      );

      // Wait for all promises to resolve
      const allProfiles = await Promise.all(profilePromises);

      // Combine all profiles into one array
      const combinedProfiles = [].concat(...allProfiles);

      // Update the profiles state with the combined data
      setProfiles(combinedProfiles);
      setMeetings(meetingsResponse.data);
    };

    fetchMeetings();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filteredData = profiles?.filter((profile) => {
      return profile.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredData(filteredData);
  };

  return (
    <CustomDrawer open={openSearchBar} expand={false}>
      <div className="flex flex-col h-full">
        <div className="flex shrink-0 items-center w-full justify-between px-[1rem] h-[56px] border-b border-[rgb(236, 238, 240)]">
          <div className="text-[12px] leading-[20px] font-normal">Search</div>
          <IoIosClose
            size={24}
            className="cursor-pointer"
            onClick={() => setOpenSearchBar(false)}
          />
        </div>

        <div className="flex p-[8px] mb-[8px] w-full max-h-[56px]">
          <input
            placeholder="Search notes, summaries, attendees emails..."
            className="border-none outline-none bg-[#E6E8EB] rounded-[4px] text-[12px] font-normal py-[10px] px-[14px] max-h-[56px] w-full"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
          />
        </div>

        {searchTerm ? (
          filteredData ? (
            <div className="px-[12px]">
              <Typography variant="h6" className="text-[14px] font-normal">
                Search results
              </Typography>
              <ul className="ml-4 mt-3 flex gap-4 flex-col">
                {filteredData?.map(({ name, uuid, title }, index) => (
                  <Link
                    to={`/meeting/${uuid}?name=${title}`}
                    key={index}
                    className="text-sm underline  transition-colors">
                    <li className="list-decimal list-inside">{name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
              <p className="text-[14px] leading-[24px] font-normal text-[rgb(17, 24, 28)]">
                No events match the search term
              </p>
              <p
                className="text-[12px] font-normal"
                style={{
                  color: "rgb(136, 144, 150)",
                }}>
                You can search for words in notes, summaries, attendees emails
                and event titles
              </p>
            </div>
          )
        ) : (
          <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
            <p className="text-[14px] leading-[24px] font-normal text-[rgb(17, 24, 28)]">
              You have no recent events with notes or summaries
            </p>
            <p
              className="text-[12px] font-normal"
              style={{
                color: "rgb(136, 144, 150)",
              }}>
              You can add notes and summaries to your events from the event
              dialog
            </p>
          </div>
        )}
      </div>
    </CustomDrawer>
  );
};

export default SearchAttendes;
