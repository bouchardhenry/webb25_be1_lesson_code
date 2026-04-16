import { describe, it, expect } from "vitest";
import User from "../models/User.js"

describe("User Model", () => {
  it("ska hasha password före save", async () => {
    const user = await User.create({
      name: "test",
      email: "test@test.com",
      password: "123456"
    });

    expect(user.password).not.toBe("123456");
    expect(user.password.length).toBeGreaterThan(20);
  });

  it("ska inte returnera password vid vanlig find", async () => {
    await User.create({
      name: "test",
      email: "test@test.com",
      password: "123456"
    });

    const found = await User.findOne({ email: "test@test.com" });

    expect(found.password).toBeUndefined();
  });

  it("ska sätta role till user som default", async () => {
    const user = await User.create({
      name: "test",
      email: "test@test.com",
      password: "123456"
    });

    expect(user.role).toBe("user");
  });
});
