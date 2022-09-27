import { StringEnum } from './utils/types';
export declare const CompositeOperators: StringEnum;
export declare type ECompositeOperator = typeof CompositeOperators[keyof typeof CompositeOperators];
export declare const BlendModes: StringEnum;
export declare type EBlendModes = typeof BlendModes[keyof typeof BlendModes];
export default BlendModes;
