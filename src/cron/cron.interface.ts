// смысл крона - запуск какого-либо процесса в определенные промежутки времени
export interface ICronService {
  init(): Promise<void>;
}
