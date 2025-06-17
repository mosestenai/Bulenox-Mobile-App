import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import LottieView from 'lottie-react-native';
import { primarycolor, white } from "../Utils/colors";


const Nointernetoverlay = ({ getconnection }) => {


    return (
        <Spinner
            visible={true}
            color='red'
            size={70}
            cancelable={false}
            customIndicator={
                <View
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        width: "80%",
                        margin: 1.5,
                        alignItems: "center"
                    }}
                >
                    <LottieView
                        style={{ height: 150 }}
                        source={require('./../../assets/lotties/nointernet.json')} autoPlay={true} loop={true} />
                    <Text style={{ fontWeight: "700" }}>No internet</Text>
                    <Text>An internet error occurred, please try again</Text>
                    <TouchableOpacity onPress={() => getconnection()} style={{ borderRadius: 5, backgroundColor: primarycolor, paddingVertical: 10, width: "100%", marginVertical: 10, alignItems: "center" }}>
                        <Text style={{ color: white, fontWeight: "700" }}>Try Again</Text>
                    </TouchableOpacity>
                </View>

            }
        />
    )
}

export default Nointernetoverlay;
