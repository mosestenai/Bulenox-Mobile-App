import { ToastAndroid } from "react-native"

const Maketoast = ({ message }) => {

    return (
        //function to make Toast With Duration, Gravity And Offset
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG, //can be SHORT, LONG
            ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
            25, //xOffset
            500 //yOffset
        )

    )
}

export default Maketoast