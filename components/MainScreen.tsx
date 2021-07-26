import {Header, HeaderRight} from "./Header";
import {List} from "./List";
import React, {useContext} from 'react';
import {useObservables} from "proxily";
import {StyleContext} from "../controllers/StyleController";

export function MainScreen({navigation} : any) {
    useObservables();
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
}


