export interface ConfigInterface {
  key: ConfigKey;
  value: string;
}

export enum ConfigKey {
  none = "NONE",
  assignmentMode = "ASSIGNMENT_MODE",
}
