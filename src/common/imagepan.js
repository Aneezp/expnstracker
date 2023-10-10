import React, { useEffect, useState } from 'react';

import ImageViewer from 'react-native-image-zoom-viewer';
import { RNGet } from './function';
import CryptoJS from "react-native-crypto-js";
import { View } from 'react-native';


export const ImagePan = (props) => {
    const { url } = props
    const [key, setKey] = useState('');

    useEffect(() => {
        getApikey();
    }, []);


    const getApikey = async () => {
        let results = await RNGet('api-key')
        if (results) {
            let bytes = CryptoJS.AES.decrypt(results.key, 'AltraSec');
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            setKey(originalText)
            // console.log(global.URLS); /my/account.json
        }
    }

    const images = [{ url: url,headers: { 'X-Redmine-API-Key': key } }];

    // const onPinchEvent = Animated.event([{
    //     nativeEvent: { scale }
    // }], { useNativeDriver: true });

    // const onPanEvent = Animated.event([{
    //     nativeEvent: {
    //         translationX: translateX,
    //         translationY: translateY
    //     }
    // }], { useNativeDriver: true });

    // const onPinchStateChange = ({ nativeEvent }) => {
    //     if (nativeEvent.state == State.ACTIVE) {
    //         setPanEnabled(true)
    //     }
    //     const nScale = nativeEvent.scale;
    //     if (nativeEvent.state === State.END) {
    //         if (nScale < 1) {
    //             Animated.spring(scale, {
    //                 toValue: 1, useNativeDriver: true
    //             }).start();

    //             if (nScale < 1) {
    //                 Animated.spring(translateX, {
    //                     toValue: 0, useNativeDriver: true
    //                 }).start();
    //             }
    //             if (nScale < 1) {
    //                 Animated.spring(translateY, {
    //                     toValue: 0, useNativeDriver: true
    //                 }).start();
    //             }
    //             setPanEnabled(false);
    //         }
    //     }
    // }
    return (
        <View>
            <ImageViewer imageUrls={images ? console.log(images) || images : console.log('---oo') || images} renderIndicator={() => null} />
            {/* <PanGestureHandler 
                onGestureEvent={onPanEvent}
                ref={panRef}
                simultaneousHandlers={[pinchRef]}
                enabled={panEnabled}
                failOffsetX={[-1000, 1000]}
                shouldCancelWhenOutside >
                <Animated.View style={{ width: 600, height: 600 }}>
                    <PinchGestureHandler
                        ref={pinchRef} onGestureEvent={onPinchEvent} simultaneousHandlers={[panRef]}
                        onHandlerStateChange={onPinchStateChange} >
                        <Animated.Image source={{ uri: props.imageurl, headers: props.headers }}
                            style={{
                                width: '100%',
                                height: '100%',
                                transform: [{ scale }, { translateX }, { translateY }]
                            }}
                            resizeMode="contain"
                        />
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler> */}
        </View>


    )
};