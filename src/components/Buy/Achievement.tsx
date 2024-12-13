interface AchievementProps {
  title: string;
  description: string;
  tokenSymbol: string;
}

export function Achievement({ title, description, tokenSymbol }: AchievementProps) {
  return (
    <div className="bg-yellow-300/90 backdrop-blur-sm rounded-3xl p-6 w-full mb-8">
      <h3 className="text-2xl font-bold text-black text-center mb-2">
        ACHIEVEMENT UNLOCKED
      </h3>
      <div className="bg-gradient-to-b from-green-400/20 to-green-400 rounded-2xl p-8 text-center">
        <p className="text-sm text-black/80 mb-2">{description}</p>
        <p className="text-4xl font-bold text-black">${tokenSymbol}</p>
      </div>
    </div>
  );
}