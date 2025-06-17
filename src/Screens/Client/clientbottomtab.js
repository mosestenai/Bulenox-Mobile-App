import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from "@expo/vector-icons";
import { gray, primarycolor, secondarycolor, semiprimarycolor, silver, white } from "../../Utils/colors";
import { Platform } from "react-native";
import Account from "./Account/account";
import Clienthome from "./Home/client_home";







// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Bottomtabstack = createNativeStackNavigator();





//Home stack
function HomeStackScreen() {
    return (
        <Bottomtabstack.Navigator screenOptions={{ headerShown: false }} initialRouteName="homedash">
            <Bottomtabstack.Screen name="homedash" component={Clienthome} />

        </Bottomtabstack.Navigator>
    );
}


//My rides
function CenterStackScreen() {
    return (
        <Bottomtabstack.Navigator screenOptions={{ headerShown: false }} initialRouteName="account">
            <Bottomtabstack.Screen name="account" component={Account} />

        </Bottomtabstack.Navigator>
    );
}





export default function Clientbottomtabs() {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    }
                    else if (route.name === 'Account') {
                        iconName = focused ? 'user-alt' : 'user-alt';
                    }

                    // You can return any component that you like here!
                    return <FontAwesome5
                        name={iconName} size={25}
                        color={color}
                    />;
                },
                headerShown: false,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: primarycolor,
                tabBarStyle: { backgroundColor: white, height: Platform.OS === "ios" ? 80 : 50 },
                tabBarInactiveTintColor: "silver",
                tabBarBadgeStyle: { backgroundColor: secondarycolor }
            })}

        >
            <Tab.Screen name='Home' component={HomeStackScreen} />
            <Tab.Screen name="Account" component={CenterStackScreen} />

        </Tab.Navigator>

    );
}
