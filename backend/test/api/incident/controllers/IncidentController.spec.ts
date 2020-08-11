import "reflect-metadata";
import sinon = require("sinon");
import expect = require("expect");
import IncidentController from "../../../../api/incident/controllers/IncidentController";

describe("IncidentController", () => {
  let controller: IncidentController;

  beforeEach(() => {
    controller = new IncidentController();
  });

  describe("getIncidents", () => {
    it("should call _incidentService.getIncidentList", async () => {
      const _incidentService = {
        getIncidentList: () => {},
      };
      const getIncidentListStub = sinon.stub(
        _incidentService,
        "getIncidentList"
      );
      (controller as any)._incidentService = _incidentService;
      const payload: any = {};
      await controller.getIncidents(payload);
      expect(getIncidentListStub.callCount).toBe(1);
    });
  });

  describe("getIncident", () => {
    it("should call _incidentService.getIncident", async () => {
      const _incidentService = {
        getIncident: () => {},
      };
      const getIncidentStub = sinon.stub(_incidentService, "getIncident");
      (controller as any)._incidentService = _incidentService;
      const payload: any = {};
      await controller.getIncident(payload);
      expect(getIncidentStub.callCount).toBe(1);
    });
  });

  describe("createIncident", () => {
    it("should call _incidentService.upsertIndicent", async () => {
      const _incidentService = {
        upsertIndicent: () => {},
      };
      const upsertIndicentStub = sinon.stub(_incidentService, "upsertIndicent");
      (controller as any)._incidentService = _incidentService;
      const payload: any = { body: {}, userInfo: {} };
      await controller.createIncident(payload);
      expect(upsertIndicentStub.callCount).toBe(1);
    });
  });

  describe("assignIncident", () => {
    it("should call  _incidentService.getIncident & _incidentService.upsertIndicent,", async () => {
      const _incidentService = {
        getIncident: () => {},
        upsertIndicent: () => {},
      };
      const upsertIndicentStub = sinon.stub(_incidentService, "upsertIndicent");
      const getIncidentStub = sinon.stub(_incidentService, "getIncident");
      getIncidentStub.callsFake(() => Promise.resolve({}));

      (controller as any)._incidentService = _incidentService;

      const payload: any = { body: {}, userInfo: {} };
      await controller.assignIncident(payload);
      expect(upsertIndicentStub.callCount).toBe(1);
      expect(getIncidentStub.callCount).toBe(1);
    });
  });

  describe("acknowledgeIncident", () => {
    it("should call  _incidentService.getIncident & _incidentService.upsertIndicent,", async () => {
      const _incidentService = {
        getIncident: () => {},
        upsertIndicent: () => {},
      };
      const upsertIndicentStub = sinon.stub(_incidentService, "upsertIndicent");
      const getIncidentStub = sinon.stub(_incidentService, "getIncident");
      getIncidentStub.callsFake(() => Promise.resolve({}));

      (controller as any)._incidentService = _incidentService;

      const payload: any = { body: {}, userInfo: {} };
      await controller.acknowledgeIncident(payload);
      expect(upsertIndicentStub.callCount).toBe(1);
      expect(getIncidentStub.callCount).toBe(1);
    });
  });

  describe("resolveIncident", () => {
    it("should call  _incidentService.getIncident & _incidentService.upsertIndicent,", async () => {
      const _incidentService = {
        getIncident: () => {},
        upsertIndicent: () => {},
      };
      const upsertIndicentStub = sinon.stub(_incidentService, "upsertIndicent");
      const getIncidentStub = sinon.stub(_incidentService, "getIncident");
      getIncidentStub.callsFake(() => Promise.resolve({}));

      (controller as any)._incidentService = _incidentService;

      const payload: any = { body: {}, userInfo: {} };
      await controller.resolveIncident(payload);
      expect(upsertIndicentStub.callCount).toBe(1);
      expect(getIncidentStub.callCount).toBe(1);
    });
  });

  describe("deleteIncident", () => {
    it("should call _incidentService.deleteIncident", async () => {
      const _incidentService = {
        deleteIncident: () => {},
      };
      const deleteIncidentStub = sinon.stub(_incidentService, "deleteIncident");
      (controller as any)._incidentService = _incidentService;
      const payload: any = {};
      await controller.deleteIncident(payload);
      expect(deleteIncidentStub.callCount).toBe(1);
    });
  });
});
