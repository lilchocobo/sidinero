import { UnsignedTransactionRequest, usePrivy, useWallets } from '@privy-io/react-auth';
import { formatDistanceToNow } from 'date-fns';
import { useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { useTransactions } from '../../context/TransactionsContext';
import { useBTokenFactoryDeployer } from '../../hooks/contracts/useBTokenFactory';

export function UserDetails() {
  const { user } = usePrivy();
  const { wallets } = useWallets();

  const { data: balanceData } = useBalance({
    address: wallets[0]?.address as `0x${string}`,
  });

  const { data: isDeployer } = useBTokenFactoryDeployer({
    deployerAddress: wallets[0]?.address as `0x${string}`,
  });

  const { sendTransaction } = usePrivy();
  const { watchTransaction } = useTransactions();


  const handleSignMessage = async () => {
    if (!wallets.length) return;

    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthereumProvider();

      const signature = await provider.request({
        method: 'personal_sign',
        params: ['Hello Web3', wallet.address],
      });

      console.log('Signature:', signature);
      alert('Message signed successfully! Check console for signature.');
    } catch (error) {
      console.error('Error signing message:', error);
      alert('Failed to sign message. Check console for details.');
    }
  };

  const handleTestTransaction = async () => {
    if (!wallets.length) return;
    
    try {
      const wallet = wallets[0];
      const value = parseEther('0.01');
      
      const requestData: UnsignedTransactionRequest = {
        to: '0xFFe8fFA8e9AF46b8CD6E95143b694719D86EC84d',
        value: `0x${value.toString(16)}`, // Add 0x prefix to hex string
        from: wallet.address, // Add the from address
      };

      const uiConfig = {
        header: 'Send Test Transaction',
        description: 'Sending 0.01 ETH',
        buttonText: 'Confirm Send',
      };

      console.log('requestData', requestData);

      const txReceipt = await sendTransaction(requestData, uiConfig);
      console.log('Transaction hash:', txReceipt.transactionHash);
      watchTransaction({ hash: txReceipt.transactionHash as `0x${string}`, description: 'Send 0.01 ETH' });
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Failed to send transaction. Check console for details.');
    }
  };

  if (!user) return null;

  const joinedDate = user.createdAt ? formatDistanceToNow(new Date(user.createdAt * 1000), { addSuffix: true }) : null;
  const handle = user.customMetadata?.handle;
  const handleCreatedAt = user.customMetadata?.handleCreatedAt;

  return (
      <div className="bg-purple-500  mx-4 mt-4 text-white relative">

        <div className="space-y-6">
          {/* Handle Section */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold">Handle</h3>
              <p className="font-mono text-xl">
                {handle ? `@${handle}` : 'No handle set'}
              </p>
            </div>
            {handleCreatedAt && (
              <span className="text-xs opacity-60">
                Set {formatDistanceToNow(handleCreatedAt, { addSuffix: true })}
              </span>
            )}
          </div>

          {/* Auth Methods Section */}
          {user.linkedAccounts && user.linkedAccounts.length > 0 && (
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold">Login Methods</h3>
              <div className="flex flex-col gap-2 mt-2">
                {user.linkedAccounts.map((account) => (
                  <div key={account.type} className="flex items-center gap-2">
                    <span className="text-xs bg-purple-400/30 px-2 py-1 rounded-full">
                      {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                    </span>
                    {account.type === 'discord' && account.details?.username && (
                      <span className="text-xs opacity-80">
                        @{account.details.username}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallet Section */}
          {user.wallet && (
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold mb-2">Wallet</h3>
              <div className="bg-purple-400/20 rounded-xl p-3">
                <p className="font-mono text-sm break-all">{user.wallet.address}</p>
                {balanceData && (
                  <p className="text-sm mt-1">
                    Balance: {Number(balanceData?.formatted).toFixed(4)} {balanceData?.symbol}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-purple-400/30 px-2 py-1 rounded-full">
                    {user.wallet.walletClientType === 'privy' ? 'Embedded Wallet' : 'External Wallet'}
                  </span>
                  {user.wallet.chainId && (
                    <span className="text-xs bg-purple-400/30 px-2 py-1 rounded-full">
                      Chain ID: {user.wallet.chainId}
                    </span>
                  )}
                  {isDeployer !== undefined && (
                    <span className={`text-xs ${isDeployer ? 'bg-green-400/30 text-green-300' : 'bg-purple-400/30'} px-2 py-1 rounded-full`}>
                      {isDeployer ? 'Factory Deployer' : 'Not Deployer'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSignMessage}
                    className="mt-3 bg-purple-500 hover:bg-purple-600 transition-colors px-3 py-1.5 rounded-lg text-sm"
                  >
                    Sign Test Message
                  </button>
                  <button
                    onClick={handleTestTransaction}
                    className="mt-3 bg-purple-500 hover:bg-purple-600 transition-colors px-3 py-1.5 rounded-lg text-sm"
                  >
                    Send Test Transaction
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Section */}
          {user.email && (
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold">Email</h3>
              <p className="font-mono">{user.email.address}</p>
              {user.email.verified && (
                <span className="inline-block mt-1 text-xs bg-green-400/20 text-green-300 px-2 py-1 rounded-full">
                  Verified
                </span>
              )}
            </div>
          )}

          {/* Account Info */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-60">Joined</span>
              <span>{joinedDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="opacity-60">User ID</span>
              <span className="font-mono text-xs">{user.id.slice(0, 16)}...</span>
            </div>
          </div>
        </div>
      </div>
  );
}