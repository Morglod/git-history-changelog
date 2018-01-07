export declare type GroupByKeysIn<T> = {
    [keyName: string]: T;
};
export declare type GroupByKeysOut<T> = {
    [keyName: string]: T[];
};
/**
 * group item's values by it's key
 * eg:
 * ```js
 * const from = [
 *     { a: 1, b: [ 'z' ] },
 *     { a: 2, b: [ 'z' ] },
 *     { a: [ 3, 4 ] }
 * ]
 * to = groupByKeys(from);
 * to === {
 *     a: [ 1, 2, 3, 4],
 *     b: [ 'z', 'z' ]
 * }
 * ```
 */
export declare function groupByKeys<T = string>(items: GroupByKeysIn<T>[]): GroupByKeysOut<T>;
/**
 * ```js
 * {
 *      x: [
 *          { a: 1, b: 2 },
 *          { a: 3, b: 4 }
 *      ],
 *      y: [
 *          { a: 5, b: 6 },
 *          { a: 7, b: 8 }
 *      ]
 * }
 * // to
 * {
 *      x: {
 *          a: [ 1, 3 ],
 *          b: [ 2 , 4 ]
 *      }
 *      y: {
 *          a: [ 5, 7 ],
 *          b: [ 6 , 8 ]
 *      }
 * }
 * ```
 */
export declare function groupEveryKeyByKeys<T = string>(item: {
    [key: string]: GroupByKeysIn<T>[];
}): {
    [key: string]: GroupByKeysOut<T>;
};
