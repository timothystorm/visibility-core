import { ReactElement } from 'react';
import styles from './Tile.module.css';

export interface TileProps {
  id: string;
  value: number;
}

const ICONS: Record<string, string> = {
  EXCEPTION: '⚠️',
  DELIVERED: '✅',
  IN_TRANSIT: '🚚',
  OUT_FOR_DELIVERY: '📦',
  PENDING: '🕐',
  RETURNED: '↩️',
  CANCELLED: '❌',
  FAILED: '🔴',
  PICKUP: '🏪',
  HELD: '⏸️',
};

const DEFAULT_ICON = '📋';

function label(id: string): string {
  return id
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export default function Tile({ id, value }: TileProps): ReactElement {
  return (
    <div className={`${styles.tile}}`}>
      <span className={styles.icon} role="img" aria-label={id}>
        {ICONS[id] ?? DEFAULT_ICON}
      </span>
      <div className={styles.content}>
        <span className={styles.label}>{label(id)}</span>
        <span className={styles.value}>{value.toLocaleString()}</span>
      </div>
    </div>
  );
}
