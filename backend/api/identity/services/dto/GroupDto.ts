import PermissionDto from "./PermissionDto";

export default class GroupDto {
  id: string;
  name: string;
  description: string;
  permissions: PermissionDto[];
  isEnabled: boolean;
}
