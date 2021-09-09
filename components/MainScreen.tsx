import {Header, HeaderRight} from "./Header";
import {List} from "./List";
import React, {useContext} from 'react';
import {observer} from "proxily";
import {StyleContext} from "../controllers/StyleController";

export const MainScreen = observer(function MainScreen({navigation} : any) {
    const {headerBackgroundColor} = useContext(StyleContext);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<Header navigation={navigation}/>),
            headerRight: () => (<HeaderRight />)
        });
    }, [navigation]);
    return (
        <>
            <List />
        </>
    )
});


