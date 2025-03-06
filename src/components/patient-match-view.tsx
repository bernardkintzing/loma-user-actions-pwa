"use client";

import React, { useRef, useState } from "react";
import { Copy, H1, Subtitle, Title } from "./copy";
import { classFilter } from "@/util/tailwind";
import { Tile, TileVariant } from "./tile";
import { ActionDataPatient, OpeningMatchDataForTel } from "@/types/action";
import { PatientOpeningTile } from "./patient-opening-tile";
import { userNameLabel } from "@/util/labels";
import { ButtonVariant, IconButton } from "./button";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

type PatientOpeningColumnProps = {
  patient: ActionDataPatient;
};

export type PatientsOpeningsViewProps = {
  action: OpeningMatchDataForTel;
};

const PatientOpeningColumn: React.FC<PatientOpeningColumnProps> = ({ patient }) => {
  return (
    <div className="box-border flex max-h-screen flex-col overflow-scroll p-4">
      <H1>Hello {userNameLabel(patient.firstName, patient.lastName, true)}</H1>
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
};

export const PatientsOpeningsView: React.FC<PatientsOpeningsViewProps> = ({ action }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : action.patients.length - 1;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
      }
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < action.patients.length - 1 ? prevIndex + 1 : 0;
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
      }
      return newIndex;
    });
  };
  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="flex w-full overflow-visible transition-transform">
        {action.patients.map((patient, i) => (
          <div key={i} className={classFilter("w-full flex-shrink-0 transition-all", i === currentIndex ? "opacity-100" : "scale-75 opacity-50")}>
            <PatientOpeningColumn patient={patient} />
          </div>
        ))}
      </div>
      <IconButton
        onClick={handlePrev}
        icon={RiArrowLeftSLine}
        variant={ButtonVariant.Outlined}
        className={classFilter("absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2", currentIndex === 0 && "pointer-events-none opacity-10")}
      />
      <IconButton
        onClick={handleNext}
        icon={RiArrowRightSLine}
        variant={ButtonVariant.Outlined}
        className={classFilter(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-12",
          currentIndex === action.patients.length - 1 && "pointer-events-none opacity-10",
        )}
      />
    </div>
  );
};
