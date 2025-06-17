import React from "react"
import { TouchableOpacity, Text, Linking } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import LottieView from 'lottie-react-native';
import { gray } from "../Utils/colors"
import { APP_LINK, boldfont, lightfont } from "../Utils/defaults"


const Updateappspinner = () => {


    return (
        <Spinner
            visible={true}
            size={70}
            cancelable={true}
            customIndicator={
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 5,
                        width: "80%",
                        margin: 1.5,
                        alignItems: "center"
                    }}
                >
                    <LottieView
                        style={{ height: 120, width: "100%" }}
                        source={require('./../../assets/lotties/update.json')}
                        autoPlay={true}
                        loop={false}
                    />
                    <Text style={{ fontFamily: boldfont, color: gray }}>Update app</Text>
                    <Text style={{ fontFamily: lightfont }}>Your app is outdated.Please update to the latest version</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => Linking.openURL(APP_LINK)}>
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        />
    )
}

export default Updateappspinner;