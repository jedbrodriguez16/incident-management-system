import expect = require("expect");
import RpcServiceException from "../../../../common/services/exception/RpcServiceException";

describe("RpcServiceException", () => {
  it("should accept message", () => {
    const ex = new RpcServiceException("hello world");
    expect(ex.message).toBe("hello world");
  });
});
