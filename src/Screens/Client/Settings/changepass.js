import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import Backicon from "../../../Components/backicon";
import { black, primarycolor, secondarycolor, white } from "../../../Utils/colors";
import { deviceHeight, deviceWidth } from "../../../Utils/dimensions";
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alertpopup from "../../../Components/alert";
import axios from "axios";
import { Resetpassurl } from "../../../Utils/urls";
import Loadingspinner from "../../../Components/loadingspinner";
import Successspinner from "../../../Components/successspinner";
import Getuserdetails from "../../../Utils/getuserdetails";
import { boldfont } from "../../../Utils/defaults";

const Changepass = () => {

    const user = Getuserdetails()
    const [showactionsheet, setshowactionsheet] = useState(false);
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [padding, setpadding] = useState(0);
    const [successspinner, setsuccessspinner] = useState(false);
    const ref = React.useRef();

    const [passstatus, setpassstatus] = useState(true);
    const [passiconname, setpassiconname] = useState('eye-off');

    const [passstatus2, setpassstatus2] = useState(true);
    const [passiconname2, setpassiconname2] = useState('eye-off');


    const navigation = useNavigation();




    const postdata = () => {
        if (!password | !cpassword) {
            Alertpopup("Fill all fields")
        } else {
            if (cpassword !== password) {
                Alertpopup("The two passwords do not match")
            }
            else {
                setloading(true)
                axios.post(Resetpassurl, {
                    email: user.email,
                    password: password
                }).then(function (response) {
                    setloading(false)
                    if (!response.data.error) {
                        setsuccessspinner(true)
                        removeitem()
                        setTimeout(() => {//navigate user after 2 seconds of display
                            setsuccessspinner(false)
                            navigation.goBack()
                        }, 2000);
                    } else {
                        Alertpopup(response.data.message)
                    }
                }).catch(function (error) {
                    setloading(false)
                    Alertpopup("there was an error try again later")
                });
            }
        }
    }
    const removeitem = async () => {
        try {
            await AsyncStorage.removeItem("resetcode");
            return true;
        }
        catch (exception) {
            return false;
        }
    }


    const switchpass = () => {
        passiconname == "eye" ? setpassiconname("eye-off") : setpassiconname("eye")
        passstatus ? setpassstatus(false) : setpassstatus(true)

    }

    const switchpass2 = () => {
        passiconname2 == "eye" ? setpassiconname2("eye-off") : setpassiconname2("eye")
        passstatus2 ? setpassstatus2(false) : setpassstatus2(true)
    }


    return (
        <SafeAreaView style={{ backgroundColor: "white", height: deviceHeight }}>
            {successspinner && <Successspinner message={"Password changed successfully"} />}
            {loading && <Loadingspinner />}
            <ScrollView contentContainerStyle={{ paddingBottom: padding }} ref={ref}>
                <View style={{ height: deviceHeight }}>
                    <Backicon />
                    <View >
                        <View style={{
                            marginHorizontal: "15%"
                        }}>
                            <Text style={{
                                marginTop: 5,
                                fontSize: 35,
                                fontFamily: boldfont,
                                color: primarycolor
                            }}>Change</Text>
                            <Text style={{
                                fontSize: 35,
                                fontFamily: boldfont,
                                color: secondarycolor
                            }}>password</Text>
                        </View>
                    </View>
                    <View style={styles.infoview}>
                        <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
                            <Text style={styles.textinputlabel}>New Password</Text>
                            <TextInput
                                secureTextEntry={passstatus}
                                activeUnderlineColor={black}
                                onChangeText={text => setpassword(text)}
                                right={<TextInput.Icon icon={passiconname} onPress={() => switchpass()} />}
                                style={{ height: 40, borderRadius: 5 }}

                            />
                        </View>
                        <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
                            <Text style={styles.textinputlabel}>Confirm password</Text>
                            <TextInput
                                secureTextEntry={passstatus2}
                                activeUnderlineColor={black}
                                onChangeText={text => setcpassword(text)}
                                right={<TextInput.Icon icon={passiconname2} onPress={() => switchpass2()} />}
                                style={{ height: 40, borderRadius: 5 }}

                            />
                        </View>
                        <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
                            <TouchableOpacity style={styles.nextbutton} onPress={() => postdata()}>
                                <Text style={styles.nexttext}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    nextbutton: {
        backgroundColor: secondarycolor,
        alignSelf: "flex-end",
        padding: 10,
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    nexttext: {
        color: "white",
        fontSize: 10
    },
    floatingiconinfo: {
        backgroundColor: "silver",
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        position: "absolute",
        right: 20,
        marginTop: 40
    },
    infoview: {
        backgroundColor: white,
        bottom: 0,
        paddingBottom: 10,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: "100%",
        paddingTop: 50
    },
    textinputlabel: {
        color: black,
        fontWeight:"600"
    }
})

export default Changepass