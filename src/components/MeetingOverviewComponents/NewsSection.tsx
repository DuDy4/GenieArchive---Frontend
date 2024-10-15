import React from 'react';
import { Link } from 'react-router-dom';

interface News {
  news_icon?: string;
  media?: string;
  title: string;
  link: string;
  summary: string;
}

interface NewsSectionProps {
  news: News[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, company_name }) => {
  return (
    <div className="space-y-4  p-[10px] rounded-[16px] border border-[#dddddd]">
      <h4 className="uppercase text-heading font-bold text-[14px]">
        Top news {company_name ? `about ${company_name}` : ''}
      </h4>

      <div className="flex flex-col gap-4">
        {news && Array.isArray(news) && news.map(({ news_icon, title, link, summary, media }: News, index: number) => (
          <Link
            to={link}
            target="_blank"
            key={index}
            className="flex flex-col gap-2 bg-[#FAFAFA] px-2 py-2 rounded-lg"
          >
            {news_icon ? (
              <div className="bg-[#0073EA12] rounded-lg p-2 flex max-w-[48px]">
                <img src={news_icon} alt="news icon" className="w-6 h-6" />
              </div>
            ) : null}

            <p className="font-bold text-[16px] leading-[20px] bold">
              {title}
            </p>
            <p className="font-normal text-[12px] leading-[18px] text-[#777777]">
                {summary.slice(0, 200)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
