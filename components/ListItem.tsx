import {observer} from "proxily";
import React, {useContext, useEffect} from "react";
import {ListItemContext} from "../controllers/ListItemController";
import {StyleContext} from "../controllers/StyleController";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Checkbox from 'expo-checkbox';

export const ListItem = observer(function ListItem () {
    const listItemController = useContext(ListItemContext);
    const styleController = useContext(StyleContext);
    const {completed, toggleCompleted, selected, select, title, setTitle} = listItemController;
    const {listItemStyle, checkboxColor, listItemTextStyle} = styleController;
    return (

            <View style={{flexDirection:"row", padding: 8, margin: 8, ...listItemStyle, borderRadius: 8}}>
                <View style={{flex: 1}} >
                    <Checkbox value={completed} onValueChange={toggleCompleted} color={checkboxColor}/>
                </View>
                <TouchableOpacity style={{flex: 4}} onPress={select}>
                    <View >
                        {selected &&
                            <TextInput autoFocus={true} style={listItemTextStyle}
                                   onChangeText={ (value) => setTitle(value) }
                                   value={title} />
                        }
                        {!selected &&
                            <Text style={{...listItemTextStyle, textDecorationLine: completed ? "line-through" : "none"}}>
                                {title}
                            </Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>

    );
});
