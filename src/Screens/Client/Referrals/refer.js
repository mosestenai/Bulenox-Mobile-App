import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Image, Share } from "react-native";
import { gray, lightblue, lightgray, secondarycolor, white } from "../../../Utils/colors";
import { deviceHeight, deviceWidth } from "../../../Utils/dimensions";
import * as Clipboard from 'expo-clipboard';
import Maketoast from "../../../Components/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { appstyles } from "../../../Utils/styles";
import Backicon from "../../../Components/backicon";

const Referral = () => {

    const [user, setuser] = useState('');
    const [refferalcode, setrefferalcode] = useState('');




    useEffect(() => {
        const getdata = async () => {
            try {
                const value = await AsyncStorage.getItem('details')
                if (value !== null) {
                    const gh = JSON.parse(value);
                    setrefferalcode(gh?.referralcode)
                    setuser(gh)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getdata()
    }, []);




    //handling invite
    const onInvitefriends = async () => {
        try {
            const result = await Share.share({
                message:
                    `Bulenox app | Download Bulenox Codes app by clicking the link https://play.google.com/store/apps/details?id=com.bulenox.bulenox. When prompted enter ${refferalcode} as your invite code`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    //copy code to clipboard
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(refferalcode);
        Maketoast({ message: "Referral code copied to clipboard" })
    };

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content" // Here is where you change the font-color
            />
            <Backicon />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Referrals</Text>
            </View>
            <View style={{ marginHorizontal: "5%" }}>
                <Text style={{ color: lightgray, fontFamily: boldfont, fontSize: 25, paddingVertical: 15 }}>Refer and Earn</Text>
                <View>
                    <Text style={styles.smalltext}>Share and get rewarded </Text>
                    <Text style={styles.smalltext}>cash when you refer a friend to</Text>
                    <Text style={styles.smalltext}>try Bulenox app</Text>
                </View>
                <Image source={require("./../../../../assets/images/common/referpic.jpg")} style={styles.imageview} />
            </View>
            <View style={styles.bottomview}>
                <Text style={{ fontWeight: "bold", color: gray, marginVertical: 5 }}>Your referral code</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
                    <Text style={{ fontWeight: "700", color: lightgray }}>{refferalcode}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard()}>
                        <Text style={{ color: lightblue, fontWeight: "600" }}>Copy</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={appstyles.appsecondarybutton} onPress={() => onInvitefriends()}>
                    <Text style={appstyles.buttontext}>Invite Friends</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    invitebutton: {
        backgroundColor: secondarycolor,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingVertical: 12,
        borderRadius: 5,
        marginVertical: 10
    },
    bottomview: {
        position: "absolute",
        marginHorizontal: "5%",
        width: "90%",
        bottom: 10
    },
    imageview: {
        height: deviceHeight / 2,
        width: deviceWidth
    },
    smalltext: {
        fontFamily: lightfont
    },
    arrowright: {
        position: "absolute",
        right: "5%",
        top: 20
    }
})
export default Referral