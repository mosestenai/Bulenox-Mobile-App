import React, { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"
import { primarycolor } from "../../Utils/colors"
import Contactusactionsheet from "../../Components/contactusactionsheet"
import { boldfont, lightfont } from "../../Utils/defaults"

const Customerservice = () => {
    const [showcontacts, setshowcontacts] = useState(false);

    return (
        <TouchableOpacity onPress={() => setshowcontacts(true)} style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: 40 }}>
            <MaterialIcons color={primarycolor} size={20} name="support-agent" />
            <Text style={{ marginLeft: 5, fontFamily: boldfont, color: primarycolor }}>Customer Service</Text>
            {/* action sheets */}
            {showcontacts && <Contactusactionsheet dismiss={() => setshowcontacts(false)} />}
        </TouchableOpacity>
    )
}

export default Customerservice