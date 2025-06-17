import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import LottieView from 'lottie-react-native';
import { gray } from "../Utils/colors"


const Successspinner = ({ color, backgroundColor, message }) => {
    const navigation = useNavigation();

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
                        source={require('./../../assets/lotties/tick.json')}
                        autoPlay={true}
                        loop={false}
                    />
                    <Text style={{ fontWeight: "600", color: gray }}>Success</Text>
                    <Text style={{ fontWeight: "100" }}>{message}</Text>
                </TouchableOpacity>
            }
        />
    )
}

export default Successspinner;