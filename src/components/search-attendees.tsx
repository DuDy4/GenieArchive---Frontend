import CustomDrawer from "./ui/drawer";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";

interface SearchAttendesProps {
  openSearchBar: boolean;
  setOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const attendees = ["Muhammad", "John", "Joe", "Johnsan", "Roger"];

const SearchAttendes: React.FC<SearchAttendesProps> = ({
  openSearchBar,
  setOpenSearchBar,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(attendees);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filteredAttendees = attendees.filter((attendee) =>
      attendee.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filteredAttendees);
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
          filteredData.length > 0 ? (
            <ul className="px-[12px] flex flex-col gap-4">
              {filteredData.map((attendee, index) => (
                <li key={index} className="text-lg list-decimal list-inside">{attendee}</li>
              ))}
            </ul>
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
