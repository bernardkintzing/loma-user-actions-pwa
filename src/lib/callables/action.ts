import { OpeningMatchDataForTel } from "@/types/action";
import { callable } from "../functions";
import { PatientResponse } from "@/types/docs/opening";

export type GetActionRequest = { actionId: string };
export type RespondToMatchRequest = {
  actionId: string;
  matchId: string;
  openingId: string;
  patientId: string;
  response: PatientResponse.Approved | PatientResponse.Rejected;
};

export type GetActionResponse = { action: OpeningMatchDataForTel | null };
export type RespondToMatchResponse = void;

export const getActionCallable = callable<GetActionRequest, GetActionResponse>("action-getAction");
export const respondToMatchCallable = callable<RespondToMatchRequest, RespondToMatchResponse>("action-respondToMatch");
