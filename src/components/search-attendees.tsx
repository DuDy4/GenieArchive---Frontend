import CustomDrawer from "./ui/drawer";
import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Meeting, Profile } from "../types";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingGenie from "./ui/loading-genie";
import { useApiClient } from "../utils/AxiosMiddleware";
import { useMeetingsContext } from "../providers/MeetingsProvider";

interface SearchAttendesProps {
  openSearchBar: boolean;
  setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchAttendes: React.FC<SearchAttendesProps> = ({
  openSearchBar,
  setOpenSearchBar,
}) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[] | null>(null);
  const { user } = useAuth0();
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
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
        try {
            const meetingsResponse = await makeRequest('GET', `/${user?.sub}/meetings-search`);
            setMeetings(meetingsResponse);
            console.log("Meetings response", meetingsResponse, "Length", meetingsResponse.length);
            const now = new Date();
            const sortedMeetings = meetingsResponse.sort((a, b) => {
                const startTimeA = new Date(a.start_time);
                const startTimeB = new Date(b.start_time);

                // Check if the meeting is in the future or past
                const isFutureA = startTimeA >= now;
                const isFutureB = startTimeB >= now;

                if (isFutureA && !isFutureB) return -1; // A is future, B is past
                if (!isFutureA && isFutureB) return 1;  // A is past, B is future

                // Both are future or both are past: sort accordingly
                if (isFutureA && isFutureB) {
                    return startTimeA - startTimeB; // Future: ascending order
                } else {
                    return startTimeB - startTimeA; // Past: descending order
                }
            });
            setMeetings(sortedMeetings);
        }
        catch (error) {
            console.error("Error fetching meetings: ", error);
        }
        finally {
            setLoading(false);
        }
    };

    fetchMeetings();
  }, []);

 const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   const searchTerm = e.target.value.toLowerCase();
   setSearchTerm(searchTerm);

   if (meetings) {
     const filteredMeetings = meetings.filter((meeting) =>
       meeting.subject.toLowerCase().includes(searchTerm) || // Check if searchTerm is in the subject
       meeting.participants.some((participant) =>
         participant.toLowerCase().includes(searchTerm) // Check if searchTerm is in any participant name
       )
     );

     setFilteredMeetings(filteredMeetings);
   }
 };
  console.log("Profiles:", profiles); // Check if profiles is populated correctly



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
          />
        </div>

        {searchTerm ? (
          filteredMeetings?.length ? (
            <div className="px-[12px]" style={{height: '90%'}}>
              <Typography variant="h6" className="text-[14px] font-normal">
                Search results
              </Typography>
              <div
                className={`mt-3 flex gap-4 flex-col  ${filteredMeetings.length > 6 ? "scrollable-no-scrollbar" : ""}`}
                style={{height: 'inherit'}}
                >
              <ul className="ml-4 mt-3 flex gap-4 flex-col" style={{height: 'inherit'}}>
                {filteredMeetings.map((meeting, index) => (
                  <Link
                    to={`/meeting/${meeting.uuid}`}
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
                      Attendees with matched name: {
                        meeting.participants
                          .filter(name =>
                            name.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .join(", ")
                          || "No attendees answered the search"

                      }
                    </li>
                  </Link>
                ))}
              </ul>
              </div>
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
          <LoadingGenie withLoadingCircle={loading ? true: false} />
        )}
      </div>
    </CustomDrawer>
  );
};

export default SearchAttendes;
