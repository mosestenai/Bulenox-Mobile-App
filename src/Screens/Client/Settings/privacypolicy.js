import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StatusBar, StyleSheet } from "react-native";
import { primarycolor, white } from "../../../Utils/colors";
import { deviceHeight } from "../../../Utils/dimensions";
import Loadingspinner from "../../../Components/loadingspinner";
import { appstyles } from "../../../Utils/styles";
import Backicon from "../../../Components/backicon";
import { boldfont, EMAIL_ADDRESS, lightfont } from "../../../Utils/defaults";

const Privacypolicy = () => {
    const [loading, setloading] = useState(false);
    const [successpinner, setsuccesspinner] = useState(false);

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: white }}>
            {loading && <Loadingspinner />}
            <StatusBar
                backgroundColor={white}
                barStyle="dark-content" // Here is where you change the font-color
            />
            <Backicon />
            <View style={appstyles.screenheaderview}>
                <Text style={appstyles.screenheadertext}>Privacy Policy</Text>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: "5%" }}>
                    <Text style={{ fontFamily: lightfont, marginBottom: 100 }}>
                        <Text style={styles.title}>Privacy Policy – BulenoxCodes</Text>{`\n\n`}

                        <Text style={styles.boldtext}>1. Person responsible</Text>{`\n`}
                        This app is operated by: BulenoxCodes{`\n`}
                        Contact: {EMAIL_ADDRESS} {`\n\n`}

                        <Text style={styles.boldtext}>2. What data is collected?</Text>{`\n`}
                        BulenoxCodes does not require registration and does not collect any personal information (e.g. name, email).{`\n`}
                        However, to improve the app functionality, anonymous data is collected:{`\n`}
                        • How often a voucher code was copied{`\n`}
                        • How often a product link was clicked{`\n`}
                        • Device data (e.g. operating system, anonymous device ID for notifications){`\n\n`}

                        <Text style={styles.boldtext}>3. Push notifications</Text>{`\n`}
                        The app uses push notifications to inform you about new vouchers.{`\n`}
                        For this purpose, an anonymous device identifier is stored.{`\n`}
                        Notifications can be deactivated at any time in the device settings.{`\n\n`}

                        <Text style={styles.boldtext}>4. Affiliate links</Text>{`\n`}
                        Some links in the app lead to external websites (e.g. online shops) via so-called affiliate programs.{`\n`}
                        When you click, the third-party site can recognize that you were redirected via BulenoxCodes.{`\n`}
                        Please note the privacy policies of the linked sites.{`\n\n`}

                        <Text style={styles.boldtext}>5. Data storage and deletion</Text>{`\n`}
                        Only anonymous usage data is stored.{`\n`}
                        These are regularly deleted or aggregated.{`\n\n`}

                        <Text style={styles.boldtext}>6. Your rights</Text>{`\n`}
                        Since no personal data is processed, there are currently no rights to information, correction or deletion.{`\n`}
                        Should this change in future versions, appropriate options will be provided.{`\n\n`}

                        <Text style={styles.boldtext}>7. Changes to this Policy</Text>{`\n`}
                        This privacy policy may be updated if the app's functionality changes.{`\n`}
                        The current version can be viewed at any time in the app under “Privacy Policy”.{`\n`}
                        By continuing to use the app, you confirm that you have read and accepted this privacy policy.{`\n`}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: boldfont,
        fontSize: 18,
        marginBottom: 10
    },
    boldtext: {
        fontFamily: boldfont,
        marginTop: 15
    }
});

export default Privacypolicy;