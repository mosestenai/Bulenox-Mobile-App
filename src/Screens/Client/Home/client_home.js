import React, { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid, TextInput, RefreshControl, Linking } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth } from "../../../Utils/dimensions";
import { black, green, primarycolor, red, secondarycolor, semiprimarycolor, white } from "../../../Utils/colors";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import Loadingspinner from "../../../Components/loadingspinner";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { dummy_coupons } from "../../../Utils/dummy";
import { appstyles } from "../../../Utils/styles";
import { getTimeLeft, imageurl } from "../../../Utils/functions";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import { Copyproducturl, Fetchproductsurl } from "../../../Utils/urls";
import Alertpopup from "../../../Components/alert";
import Nodatacomponent from "../../../Components/nodata";
import Getuserdetails from "../../../Utils/getuserdetails";

const Clienthome = () => {
    const user = Getuserdetails()
    const insets = useSafeAreaInsets();
    const [loading, setloading] = useState(false);
    const [displayed_codes, setdisplayed_codes] = useState([]);
    const [all_products, setall_products] = useState([]);
    const [latestProduct, setLatestProduct] = useState(null);



    const [searchQuery, setSearchQuery] = useState("");

    const navigation = useNavigation()

    useEffect(() => {
        fetchproducts()
    }, []);



    const fetchproducts = () => {
        setloading(true)
        axios.post(Fetchproductsurl, {

        }).then(function (response) {
            setloading(false)
            if (!response.data.error) {
                const sortedProducts = [...response.data.products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setdisplayed_codes(sortedProducts);
                setall_products(sortedProducts);
                setLatestProduct(sortedProducts[0]);
            } else {
                Alertpopup(response.data.message)
            }
            // 
        }).catch(function (error) {
            setloading(false)
            Alertpopup("there was an error try again later")
            console.log(error)
        });
    }


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setdisplayed_codes(all_products);
        } else {
            const filtered = all_products.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setdisplayed_codes(filtered);
        }
    };

    const viewproduct = (product) => {
        navigation.navigate("productscreen", { item_url: product.item_url, expo_token: user?.expo_token })
    }

    const handleCopyCode = async (product) => {
        copyproduct(product)
        await Clipboard.setStringAsync(product?.product_code);
        // ToastAndroid.show("Code copied to clipboard", ToastAndroid.SHORT);
    }


    //copy product
    const copyproduct = (product) => {
        axios.post(Copyproducturl, {
            product_id: product.id,
            expo_token: user?.expo_token
        }).then((response) => {
            if (!response.data.error) {
                fetchproducts()
            }
        }).catch((error) => {
            console.log(error)
        })

    }


    return (
        <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
            {/* {loading && <Loadingspinner />} */}
            <StatusBar backgroundColor={primarycolor} barStyle="light-content" />

            {/* Top Notification Banner */}
            <View style={styles.ad_banner}>
                <View style={styles.banner_content}>
                    <Feather size={25} name="bell" color={secondarycolor} />
                    <View style={styles.banner_text_container}>
                        <Text style={styles.banner_title}>New Discount Code!</Text>
                        <Text style={styles.banner_subtitle} numberOfLines={1}>{latestProduct?.title}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => viewproduct(latestProduct)} style={styles.banner_close_button}>
                    <FontAwesome size={15} name="external-link" color={white} />
                </TouchableOpacity>
            </View>

            {/* Header Section */}
            <View style={[styles.ad_banner, styles.header_banner]}>
                <View style={styles.banner_content}>
                    <View style={styles.banner_text_container}>
                        <Text style={styles.header_title}>Bulenox Codes</Text>
                        <Text style={styles.header_subtitle}>Latest discount codes</Text>
                    </View>
                </View>
                <Image style={styles.logo_image} source={require("./../../../../assets/app_icon.png")} />
            </View>
            <View style={{ margin: 10, marginHorizontal: "5%" }}>
                <TextInput
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={{
                        backgroundColor: white,
                        borderRadius: 8,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderColor: primarycolor,
                        borderWidth: 1,
                        fontFamily: lightfont
                    }}
                    placeholderTextColor="#888"
                />
            </View>

            {/* Coupon List */}
            <ScrollView contentContainerStyle={styles.scroll_container} refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => fetchproducts()}
                    color={primarycolor}
                    tintColor={secondarycolor}
                />
            }>
                {displayed_codes.map((product, key) => {
                    const expiry = getTimeLeft(product.expiry_date);
                    const first_image = product.images[0];

                    const copyCount = parseInt(product?.copies?.reduce((a, b) => a + parseInt(b.count), 0)) || 0;
                    const viewsCount = parseInt(product?.views?.reduce((a, b) => a + parseInt(b.count), 0)) || 0;




                    return (
                        <View key={key} style={styles.product_card}>
                            <View style={styles.product_image_wrapper}>
                                <Image source={{ uri: imageurl(first_image?.image_name) }} style={styles.product_image} />
                            </View>
                            <View style={styles.product_details}>
                                <View style={styles.product_header}>
                                    <Text style={styles.product_brand}>{product.brand}</Text>
                                    {expiry === "Expired" ? (
                                        <View style={styles.expired_tag}>
                                            <Text style={styles.expired_text}>Expired</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity onPress={() => viewproduct(product)} style={styles.angle_button}>
                                            <FontAwesome size={20} name="angle-right" color={primarycolor} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <TouchableOpacity disabled={expiry === "Expired"} onPress={() => viewproduct(product)}>
                                    <Text style={styles.product_title}>{product.title}</Text>
                                    <Text numberOfLines={2} style={styles.product_description}>{product.description}</Text>
                                </TouchableOpacity>
                                <View style={styles.code_row}>
                                    <View style={styles.code_left}>
                                        <View style={styles.code_box}>
                                            <Text style={{ color: primarycolor }}>{product.code}</Text>
                                        </View>
                                        <TouchableOpacity disabled={expiry === "Expired"} onPress={() => expiry === "Expired" ? {} : handleCopyCode(product)} style={appstyles.copy_button}>
                                            <Feather size={18} name="copy" color={white} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity disabled={expiry === "Expired"} onPress={() => Linking.openURL(product?.link)} style={[appstyles.copy_button, { backgroundColor: secondarycolor }]}>
                                        <FontAwesome size={18} name="external-link" color={white} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.stats_row}>
                                    <Text style={styles.stats_text}>Copied {copyCount} times</Text>
                                    <Text style={styles.stats_text}>Clicked {viewsCount} times</Text>
                                    <View style={styles.expiry_wrapper}>
                                        <Feather name="clock" color={expiry === 'Expired' ? red : green} />
                                        <Text style={[styles.expiry_text, { color: expiry === 'Expired' ? red : green }]}>{expiry}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
                {displayed_codes.length < 1 && !loading && <Nodatacomponent text={"No products yet"} />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ad_banner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primarycolor,
        justifyContent: "space-between",
        padding: 10,
    },
    header_banner: {
        backgroundColor: white,
        paddingTop: 10,
    },
    banner_content: {
        flexDirection: "row",
        alignItems: "center",
    },
    banner_text_container: {
        marginLeft: 5,
    },
    banner_title: {
        color: white,
        fontSize: 15,
        fontFamily: boldfont,
    },
    banner_subtitle: {
        color: white,
        fontSize: 13,
        fontFamily: lightfont,
    },
    header_title: {
        color: primarycolor,
        fontSize: 25,
        fontFamily: boldfont,
    },
    header_subtitle: {
        color: black,
        fontSize: 13,
        fontFamily: lightfont,
    },
    banner_close_button: {
        padding: 10,
    },
    logo_image: {
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    scroll_container: {
        marginHorizontal: "5%",
        paddingBottom: 50
    },
    product_card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: white,
        padding: 5,
        borderRadius: 5,
        elevation: 1,
        marginVertical: 10,
        maxWidth: "100%",
    },
    product_image_wrapper: {
        width: "20%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    product_image: {
        height: "100%",
        width: "100%",
        resizeMode: "contain"
    },
    product_details: {
        marginLeft: 5,
        width: "75%",
    },
    product_header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    product_brand: {
        color: primarycolor,
        fontSize: 13,
        fontFamily: lightfont,
    },
    expired_tag: {
        backgroundColor: red,
        borderRadius: 10,
        padding: 4,
    },
    expired_text: {
        color: white,
        fontSize: 12,
    },
    angle_button: {
        padding: 5,
    },
    product_title: {
        fontSize: 18,
        fontFamily: boldfont,
    },
    product_description: {
        fontSize: 15,
        fontFamily: lightfont,
    },
    code_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    code_left: {
        flexDirection: "row",
    },
    code_box: {
        backgroundColor: semiprimarycolor,
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    stats_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    stats_text: {
        color: primarycolor,
        fontFamily: lightfont,
        fontSize: 10,
    },
    expiry_wrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    expiry_text: {
        color: red,
        fontFamily: lightfont,
        fontSize: 10,
        marginLeft: 1,
    },
});

export default Clienthome;