export declare class CustomKeyboardComponent {
    CapsLock: boolean;
    keys: string[];
    inputstr: string;
    caretPos: number;
    inputTextArea: any;
    constructor();
    ngOnInit(): void;
    keyPress(event: any): void;
    Caps(): void;
    click(item: any, inputTextArea: any): void;
    getCaretPos(oField: any): void;
    setSelectionRange(selectionStart: any, selectionEnd: any): void;
}
