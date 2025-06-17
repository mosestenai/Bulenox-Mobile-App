import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { Image, StatusBar, TouchableOpacity, View } from "react-native"
import { black, primarycolor } from "../Utils/colors"
import { backbuttonheight, backbuttonpadding } from "../Utils/defaults"


const Opendrawer = ({ navigation }) => {

    const open = () => {
        StatusBar.setBackgroundColor(primarycolor)
        StatusBar.setBarStyle("light-content")
        navigation.openDrawer()
    }

    return (
        <TouchableOpacity style={{
            paddingTop: backbuttonpadding,
            paddingLeft: 10,
            paddingRight: 20,
            paddingBottom: 20,
            zIndex: 10,
            position: "absolute"
        }} onPress={() => open()}>
            {/* <FontAwesome name="angle-left" color={black} size={25} /> */}
            <Image source={require("./../../assets/images/common/back.jpg")} style={{ height: backbuttonheight, width: backbuttonheight, borderRadius: backbuttonheight }} />
        </TouchableOpacity>
    )
}

export default Opendrawer