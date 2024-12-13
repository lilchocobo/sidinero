import { Drawer } from 'vaul';
import { X, Share2, Twitter, Copy } from 'lucide-react';
import { useShareUtils } from '../../hooks/useShareUtils';

export interface ShareData {
  title: string;
  description?: string;
  image?: string;
  url: string;
  contractAddress?: string;
}

interface ShareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
}

export function ShareDrawer({ isOpen, onClose, data }: ShareDrawerProps) {
  const { copyToClipboard, shareToTwitter, shareNative } = useShareUtils();

  return (
    <Drawer.Root 
      open={isOpen} 
      onOpenChange={onClose}
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content 
          className="bg-zinc-900 flex flex-col rounded-t-[32px] h-[90vh] fixed bottom-0 left-0 right-0"
          aria-label="Share Content"
        >
          <div className="p-6 flex flex-col h-full">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
              aria-label="Close share dialog"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Content Section */}
            <div className="flex flex-col items-center mt-12 mb-8">
              {data.image && (
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-3xl font-bold text-white mb-2">{data.title}</h2>
              {data.description && (
                <p className="text-white/70 text-center">{data.description}</p>
              )}
            </div>

            {/* Share Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => shareNative(data)}
                className="w-full py-4 bg-white text-black font-bold rounded-2xl text-lg hover:bg-white/90 transition-colors"
              >
                SHARE
              </button>

              <button
                onClick={() => shareToTwitter(data)}
                className="w-full py-4 bg-[#1DA1F2] text-white font-bold rounded-2xl text-lg hover:bg-[#1a8cd8] transition-colors flex items-center justify-center gap-2"
              >
                <Twitter className="h-5 w-5" />
                Share on Twitter
              </button>
            </div>

            {/* Contract Address Section */}
            {data.contractAddress && (
              <div className="mt-6 p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70">Contract Address</span>
                  <button
                    onClick={() => copyToClipboard(data.contractAddress!)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-white font-mono text-sm break-all">
                  {data.contractAddress}
                </p>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}