import { Injectable } from "@nestjs/common";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { User } from "src/users/entities/user.entity";
import { Action } from "./actions";

class Test {
  static async findOne(): Promise<Test> {
    return new Test();
  }

  testeProp: string;

  toJSON(): any {

  }
}

export type Subjects = InferSubjects<typeof User | typeof Test, true> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user?: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    can(Action.Read, 'all');
    can(Action.Create, User, { role: 'USER' })

    if (!user) return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
    
    can(Action.Delete, User, { id: user.id })
    can(Action.Update, User, ["password"], { id: user.id })

    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all');
    }

    if (user.role === 'EMPLOYEE') {
      can(Action.Manage, User, { role: 'USER' })
      cannot(Action.Unban, User)
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}
