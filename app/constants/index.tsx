import { Twitter, Facebook, AtSign } from 'react-feather';
import { NewspaperIcon } from '@heroicons/react/24/outline';

export enum FastName {
  TWITTER = 'twitter-fast',
  FACEBOOK = 'facebook-fast',
  EMAIL = 'email-fast',
  NEWS = 'news-fast',
}

type TFastNameIcons = {
  [key in FastName]: React.ReactNode;
};

export const fastNameLabels = {
  [FastName.TWITTER]: 'Twitter',
  [FastName.FACEBOOK]: 'Facebook',
  [FastName.NEWS]: 'News',
  [FastName.EMAIL]: 'Email',
};

export const fastNameIcons: TFastNameIcons = {
  [FastName.TWITTER]: <Twitter size={20} />,
  [FastName.FACEBOOK]: <Facebook size={20} />,
  [FastName.NEWS]: <NewspaperIcon height={20} width={20} />,
  [FastName.EMAIL]: <AtSign size={20} />,
};

const microFasts = {
  micro15: { label: 'Micro • 15m', duration: 15 * 60 * 1000 },
  micro30: { label: 'Micro • 30m', duration: 30 * 60 * 1000 },
  micro45: { label: 'Micro • 45m', duration: 45 * 60 * 1000 },
  label: 'Micro Fasts',
} as const;

const quickFasts = {
  quick10: { label: 'Quick • 60m', duration: 60 * 60 * 1000 },
  label: 'Quick Fasts',
} as const;

export const fastTypes = {
  micro: microFasts,
  quick: quickFasts,
} as const;
