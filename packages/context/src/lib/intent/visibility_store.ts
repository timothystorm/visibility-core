import { State } from './state';
import {
  RecipientInformationFilter,
  SearchFilter,
  ShipmentInformationFilter,
  ShipmentStatusFilter,
  ShipperInformationFilter,
} from './filter';
import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MonitorType } from './types';

/**
 * Actions that can be performed on the global state, such as updating filters, changing active monitor, etc. Each
 * action is a function that takes necessary parameters and returns void (or a promise if async). The implementation of
 * these actions will handle the logic of updating the state accordingly.
 */
type Actions = {
  /**
   * set the active (clicked on) monitor.
   * @param monitor - monitor to activate or null to turn off active monitor
   */
  setActiveMonitor(monitor: MonitorType | null): void;

  /**
   * set which monitors are to be rendered
   * @param monitors - to be enabled/shown
   * @return previous enabled monitors
   */
  setEnabledMonitors(...monitors: MonitorType[]): void;

  /**
   * set which shipment status filters that should be active
   * @param filters - to activate, or empty if none are to be activated
   */
  setShipmentStatusFilters(...filters: ShipmentStatusFilter[]): void;

  /**
   * set which shipment information filters that should be active
   * @param filters - to activate, or empty if none are to be activated
   */
  setShipmentInfoFilters(...filters: ShipmentInformationFilter[]): void;

  /**
   * set which shipper information filters that should be active
   * @param filters - to activate, or empty if none are to be activated
   */
  setShipperInformationFilters(...filters: ShipperInformationFilter[]): void;

  /**
   * set which recipient information filters that should be active
   * @param filters - to activate, or empty if none are to be activated
   */
  setRecipientInformationFilters(...filters: RecipientInformationFilter[]): void;

  /**
   * set the search term the user has entered
   * @param search - search filter to be activated
   */
  setSearch(search: SearchFilter): void;

  /**
   * Clear the search term the user has entered, resetting it to an empty state.
   */
  clearSearch(): void;

  /**
   * Clear all filters
   */
  clearFilters(): void;

  /**
   * Clears the active monitor and any associated filters
   */
  clearActiveMonitor(): void;
};

/**
 * Internal utility methods not intended for external use. Prefixed with `_` to signal private intent.  These utilites
 * should have no side effects and not chaining of actions
 */
type Utils = {
  /**
   * !! Intended for testing purposes only !!
   * @param state - to set the store into
   */
  _setState(state: State): void;
  _setActiveMonitor(monitor: MonitorType | null): void;
  _setStatusFilters(...filters: ShipmentStatusFilter[]): void;
  _setShipmentInfoFilters(...filters: ShipmentInformationFilter[]): void;
  _setShipperInfoFilters(...filters: ShipperInformationFilter[]): void;
  _setRecipientInfoFilters(...filters: RecipientInformationFilter[]): void;
};

type Store = State & Actions & Utils;

export const VisibilityStore = create<Store>()(
  persist(
    (set, get) => ({
      // ---------- state ----------
      monitorState: {
        enabled: [],
        activeMonitor: null,
      },
      filterState: {},
      columnState: [{ id: 'track_id' }, { id: 'status' }, { id: 'estimated_delivery' }, { id: 'route' }],
      searchState: null,

      // ---------- utils ----------
      _setState(state: State): void {
        set(() => state);
      },

      _setActiveMonitor: (monitor: MonitorType | null): void => {
        set((state) => ({ monitorState: { ...state.monitorState, activeMonitor: monitor } }));
      },

      _setStatusFilters(...filters: ShipmentStatusFilter[]): void {
        set((state) => ({ filterState: { ...state.filterState, status: filters } }));
      },

      _setShipmentInfoFilters(...filters: ShipmentInformationFilter[]): void {
        set((state) => ({ filterState: { ...state.filterState, shipment: filters } }));
      },

      _setShipperInfoFilters(...filters: ShipperInformationFilter[]): void {
        set((state) => ({ filterState: { ...state.filterState, shipper: filters } }));
      },

      _setRecipientInfoFilters(...filters: RecipientInformationFilter[]): void {
        set((state) => ({ filterState: { ...state.filterState, recipient: filters } }));
      },

      // ---------- action ----------
      clearSearch(): void {
        set(() => ({ searchState: null }));
      },

      clearActiveMonitor(): void {
        get()._setActiveMonitor(null);
        get().clearFilters();
      },

      setActiveMonitor(
        monitor: MonitorType | null,
        filters?: {
          statusFilters?: ShipmentStatusFilter[];
          shipmentInfoFilters?: ShipmentInformationFilter[];
          shipperInfoFilters?: ShipperInformationFilter[];
          recipientInfoFilters?: RecipientInformationFilter[];
        },
      ): void {
        if (monitor) {
          get()._setStatusFilters(...(filters?.statusFilters ?? []));
          get()._setShipmentInfoFilters(...(filters?.shipmentInfoFilters ?? []));
          get().setShipperInformationFilters(...(filters?.shipperInfoFilters ?? []));
          get().setRecipientInformationFilters(...(filters?.recipientInfoFilters ?? []));
        } else {
          get().clearFilters();
        }
        get()._setActiveMonitor(monitor);
      },

      setEnabledMonitors(...enabled): void {
        const activeMonitor = get().monitorState?.activeMonitor;
        if (activeMonitor && !enabled?.includes(activeMonitor)) get()._setActiveMonitor(null);
        set(() => ({ monitorState: { ...get().monitorState, enabled: enabled } }));
      },

      setSearch(search: SearchFilter): void {
        set(() => ({ searchState: search }));
      },

      setRecipientInformationFilters(...filters: RecipientInformationFilter[]): void {
        get().setActiveMonitor(null);
        get()._setRecipientInfoFilters(...filters);
      },

      setShipmentInfoFilters(...filters: ShipmentInformationFilter[]): void {
        get().setActiveMonitor(null);
        get()._setShipmentInfoFilters(...filters);
      },

      setShipmentStatusFilters(...filters): void {
        get().setActiveMonitor(null);
        get()._setStatusFilters(...filters);
      },

      setShipperInformationFilters(...filters: ShipperInformationFilter[]): void {
        get().setActiveMonitor(null);
        get()._setShipperInfoFilters(...filters);
      },

      clearFilters(): void {
        get().setActiveMonitor(null);
        set(() => ({ filterState: {} }));
      },
    }),
    {
      name: 'visibility-intent-store',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    },
  ),
);
