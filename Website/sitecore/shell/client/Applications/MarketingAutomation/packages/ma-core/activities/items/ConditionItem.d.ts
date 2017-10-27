import ItemBase from './ItemBase';
import SequenceItem from './SequenceItem';
import Connector from '../Connector';
import IPlan from '../IPlan';
import { TranslateService } from '@ngx-translate/core';
export default class ConditionItem extends ItemBase {
    protected translate: TranslateService;
    private labelYes;
    private labelNo;
    constructor(itemData: any, root: IPlan, parent: ItemBase);
    readonly yesSequence: SequenceItem;
    readonly noSequence: SequenceItem;
    readonly hasLabel: boolean;
    readonly leftHalfWidth: number;
    readonly rightHalfWidth: number;
    readonly hasDecisionPoint: boolean;
    readonly headerLength: number;
    getLabel(): string;
    computeChildrenOffsets(): void;
    computeXY(parentX: number, parentY: number): void;
    getConnectors(resultArray: Array<Connector>): void;
    setVisual(domElement: HTMLElement): void;
}
