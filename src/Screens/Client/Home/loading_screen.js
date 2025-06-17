import React, { useState } from "react"
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { primarycolor, white } from "../../../Utils/colors";
import { boldfont, lightfont } from "../../../Utils/defaults";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import Updateexpotoken from "../../../Utils/updateexpotoken";



const LoadingScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()


    return (
        <SafeAreaView style={{ paddingTop: insets.top, flex: 1, height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "absolute" }}><Updateexpotoken /></View>
            <Image style={styles.logo} source={require("./../../../../assets/icon.png")} />
            <Text style={styles.app_name}>Bulenox codes</Text>
            <Text style={styles.discover_text} >Discover amazing deals</Text>
            <View>
                <LottieView
                    style={{ height: 120, width: 120 }}
                    source={require('./../../../../assets/lotties/loading.json')} autoPlay={true} loop={true} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("clientaccount")} style={styles.continue_button}>
                <Text style={styles.continue_button_text}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
        borderRadius: 10
    },
    app_name: {
        marginTop: 10,
        color: primarycolor,
        fontSize: 35,
        fontFamily: boldfont
    },
    discover_text: {
        fontSize: 15,
        fontFamily: lightfont
    },
    continue_button: {
        marginTop: 15,
        backgroundColor: primarycolor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    continue_button_text: {
        color: white,
        fontSize: 15,
        fontFamily: lightfont
    }
})

export default LoadingScreen