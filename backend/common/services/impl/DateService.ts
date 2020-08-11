import IDateService from "../IDateService";
import { injectable } from "inversify";

@injectable()
export default class DateService implements IDateService {
  private readonly _timespanMap = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };

  timespanToSeconds(timespan: string): number {
    let seconds = 0;
    if (timespan) {
      const num = parseInt(timespan, 10);
      const span = timespan.replace(num.toString(), "").trim();
      let multiplier = 1;
      if (span) {
        multiplier = this._timespanMap[span.toLowerCase()];
      }
      seconds = num * multiplier;
    }
    return seconds;
  }
}
