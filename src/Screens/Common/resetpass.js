import React, { useEffect, useState } from "react";
import { deviceHeight } from "../../Utils/dimensions";
import { SafeAreaView, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { gray, primarycolor, secondarycolor, semiprimarycolor, white } from "../../Utils/colors";
import { boldfont, lightfont } from "../../Utils/defaults";
import Contactusactionsheet from "../../Components/contactusactionsheet";
import { useNavigation } from "@react-navigation/native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Contactusbutton } from "../../Components/buttons";
import Alertpopup from "../../Components/alert";
import Successspinner from "../../Components/successspinner";
import Getuserdetails from "../../Utils/getuserdetails";
import axios from "axios";
import { Loginuserurl, Resetpassurl, Sendrequestpassurl, Validatepasscodeurl } from "../../Utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loadingspinner from "../../Components/loadingspinner";
import { appstyles } from "../../Utils/styles";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native-paper";
import Backicon from "../../Components/backicon";


const Resetpass = () => {
    const navigation = useNavigation()
    const user = Getuserdetails()

    const [show_form, setshow_form] = useState(true);
    const [loading, setloading] = useState(false);
    const [id_number, setid_number] = useState('');


    const [reset_code, setResetCode] = useState('');
    const [new_pin, setNewpin] = useState('');

    const ref = useBlurOnFulfill({ value: reset_code, cellCount: 6 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: reset_code, setValue: setResetCode, });

    const pinref = useBlurOnFulfill({ value: reset_code, cellCount: 4 });
    const [pinprops, getpinCellOnLayoutHandler] = useClearByFocusCell({ value: new_pin, setValue: setNewpin, });



    //action sheets
    const [showcontacts, setshowcontacts] = useState(false);
    const [pin_updated, setpin_updated] = useState(false);

    const [resendcode, setresendcode] = useState(false);
    const [counter, setCounter] = useState(30);


    useEffect(() => {
        const timer = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
                if (counter === 1) {
                    setresendcode(true)
                }
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [counter]);


    const verifypin = () => {
        setloading(true)
        axios.post(Validatepasscodeurl, {
            id_number: id_number,
            code: reset_code,
            new_pin: new_pin
        }).then(function (response) {
            setloading(false)
            if (!response.data.error) {
                setpin_updated(true)
                setTimeout(() => {
                    setpin_updated(false)
                    navigation.navigate("login")
                }, 3000);
            } else {
                Alertpopup(response.data.message)
            }
        }).catch(function (error) {
            setloading(false)
            Alertpopup("There was an error try again later")
            console.log(error)
        });
    }

    const onresendcode = () => {

    }


    const onSuccess = (t_idnumber) => {
        setshow_form(false)
        setid_number(t_idnumber)
    }


    return (
        show_form ? <Resetpassform onEnterotp={onSuccess} /> :
            <SafeAreaView style={{ height: deviceHeight, backgroundColor: primarycolor }}>
                <StatusBar backgroundColor={primarycolor} barStyle="light-content" />
                {pin_updated && <Successspinner message={"Pin updated successfully"} />}
                {loading && <Loadingspinner />}
                <View style={{ height: deviceHeight, marginHorizontal: "5%" }}>
                    <Backicon />
                    <View style={styles.midpage}>
                        <Text style={{ fontSize: 20, color: white, fontFamily: boldfont, marginVertical: 10, textAlign: "center" }}>Enter Verification Code sent to your phone</Text>
                        <View>
                            <CodeField
                                ref={ref}
                                {...props}
                                value={reset_code}
                                onChangeText={setResetCode}
                                cellCount={6}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <Text style={{ fontSize: 20, color: white, fontFamily: boldfont, marginVertical: 10, alignSelf: "center" }}>Enter New Pin</Text>
                        {/* <Text style={{ color: white, fontFamily: lightfont, marginVertical: 10, width: "70%", alignSelf: "center", textAlign: "center" }}>Code helps keep your account safe and secure</Text> */}
                        <View style={{ marginTop: 0, marginBottom: 5 }}>
                            <CodeField
                                ref={pinref}
                                {...pinprops}
                                value={new_pin}
                                onChangeText={setNewpin}
                                onSubmitEditing={() => verifypin()}
                                cellCount={4}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getpinCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>
                        <TouchableOpacity onPress={() => (new_pin?.length === 4 && reset_code?.length == 6) && verifypin()} style={[appstyles.mainbutton, { backgroundColor: (new_pin?.length === 4 && reset_code?.length == 6) ? secondarycolor : semiprimarycolor }]}>
                            <Text style={appstyles.mainbuttontext}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
    );
};


const Resetpassform = ({ onEnterotp }) => {

    const [id_number, setid_number] = useState('');
    const [loading, setloading] = useState(false);
    const [code_sent, setcode_sent] = useState(false);


    const resetpass = () => {
        setloading(true)
        axios.put(Sendrequestpassurl, {
            id_number: id_number
        }).then((response) => {
            setloading(false)
            if (!response.data.error) {
                setcode_sent(true)
                setTimeout(() => {
                    onEnterotp(id_number)
                    setcode_sent(false)
                }, 3000);
            } else {
                Alertpopup(response.data.message)
            }
        }).catch((error) => {
            console.log(error)
            setloading(false)
            Alertpopup("There was an error try again later")
        })
    }


    return (
        <View style={appstyles.safeareastyle}>
            {loading && <Loadingspinner />}
            {code_sent && <Successspinner message={"Code has been sent to your phone number"} />}
            <Backicon />
            <ScrollView>
                <Image source={require("./../../../assets/images/common/lady.png")} style={appstyles.floatinglady} />
                <View style={appstyles.screenhead}>
                    <View style={appstyles.wraplogo}>
                        <Image style={{ maxHeight: "100%", maxWidth: "100%" }} source={require("./../../../assets/app_icon.png")} />
                    </View>
                    <Text style={appstyles.pagetitle}>Forgot your pin</Text>
                    <Text style={appstyles.pageminititle}>Reset it here</Text>
                </View>
                <View style={appstyles.screenminiform}>
                    <View>
                        <Text style={{ fontFamily: lightfont, color: white }}>User Details</Text>
                        <TextInput
                            label={<Text style={{ fontFamily: lightfont }}>Id Number</Text>}
                            value={id_number}
                            autoFocus={!id_number}
                            onChangeText={text => setid_number(text)}
                            activeUnderlineColor={secondarycolor}
                            outlineColor={white}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                            maxLength={12}
                            underlineColor={gray}
                            contentStyle={{ color: primarycolor, fontFamily: lightfont }}
                            placeholderTextColor={white}
                            style={{ marginTop: 5, backgroundColor: white }}
                        />
                        <TouchableOpacity onPress={() => (id_number?.length > 6) && resetpass()} style={[appstyles.mainbutton, { backgroundColor: (id_number?.length > 6) ? primarycolor : semiprimarycolor }]}>
                            <Text style={appstyles.mainbuttontext}>Send OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    midpage: {
        marginTop: deviceHeight / 4
    },
    codeFieldRoot: { marginTop: 20, width: "60%", alignSelf: "center" },
    cell: {
        width: 30,
        height: 30,
        borderRadius: 10,
        lineHeight: 28,
        fontSize: 15,
        borderWidth: 2,
        borderColor: white,
        textAlign: "center",
        color: white
    },
    focusCell: {
        borderColor: secondarycolor,
    },
});



export default Resetpass;


