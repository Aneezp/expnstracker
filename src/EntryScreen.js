
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { FetchData, RNGet, RNremove, RNStore, screenDiagonal } from './common/function';


const dgl = screenDiagonal();
const EntryScreen = (props) => {
    useEffect(() => {
        checkLogged();
    }, []);
    const checkLogged = async () => {
        let result = await RNGet('api-key');
        if (result) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        }
        else {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }


    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: "#000" }}>
            <Image source={require('./images/icon.png')} style={{ height: 150, width: 150, borderRadius: dgl * 0.1 }} />
        </View>

    );
};

export default EntryScreen;