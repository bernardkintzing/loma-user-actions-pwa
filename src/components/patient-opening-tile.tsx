import { ActionDataOpening } from "@/types/action";
import { Tile, TileVariant } from "./tile";
import { Copy, Title } from "./copy";
import { durationLabel, expandedDateString, phoneNumberLabel, userNameLabel } from "@/util/labels";
import { ProfileImage } from "./profile";
import { RiMailLine, RiPhoneLine } from "@remixicon/react";
import { Icon } from "./icon";
import { Button, ButtonVariant } from "./button";
import { DetailListItem } from "./detail-list-item";

export type PatientOpeningTileProps = {
  opening: ActionDataOpening;
};

export const PatientOpeningTile: React.FC<PatientOpeningTileProps> = ({ opening }) => {
  return (
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
        <Tile className="flex flex-col gap-2 shadow-none py-0">
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
        <Button variant={ButtonVariant.Filled} className="w-full" large>
          Confirm Availability
        </Button>
        <Copy className="text-center text-contrast-tertiary text-sm cursor-pointer">I'm not available</Copy>
      </Tile>
    </Tile>
  );
};
