export type CliCommandFlag = {
  short: string;
  long: string;
  description: string;
};

export type CliCommand = {
  name: string;
  description: string;
  usage: string;
  learnMoreLink?: string;
  flags: CliCommandFlag[] | [];
  subCommands?: CliCommand[];
};
