import ItemBase from './ItemBase';
import ConditionItem from './ConditionItem';
import SequenceItem from './SequenceItem';
import Connector from '../Connector';
import IPlan from '../IPlan';
import { GrowthDirection } from './GrowthDirection';
export default class DecisionPointItem extends ItemBase {
    constructor(itemData: any, plan: IPlan, parent: ItemBase);
    readonly yesSequence: SequenceItem;
    readonly noSequence: SequenceItem;
    readonly hasLabel: boolean;
    getParentListener(): ConditionItem;
    getGrowthDirection(): GrowthDirection;
    getLabel(): string;
    computeChildrenOffsets(): void;
    computeXY(parentX: number, parentY: number): void;
    getConnectors(resultArray: Array<Connector>): void;
}
