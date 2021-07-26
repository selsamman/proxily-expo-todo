import {TodoListStyle} from "../store";
import React from "react";

export class StyleController {
    todoListStyle : TodoListStyle;
    constructor(toDoListStyle : TodoListStyle) {
        this.todoListStyle = toDoListStyle;
    }
    get backgroundStyle () {
        return {backgroundColor: this.todoListStyle.backgroundColor}
    }
    get headerBackgroundColor () {
        return this.todoListStyle.navbarBg === 'dark' ? "black" : "white"
    }
    get headerForegroundColor () {
        return this.todoListStyle.navbarBg !== 'dark' ? "black" : "white"
    }
    get navbarButtonVariant () {
        return this.todoListStyle.navbarBg === 'dark' ? 'secondary' : 'outline';
    }
    get listItemContainerStyle () {
        return {backgroundColor: this.todoListStyle.listItemBackgroundColor}
    }
    get listItemStyle () {
        return { backgroundColor: this.todoListStyle.listItemBackgroundColor}
    }
    get checkboxColor () {
        return this.todoListStyle.listFontColor
    }
    get listItemTextStyle () {
        return {color: this.todoListStyle.listFontColor,fontSize: this.todoListStyle.fontSize, marginTop: 2}
    }
}
export const StyleContext = React.createContext<StyleController>(undefined as unknown as StyleController);
