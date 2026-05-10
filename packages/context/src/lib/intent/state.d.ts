import {
  RecipientInformationFilter,
  SearchFilter,
  ShipmentInformationFilter,
  ShipmentStatusFilter,
  ShipperInformationFilter,
} from './filter';
import { ColumnType, MonitorType } from './types';

/**
 * State of columns shows in sequence, with optional ordering (asc/desc). Implementation ensures that only
 * 1 column as order assigned.
 */
export type ColumnState = { id: ColumnType; order?: 'asc' | 'desc' }[];

/**
 * State of filters currently active
 */
export type FiltersState = {
  status?: ShipmentStatusFilter[];
  shipment?: ShipmentInformationFilter[];
  shipper?: ShipperInformationFilter[];
  recipient?: RecipientInformationFilter[];
};

/**
 * State of the monitors, which monitors are enabled and which one is active (if any)
 */
export type MonitorState = {
  enabled: MonitorType[];
  activeMonitor: MonitorType | null;
};

/**
 * Global application state
 */
export type State = {
  monitorState: MonitorState;
  filterState: FiltersState;
  columnState: ColumnState;
  searchState: SearchFilter | null;
};
