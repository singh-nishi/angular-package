import { Component, Directive, ElementRef, Injectable, NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

var CustomKeyboardComponent = (function () {
    function CustomKeyboardComponent() {
        this.CapsLock = false;
        this.keys = ["Esc", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp", "7", "8", "9", "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter", "4", "5", "6", "<--", "z", "x", "c", "v", "b", "n", "m", "-", "-->", "1", "2", "3", "Spacebar", "0", "Enter"];
        this.inputstr = "";
        this.caretPos = 0;
    }
    /**
     * @return {?}
     */
    CustomKeyboardComponent.prototype.ngOnInit = function () {
        this.inputstr = "";
        this.CapsLock = false;
        this.keys = ["Esc", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp", "7", "8", "9", "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter", "4", "5", "6", "<--", "z", "x", "c", "v", "b", "n", "m", "-", "-->", "1", "2", "3", "Spacebar", "0", "Enter"];
        this.caretPos = 0;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomKeyboardComponent.prototype.keyPress = function (event) {
        if (event.keyCode == "27" || event.keyCode == "13") {
            console.log(String.fromCharCode(event.keyCode));
        }
        else if (event.keyCode == "20") {
            this.Caps();
        }
        else if (event.keyCode == "17") {
        }
        else {
            this.inputstr = event.target.value;
        }
    };
    /**
     * @return {?}
     */
    CustomKeyboardComponent.prototype.Caps = function () {
        if (this.CapsLock) {
            this.CapsLock = !this.CapsLock;
            for (var /** @type {?} */ i = 0; i <= 36; i++) {
                if (i >= 1 && i <= 10) {
                    this.keys[i] = this.keys[i].toLowerCase();
                }
                else if (i >= 16 && i <= 24) {
                    this.keys[i] = this.keys[i].toLowerCase();
                }
                else if (i >= 30 && i <= 36) {
                    this.keys[i] = this.keys[i].toLowerCase();
                }
            }
        }
        else {
            this.CapsLock = !this.CapsLock;
            for (var /** @type {?} */ i = 0; i <= 36; i++) {
                if (i >= 1 && i <= 10) {
                    this.keys[i] = this.keys[i].toUpperCase();
                }
                else if (i >= 16 && i <= 24) {
                    this.keys[i] = this.keys[i].toUpperCase();
                }
                else if (i >= 30 && i <= 36) {
                    this.keys[i] = this.keys[i].toUpperCase();
                }
            }
        }
    };
    /**
     * @param {?} item
     * @param {?} inputTextArea
     * @return {?}
     */
    CustomKeyboardComponent.prototype.click = function (item, inputTextArea) {
        this.getCaretPos(inputTextArea); //Get Cursor Position From Text Area
        if (item === "Esc" || item === "Enter") {
            console.log(item);
        }
        else {
            if (item !== "bksp" && item !== "Caps" && item !== "Spacebar" && item !== "-->" && item !== "<--") {
                // console.log('lenth' + this.inputstr.length + 'carsor' + this.caretPos);
                if (this.inputstr.length > this.caretPos) {
                    var /** @type {?} */ tempstr = this.inputstr.substring(0, this.caretPos);
                    tempstr += item;
                    this.inputstr = tempstr + this.inputstr.substring(this.caretPos, this.inputstr.length);
                    this.caretPos--;
                    this.inputTextArea = inputTextArea;
                    this.setSelectionRange(this.caretPos, this.caretPos);
                }
                else if (this.inputstr.length === this.caretPos) {
                    this.inputstr += item;
                }
            }
            else if (item === "Spacebar") {
                this.inputstr += " ";
            }
            else if (item === "Caps") {
                this.Caps();
            }
            else if (item === "-->") {
                this.setSelectionRange(this.caretPos, this.caretPos); //Rigth shift
                //alert('lenth' + this.str.length + 'carsor' + this.caretPos);
            }
            else if (item === "<--") {
                this.caretPos--;
                this.setSelectionRange(this.caretPos, this.caretPos); //Lift Shift
                //alert('lenth' + this.str.length + 'carsor' + this.caretPos);
            }
            else if (item === "bksp") {
                this.inputstr = this.inputstr.substring(0, this.inputstr.length - 1);
            }
        }
        document.getElementById('input').focus(); //input focus...
    };
    /**
     * @param {?} oField
     * @return {?}
     */
    CustomKeyboardComponent.prototype.getCaretPos = function (oField) {
        this.inputTextArea = oField;
        if (oField.selectionStart || oField.selectionStart == '0') {
            this.caretPos = oField.selectionStart;
        }
    };
    /**
     * @param {?} selectionStart
     * @param {?} selectionEnd
     * @return {?}
     */
    CustomKeyboardComponent.prototype.setSelectionRange = function (selectionStart, selectionEnd) {
        if (this.inputTextArea.setSelectionRange) {
            this.inputTextArea.focus();
            this.inputTextArea.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (this.inputTextArea.createTextRange) {
            var /** @type {?} */ range = this.inputTextArea.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    };
    return CustomKeyboardComponent;
}());
CustomKeyboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'custom-keyboard-component',
                template: "  \n  <div class=\"keyboard\">\n  <input id=\"input\" #inputTextArea (click)=\"getCaretPos(inputTextArea)\" (keyup)=\"getCaretPos(inputTextArea)\" [ngModel]=\"inputstr\" style=\"width:90%;margin-left: 17px;\" />\n  <br>\n  <br>\n  <div class=\"button-group\">\n    <button *ngFor=\"let key of keys\" class=\"button\" (click)=\"click(key,inputTextArea)\">\n      {{key}}\n    </button>\n  </div>\n</div>\n",
                styles: [".button-group{ height: 100px; width: calc(100% - 100px); float: left; min-width: 990px; } .button{ width:calc((100%)/15); height: 50%; padding: 0px; background-color: black; color: white; } .keyboard{ height: 230px; width: 100%; float: left; background-color: aqua; padding-top: 18px; } "],
                host: { '(window:keyup)': 'keyPress($event)' }
            },] },
];
/**
 * @nocollapse
 */
CustomKeyboardComponent.ctorParameters = function () { return []; };

var CustomKeyboardDirective = (function () {
    /**
     * @param {?} el
     */
    function CustomKeyboardDirective(el) {
        this.el = el;
    }
    return CustomKeyboardDirective;
}());
CustomKeyboardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[customKeyboardDirective]'
            },] },
];
/**
 * @nocollapse
 */
CustomKeyboardDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };

/**
 * Transforms any input value
 */
var CustomKeyboardPipe = (function () {
    function CustomKeyboardPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    CustomKeyboardPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value;
    };
    return CustomKeyboardPipe;
}());
CustomKeyboardPipe.decorators = [
    { type: Pipe, args: [{
                name: 'customKeyboardPipe'
            },] },
    { type: Injectable },
];
/**
 * @nocollapse
 */
CustomKeyboardPipe.ctorParameters = function () { return []; };

var CustomKeyboardService = (function () {
    function CustomKeyboardService() {
    }
    return CustomKeyboardService;
}());
CustomKeyboardService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
CustomKeyboardService.ctorParameters = function () { return []; };

var CustomKeyboardModule = (function () {
    function CustomKeyboardModule() {
    }
    /**
     * @return {?}
     */
    CustomKeyboardModule.forRoot = function () {
        return {
            ngModule: CustomKeyboardModule,
            providers: [CustomKeyboardService]
        };
    };
    return CustomKeyboardModule;
}());
CustomKeyboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule, FormsModule
                ],
                declarations: [
                    CustomKeyboardComponent,
                    CustomKeyboardDirective,
                    CustomKeyboardPipe
                ],
                exports: [
                    CustomKeyboardComponent,
                    CustomKeyboardDirective,
                    CustomKeyboardPipe
                ]
            },] },
];
/**
 * @nocollapse
 */
CustomKeyboardModule.ctorParameters = function () { return []; };

export { CustomKeyboardModule, CustomKeyboardComponent, CustomKeyboardDirective, CustomKeyboardPipe, CustomKeyboardService };
