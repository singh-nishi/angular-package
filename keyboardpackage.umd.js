(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
	(factory((global.keyboardpackage = {}),global.core,global.common,global.forms));
}(this, (function (exports,core,common,forms) { 'use strict';

var CustomKeyboardComponent = (function () {
    function CustomKeyboardComponent() {
        this.keys = ["Esc", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp", "7", "8", "9", "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter", "4", "5", "6", "<--", "z", "x", "c", "v", "b", "n", "m", "-", "-->", "1", "2", "3", "Spacebar", "0", "Enter"];
        this.keyboardKeys = {
            keys: ["Esc", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "bksp", "7", "8", "9", "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter", "4", "5", "6", "<--", "z", "x", "c", "v", "b", "n", "m", "-", "-->", "1", "2", "3", "Spacebar", "0", "Enter"],
            capslock: false,
        };
        this.str = "";
        this.caretPos = 0;
        this.checkevent = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CustomKeyboardComponent.prototype.onKeypress = function (event) {
        //this.str = event.target.value;
        this.checkevent = true;
        // this.onkeyup(this.crevent);
        this.onkeyup(event);
        // document.getElementById('input')
        //alert(event.key);
    };
    /**
     * @param {?} key
     * @param {?} inputTextArea
     * @return {?}
     */
    CustomKeyboardComponent.prototype.click = function (key, inputTextArea) {
        this.getCaretPos(inputTextArea); //Get Cursor Position From Text Area
        if (key === "Esc" || key === "Enter") {
            //this.dialog.close();
            this.closeApp();
        }
        else {
            if (key !== "bksp" && key !== "Caps" && key !== "Spacebar" && key !== "-->" && key !== "<--") {
                //alert('lenth' + this.str.length + 'carsor' + this.caretPos);
                if (this.str.length > this.caretPos) {
                    var /** @type {?} */ tempstr = this.str.substring(0, this.caretPos);
                    tempstr += key;
                    this.str = tempstr + this.str.substring(this.caretPos, this.str.length);
                    this.caretPos--;
                    this.inputTextArea = inputTextArea;
                    this.setSelectionRange(this.caretPos, this.caretPos);
                }
                else if (this.str.length === this.caretPos) {
                    this.str += key;
                }
            }
            else if (key === "Spacebar") {
                this.str += " ";
            }
            else if (key === "Caps") {
                this.Caps();
            }
            else if (key === "-->") {
                this.caretPos++;
                this.setSelectionRange(this.caretPos, this.caretPos); //Rigth shift
                //alert('lenth' + this.str.length + 'carsor' + this.caretPos);
            }
            else if (key === "<--") {
                this.caretPos--;
                this.setSelectionRange(this.caretPos, this.caretPos); //Lift Shift
                //alert('lenth' + this.str.length + 'carsor' + this.caretPos);
            }
            else if (key === "bksp") {
                this.str = this.str.substring(0, this.str.length - 1);
            }
        }
        document.getElementById('input').focus(); //input focus..
    };
    /**
     * @return {?}
     */
    CustomKeyboardComponent.prototype.closeApp = function () {
        alert("I'm leaving the app!");
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomKeyboardComponent.prototype.onkeydown = function (event) {
        if (event.keyCode == "27" || event.keyCode == "13") {
            this.str = event.target.value;
        }
        else if (event.keyCode == "20") {
            this.Caps();
        }
        else if (event.keyCode == "17") {
        }
        else {
            console.log("onkeydown", event.target.value);
            // this.str = event.target.value;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CustomKeyboardComponent.prototype.onkeyup = function (event) {
        console.log("onkeyup", event.target.value);
        this.str = event.target.value;
    };
    /**
     * @return {?}
     */
    CustomKeyboardComponent.prototype.show = function () {
        alert(this.str);
    };
    /**
     * @return {?}
     */
    CustomKeyboardComponent.prototype.Caps = function () {
        if (this.keyboardKeys.CapsLock) {
            this.keyboardKeys.CapsLock = !this.keyboardKeys.CapsLock;
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
            this.keyboardKeys.CapsLock = !this.keyboardKeys.CapsLock;
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
     * @param {?} oField
     * @return {?}
     */
    CustomKeyboardComponent.prototype.getCaretPos = function (oField) {
        this.inputTextArea = oField;
        if (event != null && this.checkevent) {
            this.onkeyup(event);
            this.checkevent = false;
        }
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
    { type: core.Component, args: [{
                selector: 'custom-keyboard-component',
                template: "  \n  <div class=\"keyboard\">\n  <div class=\"keys-button-group\" >\n    <input id=\"input\" #inputTextArea focus=\"true\" (click)=\"getCaretPos(inputTextArea)\" (keyup)=\"getCaretPos(inputTextArea)\" (keydown)=\"onkeydown($event)\" (keypress)=\"onKeypress($event)\"\n    [ngModel]=\"str\" style=\"width:94%;margin-bottom: 2%;margin-top: 2%;margin-left: 2%\" />\n    <div *ngFor=\"let key of keys\" class=\"key\" (click)=\"click(key,inputTextArea)\">\n  {{key}}\n</div>\n</div>\n</div>\n",
                styles: [".keyboard{ height: 230px; width: 100%; float: left; background-color: aqua; color: #eee; } .key{ width: calc((100%)/16);  height: 50%; display:block; background-color:#333; text-align: left; padding-left: 8px; line-height: 29px; border-radius:2px; float:left;  margin-left: 2px; margin-bottom:2px; cursor: pointer; transition: box-shadow 0.7s ease; } .keys-button-group{ min-width: 990px; }"]
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
    { type: core.Directive, args: [{
                selector: '[customKeyboardDirective]'
            },] },
];
/**
 * @nocollapse
 */
CustomKeyboardDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
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
    { type: core.Pipe, args: [{
                name: 'customKeyboardPipe'
            },] },
    { type: core.Injectable },
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
    { type: core.Injectable },
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
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule, forms.FormsModule
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

exports.CustomKeyboardModule = CustomKeyboardModule;
exports.CustomKeyboardComponent = CustomKeyboardComponent;
exports.CustomKeyboardDirective = CustomKeyboardDirective;
exports.CustomKeyboardPipe = CustomKeyboardPipe;
exports.CustomKeyboardService = CustomKeyboardService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
