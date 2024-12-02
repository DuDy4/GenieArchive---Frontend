import { useState } from "react";
import { TickIcon, CrossIcon } from "../icons";

interface GetToKnowProps {
  getToKnow: any;
  name: string;
}

const GetToKnow: React.FC<GetToKnowProps> = ({ getToKnow, name }) => {
  const [practicesExpandedIndex, setPracticesExpandedIndex] = useState<number | null>(null);
  const [phrasesExpandedIndex, setPhrasesExpandedIndex] = useState<number | null>(null);
  const [avoidExpandedIndex, setAvoidExpandedIndex] = useState<number | null>(null);

  const toggleExpandPractices = (index: number) => setPracticesExpandedIndex(practicesExpandedIndex === index ? null : index);
  const toggleExpandPhrases = (index: number) => setPhrasesExpandedIndex(phrasesExpandedIndex === index ? null : index);
  const toggleExpandAvoid = (index: number) => setAvoidExpandedIndex(avoidExpandedIndex === index ? null : index);

  return (
    <div className="border space-y-6 border-primary-border py-[20px] px-[12px] rounded-2xl">
      <div className="space-y-3">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-[16px] text-heading">
            Get to know {name.split(" ")[0]}
          </h3>
          <div className="primary-text !text-[12px] !font-medium">
            {getToKnow?.title}
          </div>
        </div>

        <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
          <h3 className="font-medium text-[16px] text-heading">Best practices</h3>
          {getToKnow.best_practices && getToKnow.best_practices.map(({ reasoning, phrase_text }: any, index: number) => (
            <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
              <div className="flex justify-between items-center cursor-pointer gap-2" onClick={() => toggleExpandPractices(index)}>
                <div className="flex flex-row gap-3">
                  <TickIcon />
                  <span className="font-semibold text-gray-700">{phrase_text}</span>
                </div>
                <span className="text-gray-500 ml-4">
                  {practicesExpandedIndex === index ? '▲' : '▼'}
                </span>
              </div>
              {practicesExpandedIndex === index && <div className="mt-4 pl-4"><strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span></div>}
            </div>
          ))}
        </div>

        <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
          <h3 className="font-medium text-[16px] text-heading">Phrases to use</h3>
          {getToKnow.phrases_to_use && getToKnow.phrases_to_use.map(({ reasoning, phrase_text }: any, index: number) => (
            <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
              <div className="flex justify-between items-center cursor-pointer gap-2" onClick={() => toggleExpandPhrases(index)}>
                <div className="flex flex-row gap-3">
                  <TickIcon />
                  <span className="font-semibold text-gray-700">{phrase_text}</span>
                </div>
                <span className="text-gray-500 ml-4">
                  {phrasesExpandedIndex === index ? '▲' : '▼'}
                </span>
              </div>
              {phrasesExpandedIndex === index && <div className="mt-4 pl-4"><strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span></div>}
            </div>
          ))}
        </div>

        <div className="border rounded-[16px] border-primary-border py-[12px] px-[14px] space-y-4">
          <h3 className="font-medium text-[16px] text-heading">Avoid</h3>
          {getToKnow.avoid && getToKnow.avoid.map(({ reasoning, phrase_text }: any, index: number) => (
            <div key={index} className="p-4 rounded-lg shadow hover:bg-gray-100 transition">
              <div className="flex justify-between items-start cursor-pointer gap-2" onClick={() => toggleExpandAvoid(index)}>
                <div className="flex flex-row gap-3">
                  <CrossIcon />
                  <span className="font-semibold text-gray-900">"{phrase_text.replace(/\./g, '')}"</span>
                </div>
                <span className="text-gray-500 ml-4">
                  {avoidExpandedIndex === index ? '▲' : '▼'}
                </span>
              </div>
              {avoidExpandedIndex === index && <div className="mt-4 pl-4"><strong>Reasoning:</strong> <span className="text-gray-600">{reasoning}</span></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetToKnow;
