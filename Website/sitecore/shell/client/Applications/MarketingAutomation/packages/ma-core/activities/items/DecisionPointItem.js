var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ItemBase from './ItemBase';
import ConditionItem from './ConditionItem';
import Connector from '../Connector';
import { GrowthDirection } from './GrowthDirection';
import { LINE_RADIUS, DECISION_POINT_HSPACING, DECISION_POINT_HEADER_SIZE, } from '../constants';
var DecisionPointItem = (function (_super) {
    __extends(DecisionPointItem, _super);
    function DecisionPointItem(itemData, plan, parent) {
        var _this = _super.call(this, itemData, plan, parent) || this;
        if (_this.children) {
            _this.children = [_this.yesSequence, _this.noSequence];
        }
        return _this;
    }
    Object.defineProperty(DecisionPointItem.prototype, "yesSequence", {
        get: function () {
            return this.children.find(function (item) { return item.params.pathKey === 'true'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecisionPointItem.prototype, "noSequence", {
        get: function () {
            return this.children.find(function (item) { return item.params.pathKey === 'false'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecisionPointItem.prototype, "hasLabel", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DecisionPointItem.prototype.getParentListener = function () {
        var parentListener = this.parent;
        while (!(parentListener instanceof ConditionItem)) {
            parentListener = parentListener.parent;
        }
        return parentListener;
    };
    DecisionPointItem.prototype.getGrowthDirection = function () {
        var grandParentItem = this.parent.parent;
        if (grandParentItem instanceof DecisionPointItem) {
            return grandParentItem.getGrowthDirection();
        }
        else if (grandParentItem instanceof ConditionItem) {
            return this.parent.params.pathKey === 'false' ? GrowthDirection.left : GrowthDirection.right;
        }
    };
    DecisionPointItem.prototype.getLabel = function () {
        var growthDirection = GrowthDirection[this.getGrowthDirection()];
        var directionCssClass = "grow-to-" + growthDirection;
        var cssClasses = "labels decision-point " + directionCssClass;
        return "<div class=\"" + cssClasses + "\">\n            <div class=\"label label-yes\">Yes</div>\n            <div class=\"label label-no\">No</div>\n        </div>";
    };
    DecisionPointItem.prototype.computeChildrenOffsets = function () {
        var sign = this.getGrowthDirection() === GrowthDirection.left ? -1 : 1;
        var offsetY = this.visual.height + DECISION_POINT_HEADER_SIZE;
        var yesSequence = this.yesSequence;
        var noSequence = this.noSequence;
        yesSequence.position.offsetX = 0;
        yesSequence.position.offsetY = offsetY;
        if (noSequence.hasDecisionPoint) {
            var childDecisionPoint = noSequence.children[0];
            if (sign > 0) {
                noSequence.position.offsetX = yesSequence.position.width + DECISION_POINT_HSPACING;
            }
            else {
                noSequence.position.offsetX = -childDecisionPoint.yesSequence.position.width - DECISION_POINT_HSPACING;
            }
        }
        else {
            if (sign > 0) {
                noSequence.position.offsetX = yesSequence.position.width + DECISION_POINT_HSPACING;
            }
            else {
                noSequence.position.offsetX = -noSequence.position.width - DECISION_POINT_HSPACING;
            }
        }
        noSequence.position.offsetY = noSequence.hasDecisionPoint ? 0 : offsetY;
        var yesSequencePathHeight = this.visual.height + yesSequence.position.height;
        var height = noSequence.hasDecisionPoint ? Math.max(yesSequencePathHeight, noSequence.position.height) :
            this.visual.height + Math.max(yesSequence.position.height, noSequence.position.height);
        var width = yesSequence.position.width + DECISION_POINT_HSPACING + noSequence.position.width;
        var dx = (yesSequence.position.offsetX + yesSequence.position.dx +
            (sign * noSequence.position.offsetX) + noSequence.position.dx) / 2;
        this.visual.offsetX = yesSequence.position.dx - this.visual.dx;
        this.visual.offsetY = 0;
        this.position.width = width;
        this.position.height = height;
        this.position.dx = dx;
    };
    DecisionPointItem.prototype.computeXY = function (parentX, parentY) {
        _super.prototype.computeXY.call(this, parentX, parentY);
        this.visual.x = this.position.x + this.visual.offsetX;
        this.visual.y = this.position.y + this.visual.offsetY;
    };
    DecisionPointItem.prototype.getConnectors = function (resultArray) {
        var sign = this.getGrowthDirection() === GrowthDirection.left ? -1 : 1;
        var parentListener = this.getParentListener();
        var hy = this.visual.y + this.visual.height, fy = this.position.y + this.position.height;
        var idx = 0;
        var decisionPointX = this.visual.x + this.visual.dx;
        var decisionPointCenterY = this.visual.y + this.visual.dx;
        var decisionPointY1 = decisionPointCenterY + this.visual.dx;
        var parentListenerEndX = parentListener.visual.x + parentListener.visual.dx;
        var parentListenerEndY = parentListener.position.y + parentListener.position.height;
        var yesSequence = this.yesSequence;
        var yesSequenceX = yesSequence.position.x + yesSequence.position.dx;
        var yesSequenceY1 = yesSequence.position.y;
        var yesSequenceY2 = yesSequenceY1 + yesSequence.position.height;
        resultArray.push(new Connector(this, idx++, decisionPointX, decisionPointY1, yesSequenceX, yesSequenceY1));
        if (!yesSequence.hasFinal) {
            resultArray.push(new Connector(this, idx++, decisionPointX, yesSequenceY2, parentListenerEndX, parentListenerEndY, parentListenerEndY - LINE_RADIUS));
        }
        var noSequence = this.noSequence;
        var noSequenceX = noSequence.position.x + noSequence.position.dx;
        var noSequenceY1 = noSequence.position.y;
        var noSequenceY2 = noSequenceY1 + noSequence.position.height;
        resultArray.push(new Connector(this, idx++, decisionPointX, decisionPointCenterY, noSequenceX, noSequenceY1, 0));
        if (!noSequence.hasFinal && !noSequence.hasDecisionPoint) {
            resultArray.push(new Connector(this, idx++, noSequenceX, noSequenceY2, parentListenerEndX, parentListenerEndY, parentListenerEndY - LINE_RADIUS));
        }
    };
    return DecisionPointItem;
}(ItemBase));
export default DecisionPointItem;
//# sourceMappingURL=DecisionPointItem.js.map