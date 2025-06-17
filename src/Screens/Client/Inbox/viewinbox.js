import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, TouchableOpacity, StyleSheet, Linking, Alert, RefreshControl } from "react-native";
import Opendrawer from "../../../Components/opendrawer";
import { black, lightgray, primarycolor, secondarycolor, silver, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import Loadingspinner from "../../../Components/loadingspinner";
import Successspinner from "../../../Components/successspinner";
import { Actionsheet } from "native-base";
import axios from "axios";
import Alertpopup from "../../../Components/alert";
import { Fetchmessagesurl, Readmessageurl } from "../../../Utils/urls";
import Getuserdetails from "../../../Utils/getuserdetails";
import { appstyles } from "../../../Utils/styles";
import { Dummymessagesarray } from "../../../Utils/dummy";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { useNavigation } from "@react-navigation/native";
import Backicon from "../../../Components/backicon";
import { sortByCreatedAtDescending } from "../../../Utils/functions";


const Viewinbox = () => {
    const navigation = useNavigation()
    const user = Getuserdetails()
    const [loading, setloading] = useState(false);
    const [successpinner, setsuccesspinner] = useState(false);

    const [showmessage, setshowmessage] = useState(false);
    const [iteminplay, setiteminplay] = useState('');
    const [allmessages, setallmessages] = useState([]);
    const [refreshing, setrefreshing] = useState(false);




    useEffect(() => {
        fetchmessages()
    }, []);


    //fetch messages
    const fetchmessages = () => {
        setloading(true)
        axios.post(Fetchmessagesurl).
            then(function (response) {
                setloading(false)
                if (!response.data.error) {
                    setallmessages(sortByCreatedAtDescending(response.data))
                } else {
                    Alertpopup(response.data.message)
                }
            }).catch(function (error) {
                setloading(false)
                Alertpopup("There was an error try again later")
                console.log(error)
            });
    }

    //fetch silent after read status changed
    const fetchsilent = () => {
        axios.post(Fetchmessagesurl).
            then(function (response) {
                if (!response.data.error) {
                    setallmessages(sortByCreatedAtDescending(response.data))
                }
            }).catch(function (error) {
            });
    }


    //read message
    const readmessage = (val) => {
        setiteminplay(val)
        setshowmessage(true)
        axios.put(Readmessageurl, {
            messageid: val.id
        }).then(function (response) {
            if (!response.data.error) {
                fetchsilent()
            }
        })
    }




    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            {successpinner && <Successspinner message={'Sad to see you leave. Your account is scheduled for deletion in the next 30 days before which you can restore'} />}
            {loading && <Loadingspinner />}
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content" // Here is where you change the font-color
            />
            <Backicon />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Notifications</Text>
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => fetchmessages()}
                    color='#4a43eb'
                    tintColor="#4a43eb"
                />
            }>
                <View style={{ marginHorizontal: "5%" }}>
                    {allmessages.map((val, key) => {
                        return (
                            <TouchableOpacity key={key} style={styles.messageview} onPress={() => readmessage(val)}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <Text style={{ fontFamily: boldfont, color: primarycolor }}>{val.title.substring(0, 20)}</Text>
                                    {!val.status && <View style={appstyles.unreadview} />}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, fontFamily: lightfont }}>{val.message.substring(0, 90)}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <Text></Text>
                                    <Text style={{ fontFamily: boldfont, fontSize: 10 }}>{new Date(val.created_at).toDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <Actionsheet isOpen={showmessage} onClose={() => setshowmessage(false)}>
                <Actionsheet.Content>
                    <View style={{ marginHorizontal: "5%", paddingTop: 10, height: deviceHeight / 2 }}>
                        <Text style={{ fontFamily: boldfont, color: primarycolor }}>{iteminplay.title}</Text>
                        <View>
                            <Text style={{ fontFamily: lightfont }}>{iteminplay.message}</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text></Text>
                            <Text style={{ fontFamily: boldfont, fontSize: 10 }}>{new Date(iteminplay.created_at).toDateString()}</Text>
                        </View>
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    messageview: {
        borderBottomWidth: 1,
        borderColor: secondarycolor,
        paddingTop: 5,
        paddingBottom: 10
    }
})
export default Viewinbox