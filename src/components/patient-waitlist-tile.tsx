import { ActionDataWaitlistEntry } from "@/types/action";
import { useNotification } from "@/util/notification";
import { Tile, TileVariant } from "./tile";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProfileImage } from "./profile";
import { phoneNumberLabel } from "@/util/labels";
import { RiMailLine, RiPhoneLine } from "@remixicon/react";
import { Title, Copy } from "./copy";
import { Icon } from "./icon";
import { Button, ButtonVariant } from "./button";
import { closeWaitlistEntryCallable, CloseWaitlistEntryRequest } from "@/lib/callables/action";

export type PatientWaitlistEntryTileProps = {
  actionId: string;
  patientId: string;
  entry: ActionDataWaitlistEntry;
  handleRemoval: (patientId: string, entry: ActionDataWaitlistEntry) => void;
};

export const PatientWaitlistEntryTile: React.FC<PatientWaitlistEntryTileProps> = ({ actionId, patientId, entry, handleRemoval }) => {
  const notification = useNotification();

  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeEntry = () => {
    setClosing(true);

    const request: CloseWaitlistEntryRequest = {
      actionId: actionId,
      patientId: patientId,
      waitlistEntryId: entry.entryId,
    };

    closeWaitlistEntryCallable(request)
      .then(() => {
        setClosed(true);

        notification.success({
          title: "Appointment removed from waitlist",
          message: "If you would like to be added back to the waitlist, please contact the office.",
        });

        // wait for the animation to finish before removing the tile
        setTimeout(() => {
          handleRemoval(patientId, entry);
        }, 500);
      })
      .catch(() => {
        notification.error({
          title: "Failed to confirm appointment availability",
          message: "An error occurred while removing the appointment from the waitlist. Please try again later.",
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 1, height: "auto" }}
      animate={closed ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
      transition={{ duration: 0.5 }}
    >
      <Tile variant={TileVariant.Outlined} className="flex flex-col gap-2 p-0">
        <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
          <ProfileImage
            alt={`${entry.organization.name || "Office"} Profile Image`}
            src={entry.organization.profileImage?.url}
            className="h-10 w-10"
          />
          <div className="flex flex-col gap-2 md:gap-0">
            <Title className="text-center md:text-left">{entry.organization.name}</Title>
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
              {entry.organization.email ? (
                <div className="flex flex-row items-center gap-1">
                  <Icon icon={RiMailLine} className="h-4 w-4" />
                  <Copy>{entry.organization.email}</Copy>
                </div>
              ) : null}
              {entry.organization.phoneNumber ? (
                <div className="flex flex-row items-center gap-1">
                  <Icon icon={RiPhoneLine} className="h-4 w-4" />
                  <Copy>{phoneNumberLabel(entry.organization.phoneNumber)}</Copy>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <Tile variant={TileVariant.Filled} className="flex flex-col gap-6 border-0">
          <Copy>You are currently on the waitlist to replace your appointment on {new Date(entry.datetime._seconds * 1000).toString()}.</Copy>
          <Copy>If you are no longer interested in an earlier appointment, you can remove yourself from the waitlist.</Copy>
          <Button onClick={closeEntry} variant={ButtonVariant.Filled} className="w-full" loading={closing}>
            Remove Appointment
          </Button>
        </Tile>
      </Tile>
    </motion.div>
  );
};
