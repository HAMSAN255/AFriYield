'use client';

import { useEffect, useState, useCallback } from 'react';
import { useStore } from '@/lib/store';

/**
 * Hook to manage wallet connection
 */
export function useWallet() {
  const { user, setUser, resetUser } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const address = accounts[0];

      // Get balance
      const balanceWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      const balance = (parseInt(balanceWei as string) / 1e18).toFixed(4);

      setUser({
        address,
        balance,
        isConnected: true,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [setUser]);

  const disconnectWallet = useCallback(() => {
    resetUser();
  }, [resetUser]);

  // Auto-connect on load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum?.selectedAddress) {
        try {
          await connectWallet();
        } catch (error) {
          console.error('Auto-connect failed:', error);
        }
      }
    };

    checkConnection();
  }, [connectWallet]);

  return {
    address: user.address,
    balance: user.balance,
    isConnected: user.isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };
}

/**
 * Hook to fetch staking data
 */
export function useStakingData() {
  const { staking, setStaking } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchStakingData = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Fetch from contract
      const mockData = {
        totalStaked: '5000000',
        totalRewards: '250000',
        userCount: 1250,
        averageAPY: 275,
      };
      setStaking(mockData);
    } catch (error) {
      console.error('Failed to fetch staking data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setStaking]);

  useEffect(() => {
    fetchStakingData();
    const interval = setInterval(fetchStakingData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [fetchStakingData]);

  return { ...staking, isLoading, refetch: fetchStakingData };
}

/**
 * Hook to fetch protocol statistics
 */
export function useProtocolStats() {
  const { protocol, setProtocol, setError } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Fetch from contract and backend
      const mockStats = {
        tvl: '50000000',
        totalUsers: 5000,
        totalStaked: '5000000',
        averageAPY: 275,
        commissionDistributed: '500000',
        networkStatus: 'connected' as const,
      };
      setProtocol(mockStats);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch protocol stats:', error);
      setError('Failed to load protocol statistics');
      setProtocol({ networkStatus: 'disconnected' });
    } finally {
      setIsLoading(false);
    }
  }, [setProtocol, setError]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { ...protocol, isLoading, refetch: fetchStats };
}

/**
 * Hook to manage staking operations
 */
export function useStaking() {
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const stake = useCallback(
    async (amount: string) => {
      try {
        setIsLoading(true);
        // TODO: Call smart contract
        console.log('Staking', amount, 'AFY');
        
        // Mock success
        setUser({
          stakedAmount: amount,
          totalRewards: '0',
        });
      } catch (error) {
        console.error('Staking failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const unstake = useCallback(
    async (amount: string) => {
      try {
        setIsLoading(true);
        // TODO: Call smart contract
        console.log('Unstaking', amount, 'AFY');
      } catch (error) {
        console.error('Unstaking failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const claimRewards = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Call smart contract
      console.log('Claiming rewards');
    } catch (error) {
      console.error('Claim failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stakedAmount: user.stakedAmount,
    totalRewards: user.totalRewards,
    isLoading,
    stake,
    unstake,
    claimRewards,
  };
}

/**
 * Hook to manage affiliate/referral operations
 */
export function useAffiliate() {
  const { user, setUser } = useStore();
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (user.address) {
      const link = `${window.location.origin}?ref=${user.address}`;
      setReferralLink(link);
    }
  }, [user.address]);

  const copyReferralLink = useCallback(() => {
    navigator.clipboard.writeText(referralLink);
  }, [referralLink]);

  return {
    referrals: user.referrals,
    totalCommissions: user.totalCommissions,
    referralLink,
    copyReferralLink,
  };
}
