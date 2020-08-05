export class CreateIncidentRequest {
  title: string;
  description: string;
}

export class AssignIncidentRequest {
  incidentId: string;
  username: string;
}

export class AcknowledgeIncidentRequest {
  incidentId: string;
}

export class ResolveIncidentRequest {
  incidentId: string;
  resolutionComment: string;
}
