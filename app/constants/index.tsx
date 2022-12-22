import {
  Twitter,
  Facebook,
  AtSign,
  Instagram,
  Type,
  Tv,
  Slack,
  Youtube,
  Twitch,
  Wifi,
  Smartphone,
  Globe,
} from 'react-feather';
import { NewspaperIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import {
  Tiktok,
  Snapchat,
  Whatsapp,
  Telegram,
  Reddit,
  Uber,
  UberEats,
  Lyft,
  Doordash,
} from '~/components/icons';

type TFastTypeLabels = {
  [key in keyof typeof fastTypes]: string;
};

type TFastLabels = {
  [key in keyof typeof fasts]: string;
};

export const communicationFast = {
  email: 'Email',
  news: 'News',
  text: 'Text',
  whatsapp: 'Whatsapp',
  telegram: 'Telegram',
  slack: 'Slack',
};

export const entertainmentFast = {
  reddit: 'Reddit',
  youtube: 'YouTube',
};

export const gamingFast = {
  twitch: 'Twitch',
};

export const travelFast = {
  uber: 'Uber',
  lyft: 'Lyft',
};

export const foodServiceFast = {
  uberEats: 'Uber Eats',
  doordash: 'Doordash',
};
export const generalFast = {
  full: 'Full',
  tv: 'TV',
  internet: 'Internet',
  phone: 'Phone',
  gaming: 'Gaming',
};

export const socialFast = {
  twitter: 'Twitter',
  facebook: 'Facebook',
  snapchat: 'Snapchat',
  tiktok: 'Tiktok',
  instagram: 'Instagram',
};

export const fasts = {
  social: socialFast,
  communication: communicationFast,
  entertainment: entertainmentFast,
  travel: travelFast,
  food: foodServiceFast,
  gaming: gamingFast,
  general: generalFast,
} as const;

export const allFastNames = {
  ...socialFast,
  ...generalFast,
  ...foodServiceFast,
  ...travelFast,
  ...gamingFast,
  ...communicationFast,
  ...entertainmentFast,
};

type TFastNameIcons = {
  [key in keyof typeof allFastNames]: React.ReactNode;
};

export const fastCategoryLabels: TFastLabels = {
  social: 'Social Media',
  communication: 'Communications',
  entertainment: 'Entertainment',
  travel: 'Travel',
  food: 'Food Services',
  gaming: 'Gaming',
  general: 'General',
};

export const fastNameIcons: TFastNameIcons = {
  twitter: <Twitter size={20} className="icon-color" strokeWidth={1.5} />,
  facebook: <Facebook size={20} className="icon-color" strokeWidth={1.5} />,
  news: <NewspaperIcon height={20} width={20} className="icon-color" />,
  email: <AtSign size={20} className="icon-color" strokeWidth={1.5} />,
  snapchat: <Snapchat className="icon-color" />,
  tiktok: <Tiktok className="icon-color" />,
  instagram: <Instagram size={20} className="icon-color" strokeWidth={1.5} />,
  text: <Type size={20} className="icon-color" strokeWidth={2} />,
  whatsapp: <Whatsapp className="icon-color" />,
  telegram: <Telegram className="icon-color" />,
  slack: <Slack size={20} className="icon-color" strokeWidth={1.5} />,
  reddit: <Reddit className="icon-color" />,
  youtube: <Youtube size={20} className="icon-color" strokeWidth={1.5} />,
  twitch: <Twitch size={20} className="icon-color" strokeWidth={1.5} />,
  uber: <Uber className="icon-color" />,
  lyft: <Lyft className="icon-color" />,
  uberEats: <UberEats className="icon-color" />,
  doordash: <Doordash className="icon-color" />,
  full: <Globe size={20} className="icon-color" strokeWidth={1.5} />,
  tv: <Tv size={20} className="icon-color" strokeWidth={1.5} />,
  internet: <Wifi size={20} className="icon-color" strokeWidth={1.5} />,
  phone: <Smartphone size={20} className="icon-color" strokeWidth={1.5} />,
  gaming: <PuzzlePieceIcon height={20} width={20} className="icon-color" />,
};

type TFastType = {
  [key: string]: {
    label: string;
    duration: number;
  };
};

const micro: TFastType = {
  micro15: { label: '15m', duration: 15 },
  micro30: { label: '30m', duration: 30 },
  micro45: { label: '45m', duration: 45 },
};

const quick: TFastType = {
  quick1: { label: 'Quick • 1h', duration: 1 * 60 },
  quick2: { label: 'Quick • 2h', duration: 2 * 60 },
  quick4: { label: 'Quick • 4h', duration: 4 * 60 },
  quick8: { label: 'Quick • 8h', duration: 8 * 60 },
};

const long: TFastType = {
  long10: { label: 'Long • 10h', duration: 10 * 60 },
  long12: { label: 'Long • 12h', duration: 12 * 60 },
  long16: { label: 'Long • 16h', duration: 16 * 60 },
  long18: { label: 'Long • 18h', duration: 18 * 60 },
};

const extended: TFastType = {
  extended1: { label: 'Extended • 24h', duration: 24 * 60 },
  extended2: { label: 'Extended • 48h', duration: 48 * 60 },
  extended3: { label: 'Extended • 72h', duration: 72 * 60 },
  extended7: { label: 'Extended • 1 week', duration: 168 * 60 },
};

export const fastTypeLabels: TFastTypeLabels = {
  micro: 'Micro Fasts',
  quick: 'Quick Fasts',
  long: 'Long Fasts',
  extended: 'Extended Fasts',
};

export const fastTypes = {
  micro,
  quick,
  long,
  extended,
} as const;
