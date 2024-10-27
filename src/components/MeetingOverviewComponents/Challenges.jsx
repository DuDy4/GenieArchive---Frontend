
import React, { useState } from 'react';


const Challenges = ({ challenges }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };



    return (
        <div className="company-challenges p-[10px] rounded-[16px] border border-[#dddddd] mb-4 p-5">
            <div className="flex justify-between items-center gap-2">
                <h1 className="text-lg font-bold text-gray-700 ">Company Challenges</h1>
            </div>
            <ul className="text-gray-600 mt-2 text-center flex flex-row gap-4">
                    {challenges.slice(0,3).map((challenge, index) => (
                        <li
                            key={index}
                            className={`p-4 flex rounded-lg shadow transition cursor-pointer ${
                              expandedIndex === index
                                ? 'bg-blue-100 hover:bg-blue-200'
                                : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={() => toggleExpand(index)}
                          >
                            <div
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleExpand(index)}
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">{challenge.challenge_name}</span>
                              </div>
                            </div>

                        </li>
                    ))}
            </ul>
            {(expandedIndex || expandedIndex === 0) && (
              <div className="mt-4 pl-4">
                <div className="mb-2 flex-row">
                    <div className="flex justify-between items-center">

                      <p><strong>Reasoning:</strong></p>
                      <p><strong styles={{color: "gray"}}>Score: {challenges[expandedIndex].score}</strong></p>
                    </div>
                  <div className="text-gray-700 text-[13px] width-1 text-justify">{challenges[expandedIndex].reasoning}</div>
                </div>
              </div>
            )}
        </div>

    );
}

export default Challenges;