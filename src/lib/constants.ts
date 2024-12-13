import { blast, blastSepolia } from "viem/chains";

const BASE_API_URL = 'https://yesmoneyapi.vercel.app';
// const BASE_API_URL_LOCAL = 'http://localhost:3000';

export const API_ROUTES = {
    TOKENS: `${BASE_API_URL}/api/tokens`
}

interface ChainContracts {
    BTokenFactory: `0x${string}`;
    ReserveAsset: `0x${string}`;
    // Add other contract addresses as needed
}

export const CONTRACTS: Record<string, ChainContracts> = {
    [blastSepolia.id]: {
        BTokenFactory: '0x84295A0Cf0b25c6E0e80f4369E9f5741F93BE5FA' as `0x${string}`,
        ReserveAsset: '0x9EC3c936B6d5eD6AAb6Ed7E3176fd44bCf3907EA' as `0x${string}`,
    },
    [blast.id]: {
        BTokenFactory: '0x84295A0Cf0b25c6E0e80f4369E9f5741F93BE5FA' as `0x${string}`,
        ReserveAsset: '0x9EC3c936B6d5eD6AAb6Ed7E3176fd44bCf3907EA' as `0x${string}`,
    },
    // Add other chains as needed
};

