import { TokenDetails } from '../../../types';
import { Twitter, Send, } from 'lucide-react';
import { SlideToLaunch } from '../../common/SlideToLaunch';
import {
  useBTokenFactoryAddress,
  useBTokenFactoryDeploy
} from '../../../hooks/contracts/useBTokenFactory';
import { toast } from 'react-hot-toast';
import { useChainId, usePublicClient, } from 'wagmi';

import { useTokens } from '../../../hooks/useTokens';
import { useEffect, useState } from 'react';

// Initialize viem client

interface StepThreeProps {
  tokenDetails: TokenDetails;
  setTokenDetails: (tokenDetails: TokenDetails) => void;
  onClose: () => void;
}

// Import decodeEventLog from viem
import { decodeEventLog } from 'viem'
import BTokenFactoryABI from '../../../lib/abi/BTokenFactory.json'

export function StepThree({ tokenDetails, setTokenDetails, onClose }: StepThreeProps) {
  const { addToken } = useTokens();
  const client = usePublicClient()

  const BTokenFactoryAddress = useBTokenFactoryAddress()

  const { deploy } = useBTokenFactoryDeploy({
    name: tokenDetails.name,
    symbol: tokenDetails.ticker,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Create preview URL when component mounts
  useEffect(() => {
    if (tokenDetails.image) {
      const previewUrl = URL.createObjectURL(tokenDetails.image);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [tokenDetails.image]);

  const handleLaunchComplete = async () => {
    try {
      const tx = await deploy({
        onSuccess: () => {
          toast.success('Token deployed successfully!');
          onClose?.();
        },
        onError: (error) => {
          console.error('Failed to deploy token:', error);
          throw error
          // toast.error(`Failed to deploy token`);
        },
      });

      console.log({tx})

      // Fetch transaction receipt using viem
      const receipt = await client?.waitForTransactionReceipt({ hash: tx });
      console.log({receipt})
      const logs = receipt?.logs

      // Filter logs by address
      const filteredLog = logs?.find(log =>
        log.address.toLowerCase() === BTokenFactoryAddress.toLowerCase()
      );

      console.log({ filteredLog })

      if (filteredLog) {
        // Decode the log data
        const decodedLog = decodeEventLog({
          abi: BTokenFactoryABI.abi,
          data: filteredLog.data,
          topics: filteredLog.topics,
        })

        console.log('Decoded log:', decodedLog)

        // @ts-ignore
        const { bToken } = decodedLog.args
        setTokenDetails({ ...tokenDetails, address: bToken })

        // Now you can use the tokenAddress to add the token
        if (bToken) {
          await addToken({
            address: bToken,
            chainId: client?.chain.id!,
            image: tokenDetails.image,
          });


          toast.success('Token deployed successfully!');
          onClose?.();
        }
      }
    } catch (error) {
      console.error('Failed to deploy token:', error);
      toast.error('Failed to deploy token. Please try again.');
    }
  }

  // Prevent closing modal during deployment
  const handleClose = () => {
    toast.error("Please wait for the transaction to complete");
    return;
  };

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="bg-yellow-300 rounded-3xl p-8 max-w-sm mx-auto w-full shadow-lg">
        {/* Token Image and Details */}
        <div className="relative mb-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Token"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
          )}
          <div className="text-center mt-4">
            <h3 className="text-4xl font-bold">{tokenDetails.name}</h3>
            <p className="text-2xl text-purple-600">${tokenDetails.ticker}</p>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-2 justify-center mt-6 mb-4">
          <button className="w-14 h-14 bg-pink-300 rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors">
            <Twitter className="text-white" size={24} />
          </button>
          <button className="w-14 h-14 bg-pink-300 rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors">
            <Send className="text-white" size={24} />
          </button>
          <button className="w-14 h-14 bg-pink-300 rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors">
            <Send className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Slide to Launch Button */}
      <div className="mt-8">
        <SlideToLaunch
          onComplete={handleLaunchComplete}
          defaultText="SLIDE TO LAUNCH"
          successText="LAUNCHING..."
          errorText="CANNOT LAUNCH"
       />
      </div>
    </div>
  );
}