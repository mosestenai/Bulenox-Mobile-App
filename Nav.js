import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loadingspinner from "./src/Components/loadingspinner";
import Settings from "./src/Screens/Client/Settings/settings";
import Profile from "./src/Screens/Client/Settings/profile";
import Changepass from "./src/Screens/Client/Settings/changepass";
import About from "./src/Screens/Client/Settings/about";
import Reportproblem from "./src/Screens/Client/Help/report";
import Viewinbox from "./src/Screens/Client/Inbox/viewinbox";
import Policyagreement from "./src/Screens/Common/policyagreement";
import Privacypolicy from "./src/Screens/Client/Settings/privacypolicy";
import LoadingScreen from "./src/Screens/Client/Home/loading_screen";
import Clientbottomtabs from "./src/Screens/Client/clientbottomtab";
import ProductScreen from "./src/Screens/Client/Home/view_product";




const Stack = createNativeStackNavigator();


export default function Nav() {

    const [initialized, setinitialized] = useState(true);


    return (
        <NavigationContainer>
            {initialized ?
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"loadingscreen"} >
                    <Stack.Screen name="loadingscreen" component={LoadingScreen} />
                    <Stack.Screen name="policyagreement" component={Policyagreement} />


                    {/* user routes */}
                    <Stack.Screen name="clientaccount" component={Clientbottomtabs} />

                     <Stack.Screen name="productscreen" component={ProductScreen} />


                    {/**Inbox */}
                    <Stack.Screen name="messagaes" component={Viewinbox} />

                    {/**Help */}
                    <Stack.Screen name="reportproblem" component={Reportproblem} />

                    {/**Settings */}
                    <Stack.Screen name="settings" component={Settings} />
                    <Stack.Screen name="profile" component={Profile} />
                    <Stack.Screen name="changepass" component={Changepass} />
                    <Stack.Screen name="about" component={About} />
                    <Stack.Screen name="privacypolicy" component={Privacypolicy} />




                </Stack.Navigator> : <Loadingspinner />
            }
        </NavigationContainer >


    );
}
