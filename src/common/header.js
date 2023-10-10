import { View, Text, TouchableOpacity, Image } from 'react-native';
import { TextComp } from './customComponents';
import { screenDiagonal } from './function';
import { BackButton, CloseBtn, LogoutSvg } from './svg';
const dgl = screenDiagonal();

const HeaderT = ({ ...props }) => {
    const { title, navigation, back, logout, logoutFn, close, closeFn } = props;
    return (
        <View style={{ height: dgl * 0.07, width: '100%', backgroundColor: '#614BA6', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ marginLeft: dgl * 0.01, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                {back ? <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', backgroundColor: '#614BA6', width: 40, alignItems: 'center' }}>
                    {/* <Image source={require('../images/back.png')} style={{ height: 20, width: 20 }} /> */}
                    <BackButton width={20} height={20} fill={"#fff"} />
                </TouchableOpacity> : null}
                {!back ? <View style={{ justifyContent: 'center', backgroundColor: '#614BA6', width: dgl * 0.03, alignItems: 'center' }} /> : null}

            </View>
            <View style={{ justifyContent: 'center', backgroundColor: '#614BA6' }}>
                <TextComp title={title} fontWeight={"700"} fontSize={26} color='#fff' />
            </View>
            {logout && logoutFn ? <TouchableOpacity onPress={logoutFn} style={{ justifyContent: 'center', backgroundColor: '#614BA6', width: 50, marginLeft: 10, alignItems: 'center' }}>
                {/* <Image source={require('../images/logout.png')} style={{ height: 20, width: 20 }} /> */}
                <LogoutSvg width={30} height={30} fill={"#fff"} />
            </TouchableOpacity> : null}


            {close && closeFn ? <TouchableOpacity onPress={closeFn} style={{ justifyContent: 'center', backgroundColor: '#614BA6', width: 50, marginLeft: 10, alignItems: 'center' }}>
                <CloseBtn width={35} height={35} bColor={'#000'} />
            </TouchableOpacity> : null}
        </View>
    )
}
export default HeaderT;