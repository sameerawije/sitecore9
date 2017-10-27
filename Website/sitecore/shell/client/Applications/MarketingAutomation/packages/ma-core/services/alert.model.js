export var AlertType;
(function (AlertType) {
    AlertType[AlertType["danger"] = 0] = "danger";
    AlertType[AlertType["warning"] = 1] = "warning";
    AlertType[AlertType["info"] = 2] = "info";
    AlertType[AlertType["success"] = 3] = "success";
})(AlertType || (AlertType = {}));
var AlertModel = (function () {
    function AlertModel(type, dismissible, message) {
        this.dismissible = dismissible;
        this.message = message;
        this._alertTitleByType = new Map([
            [AlertType.danger, 'Error !'],
            [AlertType.warning, 'Warning !'],
            [AlertType.info, 'Info !'],
            [AlertType.success, 'Success !'],
        ]);
        this.type = AlertType[type];
        this.title = this._alertTitleByType.get(type);
    }
    return AlertModel;
}());
export { AlertModel };
//# sourceMappingURL=alert.model.js.map