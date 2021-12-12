import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppAbility, CaslAbilityFactory } from '../../casl/casl-ability.factory';

export type CaslHandler = (ability: AppAbility, req: Request) => boolean | Promise<boolean>;

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const caslHandlers =
      this.reflector.get<CaslHandler[]>(
        'casl-guard',
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(request.user);

    const results = await Promise.all([
      ...caslHandlers.map(handler => handler(ability, request))
    ])

    return results.every(v => v)
  }
}
