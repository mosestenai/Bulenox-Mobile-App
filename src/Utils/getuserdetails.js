import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Getuserdetails = () => {
    const [data, setdata] = useState('');

    useEffect(() => {
        const getdata = async () => {
            try {
                const value = await AsyncStorage.getItem('details');
                if (value !== null) {
                    setdata(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
            }
        };
        getdata();
    }, []);

    return data;
}

export default Getuserdetails;
