import { ShareData } from './ShareDrawer';

interface ShareContentProps {
  data: ShareData;
}

export function ShareContent({ data }: ShareContentProps) {
  return (
    <div className="bg-purple-500/50 rounded-2xl p-4 mb-6">
      {data.image && (
        <div className="w-20 h-20 rounded-xl overflow-hidden mb-4">
          <img 
            src={data.image} 
            alt={data.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
      <p className="text-white/70">{data.description}</p>
    </div>
  );
}