import {
  DateRangeType,
  DeliveredSubStatus,
  InTransitSubStatus,
  LabelCreatedSubStatus,
  OutForDeliverySubStatus,
  SearchType,
} from './types';

export type ShipmentStatusFilter =
  | { category: 'watch_list' }
  | { category: 'available_for_pickup'; subStatus?: AvailableForPickupSubStatus[] }
  | { category: 'cancelled'; subStatus?: CancelledSubStatus[] }
  | { category: 'delayed'; subStatus?: DelayedSubStatus[] }
  | { category: 'delivered'; subStatus?: DeliveredSubStatus[] }
  | { category: 'exceptions'; subStatus?: ExceptionSubStatus[] }
  | { category: 'in_possession_with_carrier'; subStatus?: InPossessionWithCarrierSubStatus[] }
  | { category: 'in_transit'; subStatus?: InTransitSubStatus[] }
  | { category: 'label_created'; subStatus?: LabelCreatedSubStatus[] }
  | { category: 'out_for_delivery'; subStatus?: OutForDeliverySubStatus[] };

export type ShipmentInformationFilter = {
  accountNumbers?: string[];
  commitDate?: DateRangeType;
  deliveryDate?: DateRangeType;
  estimatedDeliveryDate?: DateRangeType;
  gpsDeliveryLocation?: boolean;
  invoiceNumbers?: string[];
  attemptedDeliveries?: number[];
  serviceTypes?: string[];
  shipDate?: DateRangeType;
  shipperReferences?: string[];
  signatureAvailable?: boolean;
  tenderedDate?: DateRangeType;
};

export type PartyFilters = {
  city?: string[];
  countryTerritory?: string[];
  postalCode?: string[];
  stateProvince?: string[];
  company?: string[];
  name?: string[];
};

export type ShipperInformationFilter = PartyFilters;
export type RecipientInformationFilter = PartyFilters & {
  receivedBy?: string[];
};

export type SearchFilter = { category: SearchType; term: string };
