// launching a process at certain intervals
export interface ICronService {
  init(): Promise<void>;
}
