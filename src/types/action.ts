import { SimpleTimestamp } from "./database/firestore";
import { StorageFile } from "./database/storage";
import { AppointmentService } from "./docs/appointment";

export type ActionDataProvider = {
  providerId: string;
  firstName?: string;
  lastName?: string;
  profileImage?: StorageFile;
};

export type ActionDataOrganization = {
  organizationId: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: StorageFile;
};

export type ActionDataOpening = {
  openingId: string;
  matchId: string;
  duration: number;
  services: AppointmentService[];
  datetime: SimpleTimestamp;
  matchedTimestamp: SimpleTimestamp;
  provider: ActionDataProvider;
  organization: ActionDataOrganization;
};

export type ActionDataWaitlistEntry = {
  entryId: string;
  datetime: SimpleTimestamp;
  organization: ActionDataOrganization;
};

export type ActionDataPatient = {
  patientId: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  organization: ActionDataOrganization;
  openings: ActionDataOpening[];
  waitlistEntries: ActionDataWaitlistEntry[];
};

export type ManageTelPatientsData = {
  patients: ActionDataPatient[];
};
