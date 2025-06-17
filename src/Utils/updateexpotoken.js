import React, { useState, useEffect, useRef } from "react";
import { Text, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";


const appConfig = require("./../../app.json");
const projectId = appConfig?.expo?.extra?.eas?.projectId;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Updateexpotoken = () => {
    const [notification, setNotification] = useState(null);
    const notificationListener = useRef(null);
    const responseListener = useRef(null);

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => getdata(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

     const getdata = async (expotoken) => {
        try {
            const value = await AsyncStorage.getItem("details");
            if (value !== null) {
                const stored_data = JSON.parse(value);
                await AsyncStorage.setItem("details", JSON.stringify({ ...stored_data, expo_token: expotoken }));
            } else {
                await AsyncStorage.setItem("details", JSON.stringify({ expo_token: expotoken }));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return <Text></Text>;
};

const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync({ projectId: projectId })).data;
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
};

export default Updateexpotoken;
