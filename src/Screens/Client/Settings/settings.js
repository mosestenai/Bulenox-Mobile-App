import { AntDesign, Feather, FontAwesome, } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { gray, primarycolor, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import SwitchToggle from "react-native-switch-toggle";
import Getuserdetails from "../../../Utils/getuserdetails";
import Loadingspinner from "../../../Components/loadingspinner";
import Successspinner from "../../../Components/successspinner";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { appstyles } from "../../../Utils/styles";
import Backicon from "../../../Components/backicon";
import { useNavigation } from "@react-navigation/native";
// setAppIcon("red")

const Settings = () => {
    const navigation = useNavigation()
    const user = Getuserdetails()
    const [notifications, setnotifications] = useState(true);
    const [loading, setloading] = useState(false);
    const [successpinner, setsuccesspinner] = useState(false);






    const switchnotification = async () => {
        if (notifications) {
            Alert.alert(
                "Warning",
                `Turning off push notification is inadvisable`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Continue",
                        onPress: () => setnotifications(!notifications)
                    }
                ]
            );
        } else {
            setnotifications(!notifications)
        }
    }
    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white}}>
            {successpinner && <Successspinner message={'Sad to see you leave. Your account is scheduled for deletion in the next 30 days before which you can restore'} />}
            {loading && <Loadingspinner />}
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content"
            />
            <Backicon  />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Settings</Text>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: "5%" }}>
                    <TouchableOpacity style={styles.linkbutton}>
                        <View style={{ flexDirection: "row",alignItems:"center" }}>
                            <FontAwesome name="bell-o" style={styles.lefticon} />
                            <Text style={styles.textbetween}>Notifications</Text>
                        </View>
                        <SwitchToggle
                            switchOn={notifications}
                            onPress={() => switchnotification()}
                            containerStyle={styles.togglestyle}
                            circleStyle={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                            }}
                            circleColorOff='black'
                            circleColorOn={primarycolor}
                            backgroundColorOn="#f5a6ac"
                            backgroundColorOff='#C4C4C4'
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    togglestyle: {
        marginTop: 0,
        width: 30,
        height: 15,
        borderRadius: 25,
        padding: 0,
    },
    textbetween: {
        fontFamily: boldfont,
        fontSize: 17,
        color: gray
    },
    lefticon: {
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
        alignItems:"center",
        marginVertical: 13
    }
})
export default Settings