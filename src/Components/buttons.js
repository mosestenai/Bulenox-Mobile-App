import { Text, TouchableOpacity } from "react-native"
import { appstyles } from "../Utils/styles"
import { primarycolor, white } from "../Utils/colors"
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons"

//next button
export const Nextbutton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={appstyles.buttonstyle}>
            <Text style={{ color: primarycolor }}>Next  </Text>
            <FontAwesome5 name="arrow-right" color={primarycolor} size={15} />
        </TouchableOpacity>
    )
}

//add button
export const Addbutton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={appstyles.buttonstyle}>
            <Text style={{ color: primarycolor }}>Add </Text>
            <Ionicons color={primarycolor} size={20} name="add-circle-outline" />
        </TouchableOpacity>
    )
}

//submit button
export const Submitbutton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={appstyles.buttonstyle}>
            <Text style={{ color: primarycolor }}>Submit </Text>
            <MaterialCommunityIcons color={primarycolor} size={20} name="content-save-check-outline" />
        </TouchableOpacity>
    )
}

//upload button
export const Uploadbutton = ({ onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={appstyles.buttonstyle}>
            <Text style={{ color: primarycolor }}>Upload </Text>
            <AntDesign color={primarycolor} size={20} name="clouduploado" />
        </TouchableOpacity>
    )
}

//contact us button
export const Contactusbutton = ({ onPress }) => {
    return (
        <TouchableOpacity style={appstyles.contactusbutton} onPress={() => onPress()}>
            <SimpleLineIcons name="earphones-alt" size={20} color={white} />
        </TouchableOpacity>)
}