import { FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { TouchableOpacity } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import LottieView from 'lottie-react-native';


const Loadingspinner = ({ color, backgroundColor }) => {
    const navigation = useNavigation();

    return (
        <Spinner
            visible={true}
            color='red'
            size={70}
            cancelable={true}
            customIndicator={
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        width: "80%",
                        margin: 1.5,
                        alignItems: "center"
                    }}
                >
                    <LottieView
                        style={{ height: 120,width:"100%" }}
                        source={require('./../../assets/lotties/loading.json')} autoPlay={true} loop={true} />
                </TouchableOpacity>

            }
        />
    )
}

export default Loadingspinner;
