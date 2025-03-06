import { OpeningMatchDataForTel } from "@/types/action";
import { callable } from "../functions";

export type GetActionRequest = { actionId: string };

export type GetActionResponse = { action: OpeningMatchDataForTel | null };

export const getActionCallable = callable<GetActionRequest, GetActionResponse>("action-getAction");
