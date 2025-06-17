import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"


const Alertpopup = (text, action) => {

    if (typeof text !== 'string') {
        return (
            Alert.alert(
                "Error",
                text?.map((val, key) => (`${key}:${[val[0]]}`)),
                [
                    { text: "OK" }
                ]
            )
        )
    } else {
        return (
            Alert.alert(
                "Error",
                text,
                [
                    { text: "OK", onPress: action && action }
                ]
            )
        )
    }
}

export default Alertpopup;