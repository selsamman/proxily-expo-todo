import {useObservable, useObservables, ObservableProvider} from "proxily";
import {ListItem} from "./ListItem";
import React, {useContext, useEffect, useState} from "react";
import {ListContext} from "../controllers/ListController";
import {ListItemController, ListItemContext} from "../controllers/ListItemController";
import {StyleContext} from "../controllers/StyleController";
import {FlatList, Text, TouchableHighlight, View} from "react-native";

export function List () {
    useObservables()
    const listController = useContext(ListContext);
    const styleController = useContext(StyleContext);
    const {listItemContainerStyle} = styleController;
    const {undoCompletedItems, completedItems, toDoList} = listController;
    const {toDoListItems} = toDoList;
    const [hasToast, setHasToast] = useObservable(listController.showToast);

    return (
        <View style={{marginTop: 6}}>
            <FlatList data={toDoList.toDoListItems}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item, index}) =>
                    <ObservableProvider key={index} context={ListItemContext} dependencies={[item]}
                                        value={() => new ListItemController(listController, item)}>
                        <ListItem key={index}/>
                    </ObservableProvider>
                }/>
        </View>
    );
}
