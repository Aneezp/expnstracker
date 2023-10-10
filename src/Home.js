
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import { FetchData, RNGet, RNStore, screenDiagonal } from './common/function';
import { DrawerUp, TextBox } from './common/customComponents';
import HeaderT from './common/header';
import WebView from 'react-native-webview';
import CryptoJS from "react-native-crypto-js";


const dgl = screenDiagonal();
const HomeScreen = (props) => {
    const [key, setkey] = useState('');
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [up, setUp] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, []);
    const Login = async () => {
        if (key != '' && key != undefined) {
            let ciphertext = CryptoJS.AES.encrypt(key, 'AltraSec').toString();
            let api_key = { 'key': ciphertext }
            let result = RNStore('api-key', api_key);
            if (result) {
                // props.navigation.navigate('Dashboard')
                let data = {
                    'url': global.URLS + '/my/account.json',
                    'method': 'GET'
                }
                let result = await FetchData(data)
                if (result == '401') {
                    ToastAndroid.show("Something went wrong With Api key", ToastAndroid.SHORT);
                }
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                });
            }
        }
        else {
            ToastAndroid.show("Please enter a key", ToastAndroid.SHORT);
        }

    }
    // const checkLogged = async () => {
    //     let result = RNGet('header');
    //     if (!result) {
    //         props.navigation.navigate('dashboard');
    //     }
    //     let headers = {
    //         'X-Redmine-API-Key': '6d4f86d23ce051e86b6c4a6cd73b432df1d23cdc',
    //     }
    //     let body = {
    //         time_entry: {
    //             "id": 132917,
    //             "project": {
    //                 "id": 208
    //             },
    //             "issue": {
    //                 "id": 57108
    //             },
    //             "user": {
    //                 "id": 222
    //             },
    //             "activity": {
    //                 "id": 12
    //             },
    //             "hours": 4.0,
    //             "comments": "support for praveesh ",
    //             "spent_on": "2022-12-30"
    //         }

    //     }
    //     let data = {
    //         headers: headers,
    //         method: 'PUT',
    //         url: 'https://redmine.epixel.in/time_entries/132917.json',
    //         body: body
    //     }
    //     // let res = FetchData(data)
    //     // console.log(res);
    //     // FetchData('https://redmine.epixel.in/issues.json',
    //     //     'GET',
    //     //     headers,
    //     //     body)
    // }
    const lgFn = () => {
        setUp(true)
    }
    return (
        <>
            <HeaderT title={"Login"} navigation={props.navigation}></HeaderT>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text onPress={{}} style={{ color: 'red', marginTop: dgl * 0.01 }}>* Get Your api-key from redmine profile and paste here *</Text>
                <TextBox title={'Token'} onChangeText={setkey} value={key} secureTextEntry />
                <TouchableOpacity onPress={Login} style={{ marginVertical: dgl * 0.01, padding: dgl * 0.01, borderWidth: 1, backgroundColor: '#88ad', width: dgl * 0.4, alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: "800" }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(true)} style={{ marginVertical: dgl * 0.01, padding: dgl * 0.01, borderWidth: 1, backgroundColor: '#88ad', width: dgl * 0.4, alignItems: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: "800" }}>Get Key</Text>
                </TouchableOpacity>
            </View>
            {up ? <DrawerUp>
                <View style={{ height: 20, backgroundColor: 'red' }} ></View>
            </DrawerUp> : null}
            <Modal visible={modal} onRequestClose={() => setModal(false)}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'red', justifyContent: 'center' }}>
                    <WebView source={{ uri: 'https://redmine.epixel.in/' }} style={{ height: dgl * 0.1, width: dgl * 0.45 }} incognito />
                </View>
            </Modal>
        </>
    );
};

export default HomeScreen;