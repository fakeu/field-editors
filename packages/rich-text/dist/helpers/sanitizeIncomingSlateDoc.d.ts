import { Node } from '../internal/types';
/**
 * Ensures all nodes have a child leaf text element. This should be handled by
 * Slate but its behavior has proven to be buggy and unpredictable.
 */
export declare function sanitizeIncomingSlateDoc(nodes?: Node[]): Node[];
