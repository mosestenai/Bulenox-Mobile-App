import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View } from "react-native"
import { black, white } from "../Utils/colors"


const Cancelicon = ({ marginTop }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={{
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 20,
            paddingBottom: 20,
            zIndex: 10,
            position: "absolute",
            marginTop: marginTop
        }} onPress={() => navigation.goBack()}>
            <FontAwesome5 name="times" color={white} size={25} />
        </TouchableOpacity>
    )
}

export default Cancelicon