import { Actionsheet } from "native-base"
import { appstyles } from "../Utils/styles"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { deviceHeight, deviceWidth } from "../Utils/dimensions"
import { EMAIL_ADDRESS, PHONE_NUMBER, boldfont } from "../Utils/defaults"
import { green } from "../Utils/colors"

const Contactusactionsheet = ({ dismiss }) => {


    return (
        <Actionsheet style={{ width: deviceWidth }} isOpen={true} onClose={() => dismiss()}>
            <Actionsheet.Content style={{ width: deviceWidth }}>
                <View style={{ paddingTop: 10, height: deviceHeight / 2, width: "90%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontFamily: boldfont, fontSize: 23 }}>Contact us </Text>
                        <TouchableOpacity onPress={() => dismiss()}>
                            <MaterialIcons size={25} name="clear" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={appstyles.whatsappbutton} onPress={() => Linking.openURL(`whatsapp://send?text= Mobile app Help Center&phone=${PHONE_NUMBER}`)}>
                        <FontAwesome name="whatsapp" color={green} size={25} />
                        <Text style={appstyles.whatsapptext}>Write to whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${PHONE_NUMBER}`)}>
                        <Text style={appstyles.linktext}>{PHONE_NUMBER}</Text>
                    </TouchableOpacity>
                    <Text style={appstyles.bottonlinktext}>Support service</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${EMAIL_ADDRESS}`)}>
                        <Text style={appstyles.linktext}>{EMAIL_ADDRESS}</Text>
                    </TouchableOpacity>
                    <Text style={appstyles.bottonlinktext}>Mail address</Text>
                    <TouchableOpacity>
                        <Text style={appstyles.scheduletext}>Mon-Sat: 8AM-6PM, Sun: 8AM-5PM</Text>
                    </TouchableOpacity>
                    <Text style={appstyles.bottonlinktext}>Schedule</Text>
                </View>
            </Actionsheet.Content>
        </Actionsheet>
    )
}

export default Contactusactionsheet