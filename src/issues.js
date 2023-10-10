
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image, ScrollView, Modal, Dimensions, ActivityIndicator, Linking } from 'react-native';
import { Button1, DrawerUp, TextComp } from './common/customComponents';
import { FetchData, onlyUnique, RNGet, RNremove, RNStore, screenDiagonal } from './common/function';
import HeaderT from './common/header';
import Markdown from 'react-native-markdown-display';
import { WebView } from 'react-native-webview';
import CryptoJS from "react-native-crypto-js";
import { ImagePan } from './common/imagepan';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const dgl = screenDiagonal();
const Issues = gestureHandlerRootHOC((props) => {
    const [loading, setLoading] = useState(true);
    const [Logout, setLogout] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [ImageUrl, setImageurl] = useState([]);
    const [text, setText] = useState([]);
    const [key, setKey] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getApikey()
        GetIssues()
    }, []);

    const GetIssues = async () => {

        let data = {
            'url': global.URLS + '/issues.json',
            'method': 'GET',
            'params': { 'assigned_to_id': 'me', 'include': 'attachments', 'sort': 'category:desc,project' }
        }
        let result = await FetchData(data)
        if (result == '401') {
            ToastAndroid.show("Something went wrong please check Api key", ToastAndroid.SHORT);
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
        else {
            let resultHere = result.issues
            let project = {}
            resultHere.map(item => {
                let m = resultHere.filter(item1 => { return item.project['name'] == item1.project['name'] })
                project[item.project['name']] = m
            })
            setProjects(resultHere)
            // setText(result.issues)
        }
        setLoading(false);

    }
    const getApikey = async () => {
        let results = await RNGet('api-key')
        if (results) {
            let bytes = CryptoJS.AES.decrypt(results.key, 'AltraSec');
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            setKey(originalText)
            // console.log(global.URLS); /my/account.json
        }
    }
    // const logoutFn = () => {
    //     setLogout(!Logout);
    //     const timer = setTimeout(() => {
    //         setText(true);
    //     }, 1000);

    // }
    const Click = (data) => {
        if (data.toLowerCase() == 'issues') {
            // console.log(data);
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
            // setText(false);
        }
    }
    const onImagePress = (url) => {
        // setLoading(true)
        setImageModal(true)
        const images = [
            {
                url: url,
                // props:{ headers: { 'X-Redmine-API-Key': '6d4f86d23ce051e86b6c4a6cd73b432df1d23cdc' }}
                props: {
                    headers: { 'X-Redmine-API-Key': '6d4f86d23ce051e86b6c4a6cd73b432df1d23cdc' }
                }
            }
        ];
        setImageurl(images)
    }



    return (
        <>
            <Modal transparent visible={loading} >
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    {/* <Image source={require('./images/icon.png')} style={{ height: 70, width: 70, borderRadius: dgl * 0.1 }} /> */}
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            </Modal>

            <HeaderT title={"Issues"} navigation={props.navigation} back />
            <FlatList showsVerticalScrollIndicator={false} data={projects} initialNumToRender={10} nestedScrollEnabled={true}
                renderItem={({ item }) => {

                    // if (item.id == 36341) {
                    //     console.log(item.description);
                    // }
                    // console.log(item[1]);
                    // if (item.project['name']) {
                    //     data.push(item.project['name'])
                    // }


                    let attachments = item['attachments']
                    let length = 0
                    let images = attachments?.slice(0, 3) || []

                    if (attachments.length > 3) {
                        length = 1
                    }

                    let Cdate = new Date(item.created_on)
                    let Udate = new Date(item.updated_on)
                    return (
                        <View style={{ margin: dgl * 0.02, backgroundColor: '#614BA6', padding: dgl * 0.02, borderRadius: dgl * 0.02, overflow: 'hidden', maxWidth: dgl * 0.42, maxHeight: dgl * 0.6 }}>


                            <View style={{ paddingHorizontal: dgl * 0.01, padding: dgl * 0.007, borderRadius: dgl * 0.01, backgroundColor: item.tracker['name'] == 'Bug' ? '#E5193D' : '#3565FF', marginBottom: dgl * 0.005, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <TextComp fontSize={dgl * 0.02} fontWeight={'500'} title={'#' + item.id} color={'#FFF'} />
                                <TextComp fontSize={dgl * 0.02} fontWeight={'300'} title={item.tracker['name']} color={'#FFF'} />
                                <TextComp fontSize={dgl * 0.02} fontWeight={'300'} title={item.status['name']} color={'#fff'} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: dgl * 0.01, paddingHorizontal: dgl * 0.01 }}>
                                <View >
                                    <TextComp fontSize={dgl * 0.015} fontWeight={'200'} title={'Created : '} color={'#fff'} />
                                    <TextComp fontSize={dgl * 0.015} fontWeight={'200'} title={Cdate.toLocaleString()} color={'#fff'} />
                                </View>

                                <View >
                                    <TextComp fontSize={dgl * 0.015} fontWeight={'200'} title={'Last Updated on : '} color={'#fff'} />
                                    <TextComp fontSize={dgl * 0.015} fontWeight={'200'} title={Udate.toLocaleString()} color={'#fff'} />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderRadius: dgl * 0.01, paddingVertical: dgl * 0.007 }}>
                                <View style={{ padding: dgl * 0.005 }}>
                                    <TextComp fontSize={dgl * 0.02} fontWeight={'400'} title={'From : ' + item.author['name']} color={'#fff'} />
                                </View>
                                <View style={{ padding: dgl * 0.005 }}>
                                    <TextComp fontSize={dgl * 0.02} fontWeight={'400'} title={'To : ' + item.assigned_to['name']} color={'#fff'} />
                                </View>
                            </View>
                            <View style={{ paddingVertical: dgl * 0.01 }}>
                                <TextComp fontSize={dgl * 0.025} fontWeight={'300'} title={'Project : ' + item.project['name']} color={'#fff'} lines={2} />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>

                                {/* <View style={{ paddingVertical: dgl * 0.01 }}>
                                    <TextComp fontSize={dgl * 0.025} fontWeight={'300'} title={'Project : ' + item.project['name']} color={'#fff'} lines={2} />
                                </View> */}
                                <View >
                                    <TextComp fontSize={dgl * 0.02} fontWeight={'500'} title={'Subject : '} color={'#fff'} style={{ textDecorationLine: 'underline' }} />
                                    <TextComp fontSize={dgl * 0.025} fontWeight={'300'} title={' ' + item.subject} color={'#fff'} />
                                </View>

                                {item.description ?
                                    <>
                                        <TextComp style={{ textDecorationLine: 'underline', alignSelf: 'center' }} padding={dgl * 0.01} fontSize={dgl * 0.02} fontWeight={'300'} title={'description'} color={'#fff'} />
                                        <Markdown
                                            style={{
                                                body: { color: '#000', fontSize: dgl * 0.02 },
                                                heading1: { color: 'purple' },
                                                code_block: { color: 'black', fontSize: 14 },
                                                text: { color: '#fff' }, link: { color: 'black' }
                                            }}>{item.description}</Markdown>
                                    </> : null}
                                {/* <WebView source={{
                                        uri: 'https://redmine.epixel.in/attachments/thumbnail/13669', headers: { 'X-Redmine-API-Key': key }
                                    }} style={{ width: 600, height: 600 }} /> */}
                                {/* <View style={{ flexWrap: 'wrap' }}>
                                        {images ? images.map(item => {
                                            // console.log(attachments,length.length);
                                            return (
                                                <TouchableOpacity >
                                                    <Image style={{ width: dgl * 0.2, height: dgl * 0.3, resizeMode: 'contain', margin: dgl * 0.01 }} source={{ uri: item.content_url, headers: { 'X-Redmine-API-Key': key } }} onError={(i) => { console.log(i, '---------err'); }} />
                                                </TouchableOpacity>)
                                        }) : null}
                                        {length != 0 ? <Button1 title={'See all attachments'} fontSize={dgl * 0.025} fontWeight={'600'} width={'100%'} onPress={onPress} /> : null}
                                    </View> */}
                                {/* <View style={{ flexWrap: 'wrap' }}>
                                        {images ? images.map(item => {
                                            return (
                                                <TouchableOpacity >
                                                    <Image style={{ width: dgl * 0.2, height: dgl * 0.3, resizeMode: 'contain', margin: dgl * 0.01 }} source={{ uri: item.content_url, headers: { 'X-Redmine-API-Key': key } }} onError={(i) => { console.log(i, '---------err'); }} />
                                                </TouchableOpacity>)
                                        }) : null}
                                        {length != 0 ? <Button1 title={'See all attachments'} fontSize={dgl * 0.025} fontWeight={'600'} width={'100%'} onPress={onPress} /> : null}
                                    </View> */}
                                <FlatList horizontal showsHorizontalScrollIndicator={false} data={attachments}
                                    renderItem={({ item }) => {
                                        return (
                                            // <Image style={{ width: dgl * 0.2, height: dgl * 0.2, resizeMode: 'contain' }} source={{ uri: item.content_url, headers: { 'X-Redmine-API-Key': key } }} />
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { setLoading(true); onImagePress(item.content_url) }}>
                                                <Image style={{ width: dgl * 0.2, height: dgl * 0.3, resizeMode: 'contain', margin: dgl * 0.01 }} source={{ uri: item.content_url, headers: { 'X-Redmine-API-Key': key } }} onError={(i) => { console.log(i, '---------err'); }} />
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </ScrollView>
                        </View>
                    )
                }} />

            <Modal visible={imageModal} onRequestClose={() => { setImageModal(false); setImageurl(''); setLoading(false) }} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <HeaderT close closeFn={() => { setImageModal(false); setImageurl(''); setLoading(false) }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ImageViewer imageUrls={ImageUrl} renderIndicator={() => null} />
                        {/* <ImagePan url={ImageUrl}/> */}
                        {/* <Image onLoadEnd={() => { setLoading(false) }} style={{ width: '95%', height: '95%', resizeMode: 'center', margin: dgl * 0.01 }} source={{ uri: ImageUrl, headers: { 'X-Redmine-API-Key': key } }} onError={(i) => { console.log(i, '---------err'); }} /> */}
                    </View>
                </View>
            </Modal>
        </>
    );
});

export default Issues;