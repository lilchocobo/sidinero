import { Drawer } from 'vaul';
import { TokenDetails } from '../../types';

interface PostLaunchFlowProps {
  isOpen: boolean;
  onClose: () => void;
  tokenDetails: TokenDetails;
    }


export function PostLaunchFlow({ isOpen, onClose, tokenDetails }: PostLaunchFlowProps) {
  return (
    <Drawer.Root 
      open={isOpen} 
      onOpenChange={onClose}
      shouldScaleBackground
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-purple-600 flex flex-col rounded-t-[10px] h-[96vh] max-h-[96vh] fixed bottom-0 left-0 right-0">
          <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
            <img 
              src={'/svg/uppies_2.svg'}
              alt="Uppies animation"
              className="w-32 absolute top-4"
              style={{
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />

            <div className="mb-6">
              <svg className="w-12 h-12 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-white text-2xl font-bold mb-2">pew pew pew</h2>
            <p className="text-white text-xl mb-8">${tokenDetails.ticker} launched</p>

            <a
              href={`/token/${tokenDetails.address}`}
              onClick={onClose}
              className="bg-yellow-300 hover:bg-yellow-400 text-purple-600 font-bold py-2 px-6 rounded-full transition-colors"
            >
              Go to coin
            </a>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-yellow-300 hover:text-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
} 