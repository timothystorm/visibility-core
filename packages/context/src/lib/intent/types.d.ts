/**
 * Domain contract for system-wide intents
 */

export type DateRangeType = {
  from: Date;
  to: Date;
};

export type SearchType = 'track_id' | 'recipient_city' | 'shipper_reference' | (string & {});

/** Available Monitors **/
export type MonitorType =
  | 'delivered_today'
  | 'exceptions'
  | 'in_transit'
  | 'label_created'
  | 'return_to_shipper'
  | 'tried_to_deliver'
  | 'watch_list'
  | (string & {});

/** Available columns **/
export type ColumnType = 'track_id' | 'status' | 'estimated_delivery' | 'route' | (string & {});

/** Shipment sub-status **/
export type AvailableForPickupSubStatus = 'carrier_pickup_location' | 'retail_partner_location' | (string & {});
export type CancelledSubStatus = 'label_expired' | 'shipper_cancelled' | (string & {});
export type DelayedSubStatus =
  | 'carrier_operations'
  | 'customs_processing'
  | 'held_due_to_payment_required'
  | 'sever_weather'
  | (string & {});
export type DeliveredSubStatus =
  | 'mailroom_reception'
  | 'parcel_locker'
  | 'recipient'
  | 'left_at_doorstep'
  | 'signed_by_recipient'
  | (string & {});
export type ExceptionSubStatus =
  | 'damaged'
  | 'failed_delivery_no_recipient'
  | 'incorrect_address'
  | 'package_refused'
  | 'rerouted'
  | 'restricted_items'
  | 'return_to_sender'
  | 'security_hold'
  | (string & {});
export type InPossessionWithCarrierSubStatus =
  | 'dropped_off_at_carrier_facility'
  | 'picked_up_by_carrier'
  | 'received_after_carrier_cutoff'
  | (string & {});
export type InTransitSubStatus =
  | 'arrived_at_transit_hub'
  | 'at_destination_facility'
  | 'at_origin_facility'
  | 'cleared_customs'
  | 'delivery_option_requested'
  | 'departed_transit_hub'
  | 'processing_at_customs'
  | 'transferred_to_local_carrier'
  | (string & {});
export type LabelCreatedSubStatus =
  | 'label_expiring_soon'
  | 'information_received_by_carrier'
  | 'waiting_for_carrier_pickup'
  | (string & {});
export type OutForDeliverySubStatus = 'business' | 'residential' | (string & {});
