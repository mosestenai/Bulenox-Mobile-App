import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Text, Alert } from "react-native";
import { green, lightprimarycolor, pagebackground, primarycolor } from "../../../Utils/colors";
import * as Updates from "expo-updates"
import Getuserdetails from "../../../Utils/getuserdetails";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { boldfont, lightfont, paybill } from "../../../Utils/defaults";
import Contactusactionsheet from "../../../Components/contactusactionsheet";
import { appstyles } from "../../../Utils/styles";
import Updateexpotoken from "../../../Utils/updateexpotoken";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";





const Account = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const user = Getuserdetails()
    const [reload, setreload] = useState(false);

    //modals
    const [showcontacts, setshowcontacts] = useState(false);


    const signout = () => {
        const removeitem = async () => {
            try {
                await AsyncStorage.removeItem("details");
                return true;
            }
            catch (exception) {
                return false;
            }
        }
        removeitem()
        removepass()
        Updates.reloadAsync()
    };

    const removepass = async () => {
        try {
            await AsyncStorage.removeItem("resetcode");
            return true;
        }
        catch (exception) {
            return false;
        }
    }


    //confirm sign out
    const confirmsignout = (val) => {
        Alert.alert(
            "Confirm signout",
            `Are you sure you want to sign out?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => signout()
                }
            ]
        );
    }



    const iconsize = 23

    return (
        <SafeAreaView style={[appstyles.safeareastyle, { paddingTop: insets.top }]} >
            <View style={{ position: "absolute" }}><Updateexpotoken /></View>
            <StatusBar backgroundColor={primarycolor} barStyle="light-content" />
            <View style={{ width: "90%", margin: "auto" }}>
                <TouchableOpacity style={{ marginTop: 30, flexDirection: "row" }}>
                    <Image style={{ height: 50, maxWidth: 50, borderRadius: 5 }} source={require("./../../../../assets/app_icon.png")} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: boldfont, fontSize: 18 }}>Bulenox</Text>
                        <Text style={{ fontFamily: lightfont,color:primarycolor }}>Version 1.0.0</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 300, backgroundColor: "white", marginTop: 50 }} refreshControl={
                <RefreshControl
                    refreshing={reload}
                    onRefresh={() => setreload(!reload)}
                    color={primarycolor}
                    tintColor={primarycolor}
                />
            } >
                <View>
                    <View style={{ width: "90%", margin: "auto", paddingTop: 30 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={[styles.billview, { backgroundColor: lightprimarycolor }]}>
                                <Image style={{ height: 40, maxWidth: 30 }} source={require("./../../../../assets/images/loan/bill.png")} />
                                <Text style={{ fontFamily: boldfont, fontSize: 12, marginLeft: 10 }}>Settings</Text>
                            </View>
                            <TouchableOpacity style={[styles.billview, { backgroundColor: "#fff9ef" }]}>
                                <Image style={{ height: 40, maxWidth: 30 }} source={require("./../../../../assets/images/loan/application.png")} />
                                <Text style={{ fontFamily: boldfont, fontSize: 12, marginLeft: 10 }}>My Application</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "90%", margin: "auto" }}>
                        <TouchableOpacity style={styles.buttonview} onPress={() => navigation.navigate("reportproblem")}>
                            <View style={styles.buttonleftview}>
                                <View style={styles.wrapbtnicon}>
                                    <Image style={styles.buttonicon} source={require("./../../../../assets/images/loan/bill.png")} />
                                </View>
                                <Text style={styles.buttontext}>Feedback</Text>
                            </View>
                            <View style={styles.angleright}>
                                <FontAwesome size={iconsize} color={"gray"} name="angle-right" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonview} onPress={() => navigation.navigate("about")}>
                            <View style={styles.buttonleftview}>
                                <View style={styles.wrapbtnicon}>
                                    <Image style={styles.buttonicon} source={require("./../../../../assets/images/loan/aboutus.png")} />
                                </View>
                                <Text style={styles.buttontext}>About Us</Text>
                            </View>
                            <View style={styles.angleright}>
                                <FontAwesome size={iconsize} color={"gray"} name="angle-right" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonview} onPress={() => navigation.navigate("privacypolicy")}>
                            <View style={styles.buttonleftview}>
                                <View style={styles.wrapbtnicon}>
                                    <Image style={styles.buttonicon} source={require("./../../../../assets/images/loan/privacy.png")} />
                                </View>
                                <Text style={styles.buttontext}>Privacy agreement</Text>
                            </View>
                            <View style={styles.angleright}>
                                <FontAwesome size={iconsize} color={"gray"} name="angle-right" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonview} onPress={()=>setshowcontacts(true)} >
                            <View style={styles.buttonleftview}>
                                <View style={styles.wrapbtnicon}>
                                    <Image style={styles.buttonicon} source={require("./../../../../assets/images/loan/customer.png")} />
                                </View>
                                <Text style={styles.buttontext}>Customer Service</Text>
                            </View>
                            <View style={styles.angleright}>
                                <FontAwesome size={iconsize} color={"gray"} name="angle-right" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonview} onPress={() => navigation.navigate("settings")}>
                            <View style={styles.buttonleftview}>
                                <View style={styles.wrapbtnicon}>
                                    <Image style={styles.buttonicon} source={require("./../../../../assets/images/loan/settings.png")} />
                                </View>
                                <Text style={styles.buttontext}>Settings</Text>
                            </View>
                            <View style={styles.angleright}>
                                <FontAwesome size={iconsize} color={"gray"} name="angle-right" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
            {showcontacts && <Contactusactionsheet dismiss={() => setshowcontacts(false)} />}
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({
    angleright: {
        marginRight: 5
    },
    wrapbtnicon: {
        width: 60,
    },
    buttontext: {
        fontFamily: boldfont,
        color: "gray"
    },
    buttonicon: {
        height: 30,
        width: 30,
        maxWidth: 30,
        maxHeight: 30
    },
    buttonleftview: {
        flexDirection: "row",
        alignItems: "center"
    },
    buttonview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        alignItems: "center",
        width: "100%"
    },
    billview: {
        width: "48%",
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        height: 80
    }
});

export default Account