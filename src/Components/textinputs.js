import { Text, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"
import { primarycolor, secondarycolor, white } from "../Utils/colors"
import { Fontisto } from "@expo/vector-icons"
import { lightfont } from "../Utils/defaults"

export const CustomTextinput = ({ label, value, onChange, autoComplete, keyboardType, autoCapitalize, right, secureTextEntry, defaultValue }) => {


    return (
        <TextInput
            label={<Text style={{ fontFamily: lightfont }}>{label}</Text>}
            value={value}
            defaultValue={defaultValue?.toString()}
            onChangeText={onChange}
            activeOutlineColor={primarycolor}
            activeUnderlineColor={primarycolor}
            outlineColor={primarycolor}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            keyboardType={keyboardType}
            underlineColor={white}
            right={right}
            contentStyle={{ color: primarycolor, fontFamily: lightfont }}
            style={{ marginTop: 10, height: 40 }}
            secureTextEntry={secureTextEntry}
        />
    )
}

export const Customcheckbox = ({ value, onChange }) => {

    return (
        <TouchableOpacity onPress={onChange}>
            <Fontisto color={"silver"} size={18} name={value ? "checkbox-active" : "checkbox-passive"} />
        </TouchableOpacity>)
}