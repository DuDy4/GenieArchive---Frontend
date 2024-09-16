import CustomDrawer from "./ui/drawer";
import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Meeting, Profile } from "../types";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
// import { useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingGenie from "./ui/loading-genie";
import { useApiClient } from "../utils/AxiosMiddleware";

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
  const [loading, setLoading] = useState<Boolean>(false);
  const [filteredData, setFilteredData] = useState<Profile[] | null>(null);
  const [filteredEmails, setFilteredEmails] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[] | null>(null);
  const { user } = useAuth0();
  const searchInputRef = useRef<HTMLInputElement>(null);
    const { makeRequest } = useApiClient();

  useEffect(() => {
    if (openSearchBar && searchInputRef.current) {
      searchInputRef.current?.focus();
    }
  }, [openSearchBar]);

  useEffect(() => {
    setLoading(true);
    const fetchMeetings = async () => {
      const meetingsResponse = await makeRequest('GET', `/${user?.tenantId}/meetings`);
      // console.log(meetingsResponse?.data)

      // Map each meeting to a promise that resolves with the profiles data
      const profilePromises = meetingsResponse.data?.map(
        async (meeting: Meeting) => {
            if (!user?.tenantId) {
                throw new Error("Tenant ID not available");
            }
            if (!token) {
                throw new Error("Token not available");
            }
          const response = await makeRequest('GET', `/${user?.tenantId}/${meeting.uuid}/profiles`);

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
      console.log("All profiles", allProfiles);
      setLoading(false);
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

    console.log("Filtered data: ", filteredData);

    const filteredEmails = filteredData.map((profile) => profile.email);

    console.log(" Filtered emails: ", filteredEmails);
    setFilteredEmails(filteredEmails);

    const filteredParticipants = filteredData.map((profile) => {

        });

    const filteredMeetings = meetings?.filter((meeting) => {
      return meeting.participants_emails.some((email) =>
        filteredEmails.includes(email.email.toLowerCase())
      );
    });

    console.log("Filtered meetings: ",filteredMeetings);
    const sortedMeetings = filteredMeetings?.sort((a, b) => {
      return a.start_time - b.start_time;
    })
    setFilteredMeetings(sortedMeetings);
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
            placeholder="Search for profiles you're meeting up with..."
            className="border-none outline-none bg-[#E6E8EB] rounded-[4px] text-[12px] font-normal py-[10px] px-[14px] max-h-[56px] w-full"
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            ref={searchInputRef}
            readOnly={loading}
          />
        </div>

        {searchTerm ? (
          filteredMeetings?.length ? (
            <div className="px-[12px]">
              <Typography variant="h6" className="text-[14px] font-normal">
                Search results
              </Typography>
              <ul className="ml-4 mt-3 flex gap-4 flex-col">
                {filteredMeetings.map((meeting, index) => (
                  <Link
                    to={`/meeting/${meeting.uuid}?name=${meeting.subject}`}
                    key={index}
                    className="text-sm transition-colors w-full bg-gray-100 px-2 rounded-md py-2"
                  >
                    <li className="list-inside font-bold">
                    <div className="date-time">
                      <div className="meeting-date">{new Date(meeting.start_time).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                      <div className="meeting-time">{new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                      <div className="meeting-info">
                        <div className="meeting-subject">{meeting.subject}</div>
                      </div>

                    </li>
                    <li className="list-inside" key={meeting.uuid}>
                      Attendee: {
                        meeting.participants_emails
                          .filter(emailObj =>
                            filteredEmails.includes(emailObj.email.toLowerCase())
                          )
                          .map(emailObj => {
                            const profile = profiles?.find(profile => profile.email === emailObj.email);
                            return profile ? profile.name : emailObj.email;
                          })
                          .join(", ")
                      }
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
              <p className="text-[14px] leading-[24px] font-normal text-[rgb(17, 24, 28)]">
                Couldn't find any meetings to match your search
              </p>
              <p
                className="text-[12px] font-normal"
                style={{
                  color: "rgb(136, 144, 150)",
                }}
              >
                You can search for words in any name of an attendee
              </p>
            </div>
          )
        ) : (
          <LoadingGenie withLoadingCircle={false} />
        )}
      </div>
    </CustomDrawer>
  );
};

export default SearchAttendes;
