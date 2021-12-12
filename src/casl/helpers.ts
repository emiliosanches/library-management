import { Action } from "./actions";
import { AppAbility, Subjects } from "./casl-ability.factory";

type ModelsFromSubjects<Subs> = Exclude<Subs, 'all' | { toJSON: Record<string, any> }>;

export async function canById(ability: AppAbility, action: Action, subject: ModelsFromSubjects<Subjects>, id: string) {
  const subjectInstance: InstanceType<typeof subject> = await subject.findOne(id)

  return ability.can(action, subjectInstance)
}
