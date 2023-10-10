import React from 'react';
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { screenDiagonal } from './function';
import BottomSheet from 'react-native-simple-bottom-sheet';

const dgl = screenDiagonal();

export const TextBox = ({ ...props }) => {
    let { title, onChangeText, secureTextEntry, placeholder, value, width, borderRadius } = props;
    return (
        <View style={{ padding: dgl * 0.01 }}>
            <Text style={{ color: '#000' }}>{title}</Text>
            <TextInput style={{ borderWidth: 1, width: width ?? dgl * 0.4, backgroundColor: 'white', borderRadius: borderRadius ?? 0 }}
                onChangeText={text => onChangeText(text)} secureTextEntry={secureTextEntry}
                placeholder={placeholder} value={value}
            />
        </View>
    )
}

export const TextComp = ({ ...props }) => {
    let { title, color, fontWeight, fontSize, padding, lines, style } = props;
    return (
        <Text style={[{ color: color ?? '#000', fontWeight: fontWeight ?? '300', fontSize: fontSize ?? dgl * 0.03, padding: padding ?? 0 }, style]} numberOfLines={lines}>{title}</Text>
    )
}
export const Button1 = ({ ...props }) => {
    let { title, color, fontWeight, width, border, Textcolor, onPress, height, fontSize } = props;
    return (
        <TouchableOpacity onPress={onPress} style={{ height: height ?? dgl * 0.05, backgroundColor: color ?? '#fff', borderRadius: border ?? dgl * 0.02, width: width ?? "45%", alignItems: 'center', justifyContent: 'center' }}>
            <TextComp title={title} fontWeight={fontWeight ?? '500'} color={Textcolor} fontSize={fontSize ?? null} ></TextComp>
        </TouchableOpacity>)
}

export const DrawerUp = ({ ...props }) => {
    let { children } = props;

    return (
        <View style={{ flex: 1 }}>
            <BottomSheet outerContentStyle={{ backgroundColor: '#fff', borderRadius: dgl * 0.03 }}
                wrapperStyle={{ backgroundColor: '#fff', marginHorizontal: dgl * 0.01 }} lineStyle={{ backgroundColor: '#614BA6' }}
            >
                {children}
            </BottomSheet>
        </View >
    )
}
