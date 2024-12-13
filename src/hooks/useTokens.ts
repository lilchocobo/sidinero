import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ROUTES } from '../lib/constants';

export type TokenConfig = {
    address: `0x${string}`;
    chainId: number;
    metadata: {
        image: string;
    };
    createdAt: Date;
    updatedAt: Date;
};


export function useTokens() {
    const queryClient = useQueryClient();

    const query = useQuery<TokenConfig[]>({
        queryKey: ['tokens_api'],
        queryFn: async () => {
            const response = await fetch(API_ROUTES.TOKENS);
            const data = await response.json();
            return data as TokenConfig[];
        },
    });

    const addTokenMutation = useMutation({
        mutationFn: async (data: Omit<TokenConfig, 'createdAt' | 'updatedAt' | 'metadata'> & { image: File | null }) => {

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('image', data.image);
            formData.append('address', data.address);
            formData.append('chainId', data.chainId.toString());

            const response = await fetch(API_ROUTES.TOKENS, {
                method: 'POST',
                body: formData, // Remove Content-Type header to let browser set it
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tokens_api'] });
        },
    });

    const updateTokenMutation = useMutation({
        mutationFn: async (token: Partial<TokenConfig> & { address: `0x${string}` }) => {
            const response = await fetch(API_ROUTES.TOKENS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(token),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tokens_api'] });
        },
    });

    return {
        tokens: query.data,
        isLoading: query.isLoading || addTokenMutation.isPending || updateTokenMutation.isPending,
        error: query.error || addTokenMutation.error || updateTokenMutation.error,
        addToken: addTokenMutation.mutate,
        updateToken: updateTokenMutation.mutate,
    };
}
