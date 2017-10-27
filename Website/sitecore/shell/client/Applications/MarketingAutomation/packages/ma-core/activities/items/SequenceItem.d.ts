import ItemBase from './ItemBase';
import IPlan from '../IPlan';
import { GrowthDirection } from './GrowthDirection';
export default class SequenceItem extends ItemBase {
    constructor(itemData: any, root: IPlan, parent?: ItemBase);
    readonly hasVisual: boolean;
    readonly hasDecisionPoint: boolean;
    getGrowthDirection(): GrowthDirection;
    computeChildrenOffsets(): void;
    getConnectors(resultArray: any): void;
    getInserts(resultArray: any): void;
}
