import React, { useState } from "react";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";
import Backicon from "../../../Components/backicon";;
import { black, gray, lightblue, lightgray, secondarycolor, silver, textcolor, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import { Actionsheet, AlertDialog } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import axios from "axios";
import Getuserdetails from "../../../Utils/getuserdetails";
import Alertpopup from "../../../Components/alert";
import Successspinner from "../../../Components/successspinner";
import { Postissueurl } from "../../../Utils/urls";
import Loadingspinner from "../../../Components/loadingspinner";
import { appstyles } from "../../../Utils/styles";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { useNavigation } from "@react-navigation/native";




export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}



const Reportproblem = () => {


    const user = Getuserdetails()
    const navigation = useNavigation()
    const [stationid, setstationid] = useState('');
    const [problemtitle, setproblemtitle] = useState('');
    const [problemdescription, setproblemdescription] = useState('');
    const [image, setimage] = useState('');

    const [loading, setloading] = useState(false);
    const [successpinner, setsuccesspinner] = useState(false);

    //action sheet
    const [showsuggestionmenu, setshowsuggestionmenu] = useState(false);

    const suggestions = [
        "A coupon code didn't work",
        "I copied a code but it didn’t apply on the store",
        "The product link redirected to the wrong item",
        "A voucher expired too quickly",
        "The app is loading slowly or freezing",
        "Product images or details are not showing correctly",
        "I want to report a fake or misleading deal",
        "The app crashed when copying a coupon",
        "I can’t find vouchers for a specific store or brand",
        "Push notifications are not showing up",
        "I saw the same deal multiple times",
        "I’d like to suggest a new store or product category",
        "There’s a typo or incorrect info in a product",
        "General feedback or feature suggestion",
        "I had a different issue"
    ];





    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
        });

        if (result.canceled) return

        const type = result.assets[0].type;
        const fileInfo = await getFileInfo(result.assets[0].uri)
        const imagetype = result.assets[0].uri.split('.').pop();

        // const {width, height} = Image.resolveAssetSource(result.uri);
        // console.log(width)

        if (!fileInfo?.size) {
            AlertDialog("Can't select this file as the size is unknown")
            return
        }
        if (type === 'image') {
            const isLt15MB = isLessThanTheMB(fileInfo.size, 15)
            if (!isLt15MB) {
                AlertDialog("Image size must be smaller than 15MB")
                return
            }
        }
        if (imagetype !== "jpg" && imagetype !== "png" && imagetype !== "jpeg") {
            AlertDialog("Invalid format.Only images are allowed")
        } else {
            if (!result.canceled) {
                setimage(result.assets[0])

            }
        }
    };




    const onsubmitreport = () => {
        setloading(true)
        axios.post(Postissueurl, {
            fullname: user?.username,
            email: user?.email,
            phone: user?.phone,
            message: `${problemtitle}: ${problemdescription}`,
            imagestring: image?.base64,
        }).then(function (response) {
            setloading(false)
            if (!response.data.error) {
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

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            {loading && <Loadingspinner />}
            {successpinner && <Successspinner message={"Submitted successfully. We'll get back to you asap"} />}
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content" // Here is where you change the font-color
            />
            <Backicon />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Report Problem</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
                <View style={{ marginTop: 5, paddingVertical: 10, paddingHorizontal: "5%" }}>
                    <Text style={{ color: gray, fontFamily: boldfont }}>What was the problem?</Text>
                </View>
                <TextInput
                    value={problemtitle}
                    style={{ marginHorizontal: "5%", height: 50, borderRadius: 5, fontSize: 12 }}
                    underlineColor={white}
                    contentStyle={{ color: textcolor, fontFamily: lightfont }}
                    editable={false}
                    activeUnderlineColor={white}
                    right={<TextInput.Icon onPress={() => setshowsuggestionmenu(true)} icon={"chevron-down"} />}
                />
                <View style={{ marginTop: 5, paddingVertical: 10, paddingHorizontal: "5%" }}>
                    <Text style={{ color: gray, fontFamily: boldfont }}>Upload an image(optional)</Text>
                </View>
                {image ?
                    <TouchableOpacity onPress={() => pickImage()}>
                        <Image source={{ uri: image.uri }} style={styles.imageview} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.attachbutton} onPress={() => pickImage()}>
                        <AntDesign name="plus" size={25} />
                    </TouchableOpacity>
                }

                <View style={{ marginTop: 5, paddingVertical: 10, paddingHorizontal: "5%" }}>
                    <Text style={{ color: gray, fontFamily: boldfont }}>Problem description</Text>
                </View>
                <TextInput
                    value={problemdescription}
                    onChangeText={text => setproblemdescription(text)}
                    style={{ marginHorizontal: "5%", borderRadius: 5 }}
                    underlineColor={white}
                    textAlignVertical="top"
                    multiline={true}
                    contentStyle={{ color: textcolor, fontFamily: lightfont }}
                    activeUnderlineColor={white}
                />

                <TouchableOpacity style={styles.invitebutton} onPress={() => onsubmitreport()}>
                    <Text style={{ color: white, fontWeight: "bold" }}>Submit</Text>
                </TouchableOpacity>



            </ScrollView>
            <Actionsheet isOpen={showsuggestionmenu} onClose={() => setshowsuggestionmenu(false)}>
                <Actionsheet.Content>
                    <View style={{ width: "100%", height: deviceHeight }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            {suggestions.map((val, key) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setshowsuggestionmenu(false)
                                        setproblemtitle(val)
                                    }} style={styles.suggestionview} key={key}>
                                        <Text style={styles.suggestiontext}>{val}</Text>
                                        <FontAwesome name="angle-right" size={20} />
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>

                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    suggestionview: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginHorizontal: "5%"
    },
    suggestiontext: {
        width: "80%",
        color: gray,
        fontFamily: boldfont
    },
    invitebutton: {
        backgroundColor: secondarycolor,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        marginHorizontal: "5%",
        paddingVertical: 12,
        borderRadius: 5,
        marginVertical: 20
    },
    attachbutton: {
        backgroundColor: silver,
        marginHorizontal: "5%",
        height: 80,
        width: 80,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    imageview: {
        marginHorizontal: "5%",
        height: 80,
        width: 80,
        borderRadius: 5,
    }

})
export default Reportproblem