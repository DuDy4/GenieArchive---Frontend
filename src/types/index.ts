interface Profile {
  name: string;
  uuid: string;
}

interface News {
  news_icon: string;
  title: string;
  link: string;
}

interface Hobby {
  hobby_name: string;
  icon_url: string;
}

interface Connection {
  name: string;
  image_url: string;
  linkedin_url: string;
  uuid: string;
}

interface AttendeeInfoSocials {
  url: string;
  plateform: string;
}

interface Meeting {
  end_time: string;
  google_calendar_id: string;
  participants_emails: string[];
  start_time: string;
  subject: string;
  uuid: string;
  link: string;
  tenant_id: string;
}

interface Strength {
  strength_name?: string;
  strengths_name?: string;
  score: number;
}

export type { Profile, News, Hobby, Connection, AttendeeInfoSocials, Meeting, Strength };
