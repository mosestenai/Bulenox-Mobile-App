import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import LottieView from 'lottie-react-native';
import { silver, white } from "../Utils/colors";
import { boldfont } from "../Utils/defaults";


const Nodatacomponent = ({ text, backgroundColor }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                padding: 40,
                borderRadius: 5,
                width: "100%",
                margin: 1.5,
                alignItems: "center",
                marginTop: 20,
                backgroundColor: white
            }}
        >
            <LottieView
                style={{ height: 300, width: "100%" }}
                source={require('./../../assets/lotties/nodata.json')} autoPlay={true} loop={true} />

            <Text style={{ textAlign: "center", fontFamily: boldfont }}>{text}</Text>

        </TouchableOpacity>
    )
}

export default Nodatacomponent;
