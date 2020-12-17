import { SubscriptionTypeConfig } from './subscriptionType';
/**
 * Add one field to the Subscription type
 */
export declare function subscriptionField<FieldName extends string, Event>(fieldName: FieldName, config: SubscriptionTypeConfig<FieldName, Event> | (() => SubscriptionTypeConfig<FieldName, Event>)): import("./extendType").NexusExtendTypeDef<any>;
