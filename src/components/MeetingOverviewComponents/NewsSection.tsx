import React from 'react';
import { Link } from 'react-router-dom';

interface News {
  news_icon?: string;
  title: string;
  link: string;
}

interface NewsSectionProps {
  news: News[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="space-y-4 mt-8">
      <h4 className="uppercase text-heading font-bold text-[14px]">
        Top news
      </h4>

      <div className="flex flex-col gap-4">
        {news && Array.isArray(news) && news.map(({ news_icon, title, link }: News, index: number) => (
          <Link
            to={link}
            target="_blank"
            key={index}
            className="flex items-center gap-2 bg-[#FAFAFA] px-2 py-2 rounded-lg"
          >
            {news_icon ? (
              <div className="bg-[#0073EA12] rounded-lg p-2 flex justify-center items-center max-w-[48px]">
                <img src={news_icon} alt="news icon" className="w-6 h-6" />
              </div>
            ) : null}

            <p className="font-normal text-[14px] leading-[20px] underline text-[#0073EA]">
              {title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
