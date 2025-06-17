import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Linking } from "react-native";
import Opendrawer from "../../../Components/opendrawer";
import { gray, lightgray, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import { PHONE_NUMBER, boldfont } from "../../../Utils/defaults";
import { appstyles } from "../../../Utils/styles";

const Help = ({ navigation }) => {

 

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content"
            />
            <Opendrawer navigation={navigation} />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Help</Text>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: "5%" }}>
                    <TouchableOpacity style={styles.linkbutton} onPress={() => navigation.navigate("faqs")}>
                        <View style={{ flexDirection: "row" }}>
                            <MaterialCommunityIcons name="message-question-outline" style={styles.lefticon} />
                            <Text style={styles.textbetween}>FAQ'S</Text>
                        </View>
                        <FontAwesome name="angle-right" style={styles.righticon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkbutton} onPress={() => navigation.navigate("reportproblem")}>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="warning" style={styles.lefticon} />
                            <Text style={styles.textbetween}>Report a problem</Text>
                        </View>
                        <FontAwesome name="angle-right" style={styles.righticon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkbutton} onPress={() => Linking.openURL(`tel:${PHONE_NUMBER}`)}>
                        <View style={{ flexDirection: "row" }}>
                            <Ionicons name="chatbox-ellipses-outline" style={styles.lefticon} />
                            <Text style={styles.textbetween}>Chat with us</Text>
                        </View>
                        <FontAwesome name="angle-right" style={styles.righticon} />
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    textbetween: {
        fontFamily: boldfont,
        fontSize: 17,
        color: gray
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
export default Help