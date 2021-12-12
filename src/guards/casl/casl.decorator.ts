import { SetMetadata } from "@nestjs/common";
import { CaslHandler } from "./casl.guard";

export const CheckAbilities = (...handlers: CaslHandler[]) =>
  SetMetadata('casl-guard', handlers);
