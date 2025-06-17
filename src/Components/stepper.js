import { Octicons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { gray, secondarycolor, silver, white } from "../Utils/colors"
import { boldfont } from "../Utils/defaults"

const Stepper = ({ percentage }) => {

    return (
        <View style={{ backgroundColor: "silver", width: "100%", height: 5, marginVertical: 10 }}>
            <View style={{marginTop:-6, backgroundColor: white, position: "absolute", flexDirection: "row", width: percentage == "0%" ? "10%" : percentage,alignItems:"center" }}>
                <View style={{ height: 5, backgroundColor: secondarycolor, width: percentage == "0%" ? "1%": "90%" }} />
                <Octicons name="dot-fill" size={20} color={secondarycolor} style={{ marginLeft: -5 }} />
                <Text style={{ fontFamily: boldfont, color: secondarycolor,backgroundColor:white }}>{percentage}</Text>
            </View>
        </View>
    )
}
export default Stepper