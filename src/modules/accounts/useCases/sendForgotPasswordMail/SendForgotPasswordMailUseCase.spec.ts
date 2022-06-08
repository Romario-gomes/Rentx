/* global spyOn */
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

describe("Send forgot Mail", () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let mailProvider: MailProviderInMemory;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });
  it("Should be able to  send forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      name: "user",
      driver_license: "ABC-1234",
      email: "users@email.com",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("users@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("users@email.com"),
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users token", async () => {
    const gerenateToken = spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      name: "user",
      driver_license: "ABC-1234",
      email: "users@email.com",
      password: "123456",
    });

    await sendForgotPasswordMailUseCase.execute("users@email.com");

    expect(gerenateToken).toHaveBeenCalled();
  });
});
