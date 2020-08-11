import IncidentDto from "./dto/IncidentDto";
import UserInfoDto from "../../../common/services/dto/UserInfoDto";

export default interface IIncidentService {
  getIncidentList(user: UserInfoDto): Promise<IncidentDto[]>;
  getIncident(id: string): Promise<IncidentDto>;
  upsertIndicent(dto: IncidentDto): Promise<IncidentDto>;
  deleteIncident(id: string): Promise<IncidentDto>;
}
