
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import { Button1, DrawerUp, TextComp } from './common/customComponents';
import { FetchData, RNGet, RNremove, RNStore, screenDiagonal } from './common/function';
import HeaderT from './common/header';
import { BackButton } from './common/svg';


const dgl = screenDiagonal();
const Dashboard = (props) => {
    const [loading, setLoading] = useState(false);
    const [Logout, setLogout] = useState(false);
    const [text, setText] = useState(false);
    useEffect(() => {

        setLoading(true);
        CheckProfile()
    }, []);
    const CheckProfile = async () => {
        let data = {
            'url': global.URLS + '/my/account.json',
            'method': 'GET'
        }
        let result = await FetchData(data)
        if (result == '401') {
            ToastAndroid.show("Something went wrong please check Api key", ToastAndroid.SHORT);
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }

        // let result = await RNGet('api-key')
        // let ciphertext = CryptoJS.AES.encrypt(x.key, 'secret key 123').toString();
        // if (result) {
        //     let bytes = CryptoJS.AES.decrypt(result.key, 'AltraSec');
        //     let originalText = bytes.toString(CryptoJS.enc.Utf8);
        //     // console.log(global.URLS); /my/account.json
        // }

    }
    const logoutFn = () => {
        setLogout(!Logout);
        const timer = setTimeout(() => {
            setText(true);
        }, 1000);

    }
    const Click = (data) => {
        if (data.toLowerCase() == 'issues') {
            props.navigation.navigate(data)
        }
    }
    const logout = (state) => {
        if (state) {
            RNremove('api-key');
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
        else {
            setLogout(false);
            setText(false);
        }
    }
    const data = ['Issues', 'Logtime', 'Projects', 'Profile']


    return (
        <>
            <HeaderT title={"Dashboard"} navigation={props.navigation} logout logoutFn={logoutFn}></HeaderT>
            {/* <View style={{ margin: dgl * 0.02,flexDirection:'row' }}> */}
            <FlatList horizontal centerContent showsHorizontalScrollIndicator={false} data={data} pagingEnabled
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ margin: dgl * 0.1 }}>
                            {/* <Text>{item}</Text> */}
                            <Button1 width={dgl * 0.3} title={item} height={dgl * 0.5} color={'#614BA6'} Textcolor={'#fff'} onPress={() => { Click(item) }}></Button1>
                        </View>
                    )
                }} />

            {/* </View> */}
            {
                Logout ? <DrawerUp>
                    {text ? <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderTopEndRadius: dgl * 0.03, borderTopLeftRadius: dgl * 0.03 }}>
                        <View>
                            <TextComp fontWeight={'400'} title={' Do you want to Logout ?'} color={'#614BA6'} />
                        </View>
                        <View style={{ flexDirection: 'row', margin: dgl * 0.01, justifyContent: "space-around", width: '100%' }}>
                            <Button1 title={'Yes'} color={'#614BA6'} Textcolor={'#fff'} onPress={() => logout(true)} ></Button1>
                            <Button1 title={'No'} color={'#614BA6'} Textcolor={'#fff'} onPress={() => logout(false)} ></Button1>
                        </View>

                    </View> : null}
                </DrawerUp> : null
            }
        </>
    );
};

export default Dashboard;