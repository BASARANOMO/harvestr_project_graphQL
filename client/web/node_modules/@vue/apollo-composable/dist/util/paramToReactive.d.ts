import { Ref } from 'vue-demi';
import { ReactiveFunction } from './ReactiveFunction';
export declare function paramToReactive<T extends object>(param: T | Ref<T> | ReactiveFunction<T>): T | Ref<T>;
