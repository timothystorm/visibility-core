import { ApolloProvider } from '@apollo/client/react';
import { ReactElement } from 'react';
import { apolloClient } from '../../services/apollo.client';
import { useTiles } from '../../services/tile.service';
import styles from './TileGroup.module.css';
import Tile from './Tile';

function TileList(): ReactElement {
  const { tiles, loading, error } = useTiles();

  if (loading) return <p className={styles.message}>Loading…</p>;
  if (error)   return <p className={styles.message}>Failed to load status.</p>;

  return (
    <>
      {tiles.map((tile) => (
        <Tile key={tile.id} id={tile.id} value={tile.value} />
      ))}
    </>
  );
}

export default function TileGroup(): ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      <div className={styles.group}>
        <TileList />
      </div>
    </ApolloProvider>
  );
}
