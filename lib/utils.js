"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function groupByKeys(items) {
    return items.reduce((sum, x) => {
        for (const [keyName, value] of Object.entries(x)) {
            if (!(keyName in sum))
                sum[keyName] = [];
            if (Array.isArray(value))
                sum[keyName].push(...value);
            else
                sum[keyName].push(value);
        }
        ;
        return sum;
    }, {});
}
exports.groupByKeys = groupByKeys;
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
function groupEveryKeyByKeys(item) {
    return Object.entries(item).reduce((sum, [key, value]) => Object.assign(sum, { [key]: groupByKeys(value) }), {});
}
exports.groupEveryKeyByKeys = groupEveryKeyByKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxxQkFBd0MsS0FBeUI7SUFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFzQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzlELEdBQUcsQ0FBQSxDQUFDLE1BQU0sQ0FBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDbEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDaEMsSUFBSTtnQkFDQSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFBQSxDQUFDO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUM7QUFaRCxrQ0FZQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCw2QkFBZ0QsSUFBMkM7SUFDdkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUUsR0FBRyxFQUFFLEtBQUssQ0FBRSxFQUFFLEVBQUUsQ0FDdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhELGtEQUdDIn0=