import { toast } from 'react-hot-toast';
import { ShareData } from '../components/Share/ShareDrawer';

export function useShareUtils() {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const shareToTwitter = (data: ShareData) => {
    const text = `${data.title}\n\n${data.description}`;
    const url = data.url;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareNative = async (data: ShareData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: data.description,
          url: data.url
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      copyToClipboard(data.url);
    }
  };

  return {
    copyToClipboard,
    shareToTwitter,
    shareNative
  };
}