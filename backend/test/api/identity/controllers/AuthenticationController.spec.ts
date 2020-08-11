import "reflect-metadata";
import sinon = require("sinon");
import expect = require("expect");
import AuthenticationController from "../../../../api/identity/controllers/AuthenticationController";

describe("AuthenticationController", () => {
  let controller: AuthenticationController;

  beforeEach(() => {
    controller = new AuthenticationController();
  });

  describe("login", () => {
    it("should call jwtService", async () => {
      const jwtService = {
        login: () => {},
      };
      const loginStub = sinon.stub(jwtService, "login");
      (controller as any)._jwtService = jwtService;
      const payload: any = { method: "POST" };
      await controller.login(payload);
      expect(loginStub.callCount).toBe(1);
    });
  });

  describe("decrypt", () => {
    it("should call jwtService and httpService", async () => {
      const jwtService = {
        decrypt: () => {},
      };
      const httpService = {
        getBearerToken: () => {},
      };
      const decryptStub = sinon.stub(jwtService, "decrypt");
      const getBearerTokenStub = sinon.stub(httpService, "getBearerToken");
      (controller as any)._jwtService = jwtService;
      (controller as any)._httpService = httpService;
      const payload: any = {};
      await controller.decrypt(payload);
      expect(decryptStub.callCount).toBe(1);
      expect(getBearerTokenStub.callCount).toBe(1);
    });
  });

  describe("isAuthorized", () => {
    it("should call jwtService, httpService and authorisationService", async () => {
      const jwtService = {
        decrypt: () => {},
      };
      const httpService = {
        getBearerToken: () => {},
      };
      const authorisationService = {
        isAllowed: () => {},
      };

      const decryptStub = sinon.stub(jwtService, "decrypt");
      decryptStub.callsFake(() => Promise.resolve({}));

      const getBearerTokenStub = sinon.stub(httpService, "getBearerToken");
      const isAllowedStub = sinon.stub(authorisationService, "isAllowed");

      (controller as any)._jwtService = jwtService;
      (controller as any)._httpService = httpService;
      (controller as any)._authorisationService = authorisationService;

      const payload: any = { method: "POST" };
      await controller.isAuthorized(payload);
      expect(decryptStub.callCount).toBe(1);
      expect(getBearerTokenStub.callCount).toBe(1);
      expect(isAllowedStub.callCount).toBe(1);
    });
  });
});
