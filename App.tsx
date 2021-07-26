import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {persistAsync, useObservables, ObservableProvider} from "proxily";
import { ToDoList, TodoListStyle } from './store';
import { AsyncStorage } from 'react-native';
import { StyleContext, StyleController } from './controllers/StyleController';
import {ListContext, ListController } from './controllers/ListController';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './components/MainScreen';
import {StyleUpdateScreen} from "./components/StyleUpdateScreen";
const Stack = createStackNavigator();

export default function App() {

  const [toDoList, setTodoList] = useState(undefined as unknown as ToDoList);
  const [toDoListStyle, setTodoListStyle] = useState(undefined as unknown as TodoListStyle);
  const config = {storageEngine: AsyncStorage, classes: Object.values(require('./store'))}

  useEffect(() => {
    persistAsync(new ToDoList(), {...config, key: 'root'})
        .then((toDoList) => setTodoList(toDoList))
  }, []);
  useEffect(() => {
    persistAsync(new TodoListStyle(), {...config, key: 'style'})
        .then((toDoListStyle) => setTodoListStyle(toDoListStyle))
  }, []);

  if (toDoList && toDoListStyle) {
    return (
      <SafeAreaProvider>
          <ObservableProvider context={StyleContext} value={()=>new StyleController(toDoListStyle)}>
            <ObservableProvider context={ListContext} value={()=>new ListController(toDoList)}>
              <Content/>
            </ObservableProvider>
          </ObservableProvider>
      </SafeAreaProvider>
    );
  } else
    return null;
}

function Content () {
  useObservables();
  const {headerBackgroundColor, headerForegroundColor, backgroundStyle} = useContext(StyleContext);
  const navigationOptions = {
    headerStyle: {
      backgroundColor: headerBackgroundColor,
    },
    headerTintColor: headerForegroundColor,
    headerTitleStyle: {
      color: headerForegroundColor
    },
    cardStyle: backgroundStyle,
    headerMode: 'screen'
  }

  console.log('render content');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDo" screenOptions={navigationOptions}>
        <Stack.Screen name="ToDo" component={MainScreen} />
        <Stack.Screen name="Style" component={StyleUpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
