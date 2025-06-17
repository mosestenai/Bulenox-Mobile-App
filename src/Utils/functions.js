import * as FileSystem from 'expo-file-system'
import * as SecureStore from 'expo-secure-store';
import { Linking } from "react-native";
import { primarycolor } from "./colors";
import { Fetchassetsurl, Productimagesurl } from './urls';




export const currencyseperator = (amount) => {
    return amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0.00;
}

export function Makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}






//return todate date
export const Todaydate = () => {

    var currentdate = new Date();
    var year = currentdate.getFullYear();
    var month = (currentdate.getMonth() + 1).toString().length > 1 ? (currentdate.getMonth() + 1) : "0" + (currentdate.getMonth() + 1)
    var day = currentdate.getDate().toString().length > 1 ? currentdate.getDate() : "0" + currentdate.getDate();
    var today = year + "-" + month + "-" + day;

    return today;
}

//calculate distance between user and the driver
export function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d?.toFixed(2);

}
function toRad(Value) {
    return Value * Math.PI / 180;
}


//calculate package price
export function calculateprice(distance) {
    var fixedprice = 25
    var price = Math.round(distance * fixedprice);
    return price
}

//minutes to hours
export function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}hrs, ${Math.round(minutes)}min`;
}





export function addCurrentTimeToDuration(duration, pickupdate, pickuptime) {

    // Convert the date string to a Date object
    var date = new Date(pickupdate);

    // Extract the time components
    var timeComponents = pickuptime?.split(':');
    var hours = parseInt(timeComponents[0], 10);
    var minutes = parseInt(timeComponents[1], 10);

    // Set the time in the Date object
    date.setHours(hours);
    date.setMinutes(minutes);


    const durationRegex = /(?:([0-9]+)\s+hours?\s+)?(?:([0-9]+)\s+mins?)?/;
    const matches = duration.match(durationRegex);

    if (matches) {
        const hours = matches[1] ? parseInt(matches[1], 10) : 0;
        const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

        const currentTime = date;
        const arrivalTime = new Date();
        arrivalTime.setHours(currentTime.getHours() + hours);
        arrivalTime.setMinutes(currentTime.getMinutes() + minutes);

        return arrivalTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    }

    return null; // Invalid duration format
}


//change file to base64
export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


//shuffle an array
export const Shuffle = (array) => {
    if (Array.isArray(array)) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    } else {
        return [];
    }

}

//get file info
export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}
//image size
export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}

//open google map
export const googleMapOpenUrl = ({ latitude, longitude }) => {
    const latLng = `${latitude},${longitude}`;
    return `google.navigation:q=${latLng}`;
}

// Function to format timestamp to readable date
export function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Function to format timestamp to readable time
export function formatTimestampToTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString(undefined, options);
}
//function to format to readblae day time
export function formatTimeOfDay(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
        return "morning";
    } else if (hours >= 12 && hours < 15) {
        return "noon";
    } else if (hours >= 15 && hours < 18) {
        return "AfterNoon"
    } else {
        return "evening";
    }
}


//go to privacy policy
export const gotoprivacypolicy = () => {
    Linking.openURL("https://bulenox.app/privacypolicy")
}

//go to terms
export const gototerms = () => {
    Linking.openURL("https://bulenox.app/terms")
}


//get status color
export const statuscolor = (status) => {
    if (status == "Due") {
        return "orange"
    }
    if (status == "Overdue") {
        return "red"
    }
    if (status == "Paid") {
        return "green"
    }
    if (status == "Pending") {
        return "yellow"
    }
    if (status == "Rejected") {
        return "gray"
    }
    if (status == "Approved") {
        return primarycolor
    }
}

//store item securely
export const storesecureItem = async (key, password) => {
    try {
        await SecureStore.setItemAsync(key, password);
        console.log('Data stored securely!');
    } catch (error) {
        console.error('Error storing password:', error);
    }
};

//retrieve item 
export const retrievesecureItem = async (key) => {
    try {
        const stored_data = await SecureStore.getItemAsync(key);
        if (stored_data) {

            return stored_data;
        } else {
            console.log('No password found for this key.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving password:', error);
    }
}

//sort by created at descending
export function sortByCreatedAtDescending(data) {
    if (!Array.isArray(data)) {
        throw new Error("Input must be an array");
    }

    return data.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        if (isNaN(dateA) || isNaN(dateB)) {
            throw new Error("Invalid date format in created_at");
        }

        return dateB - dateA; // Descending order
    });
}


export function getTimeLeft(targetDateStr) {
    if (!targetDateStr) {
        return '0d 0h left'
    }
    const now = new Date();
    const target = new Date(targetDateStr);

    const diffMs = target - now;

    if (diffMs <= 0) {
        return "Expired";
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;

    return `${days}d ${hours}h left`;
}


//products image
export const imageurl = (image_name, in_assets) => {
    if (image_name) {
        if (in_assets) {
            return `${Fetchassetsurl}${image_name}`;
        } else {
            return `${Productimagesurl}${image_name}`;
        }
    }
}
