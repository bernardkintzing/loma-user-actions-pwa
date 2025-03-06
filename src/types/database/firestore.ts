export type SimpleTimestamp = { _seconds: number; _nanoseconds: number };

export type Doc = {
  id: string;
  readonly [FieldKey.Created]?: SimpleTimestamp;
  readonly [FieldKey.Updated]?: SimpleTimestamp;
};

export enum FieldKey {
  Created = "_created",
  Updated = "_updated",
}
