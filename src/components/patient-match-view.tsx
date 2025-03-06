"use client";

import { ActionDataPatient, OpeningMatchDataForTel } from "@/types/action";
import { userNameLabel } from "@/util/labels";
import { useState } from "react";
import { H1, Copy, Title } from "./copy";
import { PatientOpeningTile } from "./patient-opening-tile";
import { Tile, TileVariant } from "./tile";
import { Icon } from "./icon";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLine } from "@remixicon/react";
import { ButtonVariant, IconButton } from "./button";

type SelectPatientViewProps = {
  patients: ActionDataPatient[];
  select: (patient: ActionDataPatient) => void;
};

type SelectedPatientViewProps = {
  patient: ActionDataPatient;
  close?: () => void;
};

export type PatientsOpeningsViewProps = {
  action: OpeningMatchDataForTel;
};

const isOnePatient = (action: OpeningMatchDataForTel): boolean => {
  return action.patients.length === 1;
};

const onlyIfOnePatient = (action: OpeningMatchDataForTel): ActionDataPatient | undefined => {
  return isOnePatient(action) ? action.patients[0] : undefined;
};

const SelectPatientView: React.FC<SelectPatientViewProps> = ({ patients, select }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <H1>View Appointments</H1>
      <Copy>Select a name below to view their available openings.</Copy>
    </div>
    <Tile className="flex flex-col gap-2">
      {patients.map((patient, i) => (
        <div key={i} onClick={() => select(patient)} className="cursor-pointer border-b border-outline-soft pb-2">
          <div className="group flex flex-row items-center justify-between rounded-full px-2 py-1 transition-colors hover:bg-primary">
            <div className="flex flex-row items-center gap-2">
              <Title className="transition-colors group-hover:text-primary-contrast">{userNameLabel(patient.firstName, patient.lastName)}</Title>
              {patient.openings.length > 0 ? (
                <div className="flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-primary transition-colors group-hover:bg-primary-contrast">
                  <Copy className="text-primary-contrast transition-colors group-hover:text-primary">{patient.openings.length}</Copy>
                </div>
              ) : null}
            </div>
            <Icon className="transition-colors group-hover:text-primary-contrast" icon={RiArrowRightSLine} />
          </div>
        </div>
      ))}
    </Tile>
  </div>
);

const SelectedPatientView: React.FC<SelectedPatientViewProps> = ({ patient, close }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between">
        <H1>Hello {userNameLabel(patient.firstName, patient.lastName, true)}</H1>
        {close ? (
          <IconButton
            icon={RiCloseLine}
            variant={ButtonVariant.Outlined}
            onClick={close}
            className="p-1"
            _icon={{ className: "w-8 h-8 text-contrast-secondary hover:text-contrast-primary" }}
          />
        ) : null}
      </div>
      {patient.openings.length === 0 ? (
        <Copy className="max-w-xl">
          We don't have any available openings at this time. Rest assured as soon as there is an availability we will send you a text message.
        </Copy>
      ) : (
        <Copy className="max-w-xl">
          We have {patient.openings.length} {patient.openings.length === 1 ? "appointment" : "appointments"} open, take a look to see if any work in
          your schedule and pick the best match.
        </Copy>
      )}
    </div>

    {patient.openings.length === 0 ? (
      <Tile variant={TileVariant.Outlined} className="flex flex-col items-center justify-center border-dashed p-12">
        <Title className="text-center">No Available Appointments</Title>
        <Copy className="text-center">Check back soon for new openings</Copy>
      </Tile>
    ) : (
      <div className="mt-4 flex flex-col gap-2">
        {patient.openings.map((opening, i) => (
          <PatientOpeningTile key={i} opening={opening} />
        ))}
      </div>
    )}
  </div>
);

export const PatientsOpeningsView: React.FC<PatientsOpeningsViewProps> = ({ action }) => {
  const [selectedPatient, setSelectedPatient] = useState<ActionDataPatient | undefined>(onlyIfOnePatient(action));

  const handleSelect = (patient: ActionDataPatient) => {
    setSelectedPatient(patient);
  };

  const handleClose = () => {
    setSelectedPatient(undefined);
  };

  return selectedPatient ? (
    <SelectedPatientView patient={selectedPatient} close={!isOnePatient(action) ? handleClose : undefined} />
  ) : (
    <SelectPatientView patients={action.patients} select={handleSelect} />
  );
};
