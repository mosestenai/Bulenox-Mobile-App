import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Alert, Image, Platform, TouchableOpacity, View } from "react-native"
import { black } from "../Utils/colors"
import { Makeid } from "../Utils/functions"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backbuttonheight, backbuttonpadding } from "../Utils/defaults"



const Backicon = ({ marginTop, color, successmessage, route, screen, position, from }) => {
    const is_ios = Platform.OS === 'ios'

    const navigation = useNavigation()



    const back = () => {
        //if user exiting editting package
        if (from == 'account') {
            // navigation.dispatch(StackActions.pop(2))
            navigation.goBack();
            navigation.goBack();
        } else {
            exit()
        }
    }

    //exit or back
    const exit = () => {
        if (screen) {
            navigation.navigate(screen)
        } else {
            if (successmessage) {
                route.params.onSuccessactivity(Makeid(4))
                navigation.goBack();
            } else {
                navigation.goBack()
            }
        }
    }
    return (
        <TouchableOpacity style={{
            paddingTop: backbuttonpadding,
            paddingLeft: 10,
            paddingRight: 20,
            paddingBottom: 20,
            zIndex: 10,
            position: position ? position : "absolute",
            marginTop: is_ios ? 40 : marginTop
        }} onPress={() => back()}>
            <Image source={require("./../../assets/images/common/back.jpg")} style={{ height: backbuttonheight, width: backbuttonheight, borderRadius: backbuttonheight }} />
            {/* <FontAwesome name="angle-left" color={color ? color : black} size={25} /> */}
        </TouchableOpacity>
    )
}

export default Backicon