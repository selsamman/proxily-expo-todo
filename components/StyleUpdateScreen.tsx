import React, {useContext, useState} from "react";
import {StyleContext, StyleController} from "../controllers/StyleController";
import {ListContext, ListController} from "../controllers/ListController";
import {List} from "./List";
import {Transaction, useObservable, useObservables, ObservableProvider,makeObservable} from "proxily";
import {ToDoList} from "../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorPicker, fromHsv } from 'react-native-color-picker'


import {Button, Pressable, View, Text, FlatList} from "react-native";


export function StyleUpdateScreen ({navigation} : any) {

    useObservables();
    const [transaction] = useState( () => new Transaction({timePositioning: true}));

    const todoListStyle = useContext(StyleContext).todoListStyle
    const [todoStyleController] = useState(() =>
        makeObservable(new StyleController(todoListStyle), transaction));


    const listController = useContext(ListContext);
    const {showStyle, hideStyle} = listController

    // Actions
    const cancel = () => {
        transaction.rollback();
        listController.hideStyle();
    }
    const save = () => {
        transaction.commit();
        listController.hideStyle();
    }

    React.useLayoutEffect(() => {
        const {headerBackgroundColor, headerForegroundColor} = todoStyleController;
        navigation.setOptions({
            headerRight: () => (<HeaderRight styleController={todoStyleController} transaction={transaction}/>),
            headerStyle: {
                backgroundColor: headerBackgroundColor,
            },
            headerTintColor: headerForegroundColor,
            headerTitleStyle: {
                color: headerForegroundColor
            },
            cardStyle: {backgroundColor: '#fff'}
        });
    });
    React.useEffect(
        () => navigation.addListener('beforeRemove', () => transaction.commit())
    );

    return (
        <StyleContext.Provider value={todoStyleController}>
            <View style={{flexDirection: 'row', padding: 10}}>
                <View style={{flex: 6}}>
                    <StyleList />
                </View>
                <View style={{flex: 6}}>
                    <StyleFields />
                </View>
            </View>
        </StyleContext.Provider>
    );
}

function HeaderRight ({styleController, transaction} : {styleController : StyleController, transaction : Transaction}) {
    const {headerForegroundColor} = styleController;
    const undo = () => {if (transaction.canUndo) transaction.undo()};
    const redo = () => {if (transaction.canRedo) transaction.redo()};
    const restore = () => {if (transaction.canRedo) transaction.rollback()};
    return (
        <View style={{flexDirection:'row', paddingRight: 8}}>
            <Pressable onPress={undo} style={{opacity: transaction.canUndo ? 1 : .5}}>
                <MaterialCommunityIcons name="undo" color={headerForegroundColor} size={30} />
            </Pressable>
            <Pressable onPress={redo} style={{marginLeft: 8, marginRight: 8, opacity: transaction.canRedo ? 1 : .5}}>
                <MaterialCommunityIcons name="redo" color={headerForegroundColor} size={30} />
            </Pressable>
            <Button disabled={!transaction.canUndo} onPress={restore} title="Restore"/>
        </View>
    )
}

export function StyleList () {
    const sampleToDoList = new ToDoList();
    sampleToDoList.addItem("Item 1");
    sampleToDoList.addItem("Item 2");
    sampleToDoList.addItem("Item 3");

    const {backgroundStyle} = useContext(StyleContext);

    return (
        <ObservableProvider context={ListContext} value={() => new ListController(sampleToDoList)}>
            <View  style={backgroundStyle}>
                <List/>
            </View>
        </ObservableProvider>
    )
}

export function StyleFields () {
    useObservables();
    const toDoListStyle = useContext(StyleContext).todoListStyle;
    const [backgroundColor, setBackgroundColor] = useObservable(toDoListStyle.backgroundColor);
    const [listFontColor, setListFontColor] = useObservable(toDoListStyle.listFontColor);
    const [listItemBackgroundColor, setListItemBackgroundColor] = useObservable(toDoListStyle.listItemBackgroundColor);
    const [fontSize, setFontSize] = useObservable(toDoListStyle.fontSize);
    const [navbarBg, setNavbarBg] = useObservable(toDoListStyle.navbarBg);
    const [activeProp, setActiveProp] = useState('');
    // @ts-ignore

    return (
        <View  style={{marginLeft: 8}}>

            <View >
                <Pressable onPress={() => setActiveProp('background')}>
                    <Text style={{color: '#606060'}}>Background Color {'>'}</Text>
                </Pressable>
                {activeProp === 'background' &&
                    <ColorPicker style={{height: 200, marginLeft: 8}} color={backgroundColor}
                                 onColorChange={(hsv) => setBackgroundColor(fromHsv(hsv))}/>}
            </View>

            <View style={{marginTop: 8}}>
                <Pressable onPress={() => setActiveProp('listFontColor')}>
                    <Text style={{color: '#606060'}}>Text Color {'>'}</Text>
                </Pressable>
                {activeProp === 'listFontColor' &&
		            <ColorPicker style={{height: 200, marginLeft: 8}} color={listFontColor}
		                         onColorChange={(hsv) => setListFontColor(fromHsv(hsv))}/>}
            </View>

            <View style={{marginTop: 8}}>
                <Pressable onPress={() => setActiveProp('listItemBackgroundColor')}>
                    <Text style={{color: '#606060'}}>Item Color {'>'}</Text>
                </Pressable>
                {activeProp === 'listItemBackgroundColor' &&
		            <ColorPicker style={{height: 200, marginLeft: 8}} color={listItemBackgroundColor}
		                         onColorChange={(hsv) => setListItemBackgroundColor(fromHsv(hsv))}/>}
            </View>

            <View style={{marginTop: 8}}>
                <Pressable onPress={() => setActiveProp('fontSize')}>
                    <Text style={{color: '#606060'}}>Font Size {'>'}</Text>
                </Pressable>
                    {activeProp === 'fontSize' &&
                    <Selector prop={fontSize} setter={setFontSize} choices={[18, 24, 32]} />}
            </View>

            <View style={{marginTop: 8}}>
                <Pressable onPress={() => setActiveProp('navbarBg')}>
                    <Text style={{color: '#606060'}}>Header Background {'>'}</Text>
                </Pressable>
                {activeProp === 'navbarBg' &&
                <Selector prop={navbarBg} setter={setNavbarBg} choices={['light', 'dark']} />}
            </View>
        </View>
    );
}

// Choose from a selection and invoke a setter
function Selector ({prop, setter, choices} :
         {prop : string | number, setter : (choice: any) => void, choices : Array<number | string>}) : any {
    return (
        <FlatList style={{marginLeft: 8}}
          data={choices}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) =>
              <Pressable onPress={() => setter(item)}>
                  <Text style={{color: '#606060', padding: 1, backgroundColor: prop === item ? "#e0e0e0" : "transparent"}} key={index}>{item}</Text>
              </Pressable>
          }/>
    )
}
