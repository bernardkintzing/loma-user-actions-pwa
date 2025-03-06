import { Doc, SimpleTimestamp } from "../database/firestore";
import { AppointmentService } from "./appointment";

export enum OpeningStatus {
  Draft = "draft",
  Open = "open",
  Filled = "filled",
  Closed = "closed",
  Expired = "expired",
}

export enum PatientResponse {
  Waiting = "waiting",
  Approved = "approved",
  Rejected = "rejected",
}

export enum OfficeResponse {
  Waiting = "waiting",
  Approved = "approved",
  Rejected = "rejected",
}

export type OpeningDoc = Doc & {
  duration: number;
  organizationId: string;
  providerId: string;
  status: OpeningStatus;
  services: AppointmentService[];
  readonly archived: boolean;
  datetime: SimpleTimestamp;
  notes?: string;
};

export type OpeningMatchDoc = Doc & {
  patientId: string;
  waitlistEntryId: string;
  priority: number;
  selected: boolean;
  contacted: boolean;
  patientResponse: PatientResponse;
  officeResponse: OfficeResponse;
  notes?: string;
  patientResponseTimestamp?: SimpleTimestamp;
};
