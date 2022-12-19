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

// steam, reddit, whatsapp, telegram, tiktok, uber, uber eats, lyft, doordash

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

const allFastNames = {
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
  micro15: { label: 'Micro • 15m', duration: 15 * 60 * 1000 },
  micro30: { label: 'Micro • 30m', duration: 30 * 60 * 1000 },
  micro45: { label: 'Micro • 45m', duration: 45 * 60 * 1000 },
};

const quick: TFastType = {
  quick60: { label: 'Quick • 60m', duration: 60 * 60 * 1000 },
};

export const fastTypeLabels: TFastTypeLabels = {
  micro: 'Micro Fasts',
  quick: 'Quick Fasts',
};

export const fastTypes = {
  micro,
  quick,
} as const;
