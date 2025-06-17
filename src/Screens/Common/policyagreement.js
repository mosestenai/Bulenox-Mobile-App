import React, { useState, useEffect } from "react";
import { Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { boldfont, lightfont } from "../../Utils/defaults";
import { deviceHeight } from "../../Utils/dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { primarycolor, secondarycolor, semiprimarycolor, semisecondarycolor } from "../../Utils/colors";
import { appstyles } from "../../Utils/styles";
import { gotoprivacypolicy, gototerms } from "../../Utils/functions";
import { useNavigation } from "@react-navigation/native";
import Getuserdetails from "../../Utils/getuserdetails";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Policyagreement = () => {
    const user = Getuserdetails()
    const navigation = useNavigation()
 

    const [checked, setchecked] = useState(false);



    //go to collection
    const startcollection = () => {
        user.policyagreement = true
        AsyncStorage.setItem("details", JSON.stringify(user));
        navigation.navigate("clientaccount")
    }



    return (
        <SafeAreaView style={{ height: deviceHeight }}>
            <StatusBar backgroundColor={primarycolor} barStyle="light-content" />
            <View style={{ marginHorizontal: "5%", paddingTop: 30, height: "100%" }}>
                <View>
                    <Text style={{ fontFamily: boldfont }}>
                        To provide you with our services, we
                        need your consent to collect, process, and
                        store your personal information
                    </Text>
                    <Text style={{ fontFamily: lightfont, marginTop: 5 }}>Bulenox Codes needs access to certain device permissions including</Text>
                    <View style={{ flexDirection: "row", marginVertical: 20 }}>
                        <Image source={require("./../../../assets/images/common/pin.png")} height={40} />
                        <Text style={{ fontFamily: boldfont, marginLeft: 10 }}>Location</Text>
                    </View>
                    <Text style={{ fontFamily: lightfont }}>
                        We use and collect your location, device and usage data for research purposes and to
                        help use prevent fraud
                    </Text>
                </View>
                <View style={styles.bottomview}>
                    <Text style={styles.reviewtext}>Review our Privacy Policy and Terms & Conditions for more details</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ width: "10%" }} onPress={() => setchecked(!checked)}>
                            <MaterialCommunityIcons color={secondarycolor} size={25} name={checked ? 'checkbox-marked' : "checkbox-blank-outline"} />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: lightfont, width: "90%", color: secondarycolor }}>
                            I consent to the processing of my personal information in accordance with the terms of the{' '}
                            <TouchableOpacity onPress={() => gotoprivacypolicy()}>
                                <Text style={[appstyles.linktext, { marginBottom: -3, marginRight: 20 }]}>Data Privacy Policy</Text>
                            </TouchableOpacity>{' '}
                            and{' '}
                            <TouchableOpacity style={{ margin: 0 }} onPress={() => gototerms()}>
                                <Text style={[appstyles.linktext, { marginBottom: -3 }]}>Terms & Conditions</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => checked && startcollection()} style={[appstyles.appsecondarybutton, { backgroundColor: checked ? secondarycolor : semisecondarycolor }]}>
                        <Text style={appstyles.mainbuttontext} >Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    bottomview: {
        position: "absolute",
        bottom: 10,
        paddingBottom: 30
    },
    reviewtext: {
        fontFamily: lightfont,
        lineHeight: 20,
        marginVertical: 10,
        color: primarycolor
    }
})

export default Policyagreement