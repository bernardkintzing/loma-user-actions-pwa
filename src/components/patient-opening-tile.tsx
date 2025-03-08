"use client";

import { ActionDataOpening } from "@/types/action";
import { Tile, TileVariant } from "./tile";
import { Copy, Title } from "./copy";
import { durationLabel, expandedDateString, phoneNumberLabel, userNameLabel } from "@/util/labels";
import { ProfileImage } from "./profile";
import { RiMailLine, RiPhoneLine } from "@remixicon/react";
import { Icon } from "./icon";
import { Button, ButtonVariant } from "./button";
import { DetailListItem } from "./detail-list-item";
import { useState } from "react";
import { respondToMatchCallable, RespondToMatchRequest } from "@/lib/callables/action";
import { PatientResponse } from "@/types/docs/opening";
import { useNotification } from "@/util/notification";
import { motion } from "framer-motion";

export type PatientOpeningTileProps = {
  actionId: string;
  patientId: string;
  opening: ActionDataOpening;
  handleReject: (patientId: string, opening: ActionDataOpening) => void;
};

export const PatientOpeningTile: React.FC<PatientOpeningTileProps> = ({ actionId, patientId, opening, handleReject }) => {
  const notification = useNotification();

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const respondToMatch = (response: PatientResponse.Approved | PatientResponse.Rejected) => {
    const request: RespondToMatchRequest = {
      actionId: actionId,
      patientId: patientId,
      openingId: opening.openingId,
      matchId: opening.matchId,
      response: response,
    };

    return respondToMatchCallable(request);
  };

  const acceptMatch = () => {
    setAccepting(true);

    respondToMatch(PatientResponse.Approved)
      .then(() => {
        setAccepted(true);

        notification.success({
          title: "Appointment availability confirmed",
          message: `You will receive a follow-up message once ${opening.organization.name || "the office"} confirms the appointment.`,
        });
      })
      .catch(() => {
        notification.error({
          title: "Failed to confirm appointment availability",
          message: `An error occurred while confirming your availability. Please try again later.`,
        });
      })
      .finally(() => {
        setAccepting(false);
      });
  };

  const rejectMatch = () => {
    setRejecting(true);

    respondToMatch(PatientResponse.Rejected)
      .then(() => {
        setRejected(true);

        notification.success({
          title: "Appointment availability rejected",
          message: `Thank you for letting ${opening.organization.name || "the office"} know you are not available for the appointment.`,
        });

        // wait for the animation to finish before removing the tile
        setTimeout(() => {
          handleReject(patientId, opening);
        }, 500);
      })
      .catch(() => {
        notification.error({
          title: "Failed to confirm appointment availability",
          message: `An error occurred while confirming your availability. Please try again later.`,
        });
      })
      .finally(() => {
        setRejecting(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 1, height: "auto" }}
      animate={rejected ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
      transition={{ duration: 0.5 }}
    >
      <Tile variant={TileVariant.Outlined} className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-4 p-4">
          <ProfileImage
            alt={`${opening.organization.name || "Office"} Profile Image`}
            src={opening.organization.profileImage?.url}
            className="h-10 w-10"
          />
          <div className="flex flex-col">
            <Title>{opening.organization.name}</Title>
            <div className="flex flex-row items-center gap-4">
              {opening.organization.email ? (
                <div className="flex flex-row items-center gap-1">
                  <Icon icon={RiMailLine} className="h-4 w-4" />
                  <Copy>{opening.organization.email}</Copy>
                </div>
              ) : null}
              {opening.organization.phoneNumber ? (
                <div className="flex flex-row items-center gap-1">
                  <Icon icon={RiPhoneLine} className="h-4 w-4" />
                  <Copy>{phoneNumberLabel(opening.organization.phoneNumber)}</Copy>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Tile variant={TileVariant.Filled} className="flex flex-col gap-6 border-0">
          <Tile className="flex flex-col gap-2 py-0 shadow-none">
            <DetailListItem label="Date" item={expandedDateString(opening.datetime)} />
            <DetailListItem label="Duration" item={durationLabel(opening.duration)} />
            <DetailListItem
              label="Provider"
              item={
                <div className="flex flex-row items-center gap-2">
                  <ProfileImage
                    alt={`${userNameLabel(opening.provider.firstName, opening.provider.lastName)} Profile Image`}
                    src={opening.provider.profileImage?.url}
                    className="h-6 w-6"
                  />
                  <Copy>{userNameLabel(opening.provider.firstName, opening.provider.lastName)}</Copy>
                </div>
              }
            />
          </Tile>
          {!accepted ? (
            <div className="flex flex-col gap-2">
              <Button onClick={acceptMatch} variant={ButtonVariant.Filled} className="w-full" loading={accepting}>
                Confirm Availability
              </Button>
              <Button onClick={rejectMatch} variant={ButtonVariant.Plain} loading={rejecting} className="w-full">
                I&#39;m not available
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="min-h-8 w-full min-w-8 rounded-full border border-solid border-outline-soft bg-primary px-6 py-2 text-center text-primary-tone">
                <Copy className="text-center text-primary-contrast">Availability Confirmed</Copy>
              </div>
              <Copy className="max-w-lg text-center">You will receive a follow-up message once the office confirms the appointment.</Copy>
            </div>
          )}
        </Tile>
      </Tile>
    </motion.div>
  );
};
