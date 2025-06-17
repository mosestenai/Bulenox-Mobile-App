import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Linking, Alert, Image } from "react-native";
import Backicon from "../../../Components/backicon";
import { gray, lightblue, lightgray, primarycolor, secondarycolor, silver, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import { appstyles } from "../../../Utils/styles";
import { SITE_LINK, boldfont } from "../../../Utils/defaults";

const About = ({ navigation }) => {


    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content"
            />
            <Backicon />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>About</Text>
            </View>
            <ScrollView>
                <View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("./../../../../assets/icon.png")} style={{
                                height: 100,
                                width: 100,
                                marginTop: 4,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: secondarycolor
                            }} />
                        </View>
                        <Text style={{ fontWeight: "600", color: gray }}>v1.0.0 </Text>
                    </View>
                    <View style={{ marginHorizontal: "5%", marginTop: 50 }}>
                        <View style={{ paddingVertical: 10, flexDirection: "row", marginVertical: 3, alignItems: "center" }}>
                            <SimpleLineIcons name="globe" style={styles.lefticon} />
                            <TouchableOpacity onPress={() => Linking.openURL(SITE_LINK)}>
                                <Text style={styles.textbetween}>{SITE_LINK}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingVertical: 10, flexDirection: "row", marginVertical: 3, alignItems: "center" }}>
                            <FontAwesome name="envelope-o" style={styles.lefticon} />
                            <TouchableOpacity>
                                <Text style={styles.textbetween}>support@bulenox.app</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingVertical: 10, flexDirection: "row", marginVertical: 3, alignItems: "center" }}>
                            <Entypo name="instagram" style={styles.lefticon} />
                            <TouchableOpacity>
                                <Text style={styles.textbetween}>bulenoxapp</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    textbetween: {
        fontFamily: boldfont,
        fontSize: 17,
        color: primarycolor
    },
    lefticon: {
        marginTop: 3,
        width: 50,
        fontSize: 20
    },
    righticon: {
        color: gray,
        fontSize: 20
    },
    linkbutton: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        marginVertical: 13
    }
})
export default About