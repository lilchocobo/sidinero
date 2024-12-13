import { Share2, Twitter, Copy, Send } from 'lucide-react';
import { ShareData } from './ShareDrawer';
import { useShareUtils } from '../../hooks/useShareUtils';

interface ShareOptionsProps {
  data: ShareData;
}

export function ShareOptions({ data }: ShareOptionsProps) {
  const { copyToClipboard, shareToTwitter, shareNative } = useShareUtils();

  const shareOptions = [
    {
      icon: Share2,
      label: 'Share',
      onClick: () => shareNative(data),
      primary: true
    },
    {
      icon: Twitter,
      label: 'Twitter',
      onClick: () => shareToTwitter(data)
    },
    {
      icon: Copy,
      label: 'Copy Link',
      onClick: () => copyToClipboard(data.url)
    },
    {
      icon: Send,
      label: 'Send',
      onClick: () => shareNative(data)
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {shareOptions.map((option, index) => (
        <button
          key={option.label}
          onClick={option.onClick}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
            option.primary
              ? 'bg-yellow-300 text-purple-600 hover:bg-yellow-400'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <option.icon className="h-6 w-6" />
          <span className="text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
}