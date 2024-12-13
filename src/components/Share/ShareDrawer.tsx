import { Drawer } from 'vaul';
import { ShareContent } from './ShareContent';
import { ShareOptions } from './ShareOptions';
import { X } from 'lucide-react';

export interface ShareData {
  title: string;
  description: string;
  image?: string;
  url: string;
}

interface ShareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
}

export function ShareDrawer({ isOpen, onClose, data }: ShareDrawerProps) {
  return (
    <Drawer.Root 
      open={isOpen} 
      onOpenChange={onClose}
      shouldScaleBackground
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content 
          className="bg-purple-600 flex flex-col rounded-t-[32px] fixed bottom-0 left-0 right-0"
          aria-label="Share Content"
        >
          <Drawer.Title className="sr-only">Share Content</Drawer.Title>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-300">Share</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
                aria-label="Close share dialog"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <ShareContent data={data} />
            <ShareOptions data={data} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}