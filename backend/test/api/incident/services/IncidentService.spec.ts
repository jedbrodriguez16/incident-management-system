import "reflect-metadata";
import sinon = require("sinon");
import expect = require("expect");
import IncidentService from "../../../../api/incident/services/impl/IncidentService";

describe("IncidentService", () => {
  let service: IncidentService;

  beforeEach(() => {
    service = new IncidentService();
  });

  describe("getIncident", () => {
    it("should call repo", async () => {
      const repository = {
        getById: () => {},
      };
      const getByIdStub = sinon.stub(repository, "getById");
      (service as any)._incidentRepository = repository;
      const payload: any = "id";
      await service.getIncident(payload);
      expect(getByIdStub.callCount).toBe(1);
    });
  });

  describe("getIncidentList", () => {
    it("should call repo", async () => {
      const repository = {
        getList: () => {},
      };
      const getListStub = sinon.stub(repository, "getList");
      (service as any)._incidentRepository = repository;
      const userInfo: any = { groups: ["admin"] };
      await service.getIncidentList(userInfo, "date");
      expect(getListStub.callCount).toBe(1);
    });
  });

  describe("upsertIndicent", () => {
    it("should call repo", async () => {
      const repository = {
        add: () => {},
      };
      const addStub = sinon.stub(repository, "add");
      (service as any)._incidentRepository = repository;
      const payload: any = {};
      await service.upsertIndicent(payload);
      expect(addStub.callCount).toBe(1);
    });
  });

  describe("deleteIncident", () => {
    it("should call repo", async () => {
      const repository = {
        delete: () => {},
      };
      const deleteStub = sinon.stub(repository, "delete");
      (service as any)._incidentRepository = repository;
      const payload: any = "id";
      await service.deleteIncident(payload);
      expect(deleteStub.callCount).toBe(1);
    });
  });
});
