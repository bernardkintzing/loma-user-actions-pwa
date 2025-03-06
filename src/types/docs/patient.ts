import { Doc } from "../database/firestore";

export enum PatientDocVariant {
  Dentistry = "dentistry",
}

export type PatientDoc = Doc & {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  organizationId: string;
  variant: PatientDocVariant;
  notes?: string;
  readonly archived: boolean;
};
