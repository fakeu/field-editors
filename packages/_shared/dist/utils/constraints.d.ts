import { ValidationType } from '../types';
export declare function fromFieldValidations(validations: Record<string, any>[] | undefined, fieldType: 'Symbol' | 'Text'): ValidationType;
export declare function makeChecker(constraint: ValidationType): (length: number) => boolean;
