import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface TileData {
  id: string;
  value: number;
}

interface StatusQueryResult {
  status: TileData[];
}

const STATUS_QUERY = gql`
  query GetStatus {
    status {
      id
      value
    }
  }
`;

export function useTiles(): { tiles: TileData[]; loading: boolean; error: Error | undefined } {
  const { data, loading, error } = useQuery<StatusQueryResult>(STATUS_QUERY);
  return { tiles: data?.status ?? [], loading, error };
}
