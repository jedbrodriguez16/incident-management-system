import expect = require("expect");
import AuthenticationFailedException from "../../../../common/exception/AuthenticationFailedException";

describe("AuthenticationFailedException", () => {
  it("should return status code 401", () => {
    const ex = new AuthenticationFailedException();
    expect(ex.getStatus()).toBe(401);
  });
});
