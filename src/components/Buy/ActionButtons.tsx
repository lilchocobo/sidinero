interface ActionButtonsProps {
  onShare: () => void;
  onHome: () => void;
}

export function ActionButtons({ onShare, onHome }: ActionButtonsProps) {
  return (
    <div className="w-full space-y-4">
      <button
        onClick={onShare}
        className="w-full py-4 bg-green-400 text-black font-bold rounded-full text-xl hover:bg-green-500 transition-colors"
      >
        SHARE
      </button>
      <button
        onClick={onHome}
        className="w-full py-4 bg-black/10 backdrop-blur-sm text-black font-bold rounded-full text-xl hover:bg-black/20 transition-colors"
      >
        HOME
      </button>
    </div>
  );
}