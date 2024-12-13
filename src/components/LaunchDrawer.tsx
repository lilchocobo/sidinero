import React from 'react';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';

interface LaunchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LaunchDrawer({ isOpen, onClose }: LaunchDrawerProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col rounded-t-[32px] bg-[#7C3AED]">
          <div className="flex-1 rounded-t-[32px] bg-[#7C3AED] p-4">
            <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-white/50" />
            <div className="mx-auto max-w-md">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-full bg-white/10 p-2 text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-8 flex flex-col items-center justify-center text-center">
                <div className="space-y-4 text-white">
                  <h2 className="text-3xl font-bold">
                    creators make money<br />
                    when someone buys or<br />
                    sells your token
                  </h2>
                </div>
                
                <button 
                  className="mt-auto fixed bottom-8 left-4 right-4 rounded-full bg-[#FFEB3B] py-4 text-xl font-semibold text-black"
                  onClick={onClose}
                >
                  I'm ready
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}