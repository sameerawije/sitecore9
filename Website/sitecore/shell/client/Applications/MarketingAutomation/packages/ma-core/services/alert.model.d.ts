export declare enum AlertType {
    danger = 0,
    warning = 1,
    info = 2,
    success = 3,
}
export declare class AlertModel {
    dismissible: boolean;
    message: string;
    private _alertTitleByType;
    title: string;
    type: string;
    constructor(type: AlertType, dismissible: boolean, message: string);
}
