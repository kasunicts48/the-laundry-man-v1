export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface LocationInfo {
  address: string;
  city: string;
  postcode: string;
  instructions: string;
}

export interface ServiceInfo {
  type: string;
  volume: string;
  notes: string;
}

export interface ScheduleInfo {
  collectionDate: string;
  collectionTime: string;
}

export interface BookingPayload {
  customer: CustomerInfo;
  location: LocationInfo;
  service: ServiceInfo;
  schedule: ScheduleInfo;
  metadata: {
    sourceUrl: string;
    submittedAt: string;
  };
}
