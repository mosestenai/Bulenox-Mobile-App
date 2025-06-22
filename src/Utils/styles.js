import { StyleSheet } from "react-native";
import { deviceHeight, deviceWidth } from "./dimensions";
import { black, gray, green, lightgray, primarycolor, secondarycolor, semiprimarycolor, silver, white } from "./colors";
import { boldfont, lightfont } from "./defaults";




export const appstyles = StyleSheet.create({
    unreadview: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: black
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 15,
        backgroundColor: "red",
        position: "absolute",
        right: -5,
        top: -5
    },
    wrapselect: {
        marginTop: 10,
        flex: 1,
        zIndex: 5
    },
    pickerview: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderRadius: 0,
        borderColor: primarycolor,
        zIndex: 5
    },
    selectimageprofile: {
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dotted",
        marginTop: 10
    },
    inactivebutton: {
        backgroundColor: semiprimarycolor,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30
    },
    appsecondarybutton: {
        backgroundColor: secondarycolor,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 30
    },
    screenheaderview: {
        paddingTop: 30,
        backgroundColor: white,
        paddingHorizontal: "15%",
        alignItems: "center",
        paddingBottom: 30
    },
    screenheadertext: {
        fontSize: 20,
        fontFamily: boldfont
    },
    scheduletext: {
        fontFamily: boldfont
    },
    bottonlinktext: {
        color: semiprimarycolor,
        fontFamily: lightfont,
        marginBottom: 10
    },
    whatsappbutton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
        elevation: 3,
        paddingVertical: 15,
        borderColor: silver,
        borderRadius: 2
    },
    whatsapptext: {
        color: green,
        fontSize: 20,
        fontFamily: boldfont,
        marginLeft: 5
    },
    mainbutton: {
        backgroundColor: primarycolor,
        height: 50,
        marginVertical: 15,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    mainbuttontext: {
        color: white,
        fontFamily: boldfont,
        fontSize: 20
    },
    linktext: {
        color: primarycolor,
        fontFamily: boldfont,
        textDecorationLine: "underline"
    },
    normalbuttontext: {
        fontFamily: boldfont,
        color: primarycolor
    },
    safeareastyle: {
        height: "100%",
        width: deviceWidth,
        backgroundColor: semiprimarycolor
    },
    wraplogo: {
        height: 60,
        width: 70,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: primarycolor
    },
    screenhead: {
        marginTop: deviceHeight / 6,
        width: "90%",
        marginHorizontal: "5%"
    },
    pagetitle: {
        color: primarycolor,
        fontSize: 20,
        fontFamily: boldfont,
        marginVertical: 10
    },
    pageminititle: {
        color: gray,
        fontSize: 12,
        fontFamily: lightfont
    },
    floatinglady: {
        position: "absolute",
        height: 250,
        maxWidth: 150,
        right: "10%",
        top: 40,
        zIndex: 7
    },
    screenminiform: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: 20,
        padding: 10
    },
    copy_button: {
        backgroundColor: primarycolor,
        height: 30,
        width: 30,
        borderRadius:5,
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center"
    }

})