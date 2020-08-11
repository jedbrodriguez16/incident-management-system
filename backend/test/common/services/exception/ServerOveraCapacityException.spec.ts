import expect = require("expect");
import ServerOveraCapacityException from "../../../../common/services/exception/ServerOveraCapacityException";

describe("ServerOveraCapacityException", () => {
  it("should accept message", () => {
    const ex = new ServerOveraCapacityException("hello world");
    expect(ex.message).toBe("hello world");
  });
});
