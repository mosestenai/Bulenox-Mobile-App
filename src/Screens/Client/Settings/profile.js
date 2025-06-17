import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import Backicon from "../../../Components/backicon";
import { gray, lightblue, lightgray, primarycolor, silver, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import { TextInput } from "react-native-paper";
import { Updateuserinfourl } from "../../../Utils/urls";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Loadingspinner from "../../../Components/loadingspinner";
import Successspinner from "../../../Components/successspinner";
import Alertpopup from "../../../Components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appstyles } from "../../../Utils/styles";

const Profile = () => {

    const [user, setuser] = useState('');

    const navigation = useNavigation()
    const [username, setusername] = useState();
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [id, setid] = useState('');
    const [successpinner, setsuccesspinner] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const getdata = async () => {
            try {
                const value = await AsyncStorage.getItem('details')
                if (value !== null) {
                    const gh = JSON.parse(value);
                    setusername(gh.username)
                    setphone(gh.phone)
                    setemail(gh.email)
                    setid(gh.id)
                    setuser(gh)
                }
            } catch (e) {
                console.log(e)
            }
        }
        getdata()
    }, []);




    const onupdate = () => {
        if (!phone || !email || !username) {
            Alertpopup("Fill all fields")
        } else {
            const formattedphone = phone.toString().substring(0, 1) == '7' ? phone.replace('7', '2547') : phone.toString().substring(0, 2) == '01' ? phone.replace('01', '2541') : phone.toString().substring(0, 3) == '+25' ? phone.replace('+', '') : phone;
            setloading(true)
            axios.post(Updateuserinfourl, {
                id: id,
                username: username,
                email: email,
                phone: formattedphone,
            }).then(function (response) {
                setloading(false)
                if (!response.data.error) {
                    const datatosave = response.data
                    const userdata = {
                        id: datatosave.id,
                        email: datatosave.email,
                        phone: datatosave.phone,
                        username: datatosave.username,
                        wallet: datatosave.wallet,
                        promocode: datatosave.promocode,
                        token: datatosave.token,
                    }
                    AsyncStorage.setItem("details", JSON.stringify(userdata));
                    setsuccesspinner(true)
                    setTimeout(() => {
                        setsuccesspinner(false)
                        navigation.goBack()
                    }, 3000);
                } else {
                    Alertpopup(response.data.message)
                }
                // 
            }).catch(function (error) {
                setloading(false)
                Alertpopup("there was an error try again later")
                console.log(error)
            });
        }

    }

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            {loading && <Loadingspinner />}
            {successpinner && <Successspinner message={"Updated successfully"} />}
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content" // Here is where you change the font-color
            />
            <Backicon />
            {/* <TouchableOpacity onPress={() => onupdate()} style={styles.savebutton}>
                <Text style={{ color: lightblue }}>Save</Text>
            </TouchableOpacity> */}
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Profile</Text>
            </View>
            <ScrollView>
                <View>
                    <View style={{ marginTop: 5, paddingHorizontal: "5%" }}>
                        <Text style={{ color: gray }}>Username</Text>
                    </View>
                    <TextInput
                        value={username}
                        defaultValue={username}
                        style={styles.textinputview}
                        underlineColor={white}
                        disabled
                        onChangeText={text => setusername(text)}
                        activeUnderlineColor={white}
                    />
                    <View style={{ marginTop: 5, paddingHorizontal: "5%" }}>
                        <Text style={{ color: gray }}>Email</Text>
                    </View>
                    <TextInput
                        value={email}
                        disabled
                        style={styles.textinputview}
                        underlineColor={white}
                        onChangeText={text => setemail(text)}
                        activeUnderlineColor={white}
                    />
                    <View style={{ marginTop: 5, paddingHorizontal: "5%" }}>
                        <Text style={{ color: gray }}>Phone Number</Text>
                    </View>
                    <TextInput
                        value={phone}
                        disabled
                        style={styles.textinputview}
                        underlineColor={white}
                        onChangeText={text => setphone(text)}
                        activeUnderlineColor={white}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    savebutton: {
        position: "absolute",
        zIndex: 5,
        right: "5%",
        top: 10
    },
    textinputview: {
        marginHorizontal: "5%",
        height: 50,
        borderRadius: 5,
        fontSize: 12,
        backgroundColor: white,
        color: lightgray,
        fontWeight: "800"
    },
    togglestyle: {
        marginTop: 0,
        width: 30,
        height: 15,
        borderRadius: 25,
        padding: 0,
    },
    textbetween: {
        fontWeight: "600",
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
export default Profile