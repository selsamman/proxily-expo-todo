import {ListContext} from "../controllers/ListController";
import {useObservables} from "proxily";
import React, {useContext} from "react";
import {StyleContext} from "../controllers/StyleController";
import {Pressable, View, Text, TouchableHighlight} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function Header ({navigation} : any) {
    useObservables();
    const invokeStyle = () => navigation.navigate("Style");
    const {headerForegroundColor} = useContext(StyleContext);
    const {addItem} = useContext(ListContext);
    return (
        <View style={{flexDirection: 'row', height: 40, padding: 4}}>
            <Pressable  onPress={addItem}>
                <MaterialCommunityIcons name="plus-circle"
                                        color={headerForegroundColor} style={{flex: 1}} size={30} />
            </Pressable>
            <Pressable  onPress={invokeStyle}>
                <MaterialCommunityIcons name="cog"
                                        color={headerForegroundColor} style={{flex: 1}} size={30}/>
            </Pressable>
            <View style={{flex: 6}}></View>
        </View>
    );
}

export function  HeaderRight () {
    useObservables();
    const {completedItems, undoCompletedItems, showToast} = useContext(ListContext);
    const {headerForegroundColor} = useContext(StyleContext);
    return !showToast ? <></> : (
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: headerForegroundColor}}>{completedItems.length} Items to be Deleted - </Text>
            <TouchableHighlight onPress={undoCompletedItems}>
                <Text style={{color: "#7099E3FF"}}> UNDO </Text>
            </TouchableHighlight>
        </View>
    )
}
