import { Adapter, MRActions, MROpts } from 'contentful-management';
import { Except, PartialDeep } from 'type-fest';
declare type Options<ET extends keyof MRActions, A extends keyof MRActions[ET]> = Except<MROpts<ET, A>, 'entityType' | 'action'>;
declare type Params<ET extends keyof MRActions, A extends keyof MRActions[ET]> = 'params' extends keyof Options<ET, A> ? Options<ET, A>['params'] : {};
declare type Return<ET extends keyof MRActions, Action extends keyof MRActions[ET]> = 'return' extends keyof MRActions[ET][Action] ? Promise<PartialDeep<MRActions[ET][Action]['return']>> : never;
declare type Overrides = PartialDeep<{
    [EntityType in keyof MRActions]: {
        [Action in keyof MRActions[EntityType]]: (params: Params<EntityType, Action>) => Return<EntityType, Action>;
    };
}>;
export declare function createFakeCMAAdapter(overrides?: Overrides): Adapter;
export {};
