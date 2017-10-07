export declare class CustomKeyboardComponent {
    keys: string[];
    constructor();
    keyboardKeys: any;
    str: string;
    inputTextArea: any;
    caretPos: number;
    checkevent: boolean;
    onKeypress(event: any): void;
    click(key: any, inputTextArea: any): void;
    closeApp(): void;
    onkeydown(event: any): void;
    onkeyup(event: any): void;
    show(): void;
    Caps(): void;
    getCaretPos(oField: any): void;
    setSelectionRange(selectionStart: any, selectionEnd: any): void;
}
