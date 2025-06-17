import React, { useEffect, useState } from "react"
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ToastAndroid,
    Linking
} from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { deviceHeight, deviceWidth } from "../../../Utils/dimensions";
import { black, primarycolor, red, secondarycolor, semiprimarycolor, semisecondarycolor, white } from "../../../Utils/colors";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import Loadingspinner from "../../../Components/loadingspinner";
import { boldfont, lightfont } from "../../../Utils/defaults";
import { dummy_coupons } from "../../../Utils/dummy";
import { getTimeLeft, imageurl } from "../../../Utils/functions";
import * as Clipboard from 'expo-clipboard';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Copyproducturl, Fetchsingleproducturl, Viewproducturl } from "../../../Utils/urls";
import axios from "axios";
import Alertpopup from "../../../Components/alert";
import { RefreshControl } from "react-native";
import { useCountdown } from "../../../hooks/useCountDown";

const ProductScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const insets = useSafeAreaInsets();
    const { item_url, expo_token = 'EXPJ_DEMO' } = route.params
    const [loading, setloading] = useState(true);

    const [product_data, setproduct_data] = useState('');
    const [current_image, setcurrent_image] = useState('');

    useEffect(() => {
        fetchproduct(true)
    }, []);

    const fetchproduct = (record_view) => {
        setloading(true)
        axios.post(Fetchsingleproducturl, {
            item_url: item_url
        }).then(function (response) {
            setloading(false)
            if (!response.data.error) {
                const received_product = response.data?.product_data
                setproduct_data(received_product)
                setcurrent_image(received_product.images[0])
                if (record_view) {
                    viewproduct(received_product?.id)
                }
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

    //handle view product 
    const viewproduct = (product_id) => {
        axios.post(Viewproducturl, {
            product_id,
            expo_token
        }).catch((error) => {
            console.log(error)
        })
    }

    //copy product
    const copyproduct = () => {
        axios.post(Copyproducturl, {
            product_id: product_data.id,
            expo_token
        }).catch((error) => {
            console.log(error)
        })

    }

    const handleCopyCode = async () => {
        await Clipboard.setStringAsync(product_data.code);
        copyproduct();

        // Optimistically update local copy count
        const newCopies = [...(product_data?.copies || [])];
        newCopies.push({ count: 1 }); // or a proper structure if needed

        setproduct_data({
            ...product_data,
            copies: newCopies
        });


    };

    const countdown = useCountdown(product_data?.expiry_date);

    const copyCount = parseInt(product_data?.copies?.reduce((a, b) => a + parseInt(b.count), 0)) || 0;
    const viewsCount = parseInt(product_data?.views?.reduce((a, b) => a + parseInt(b.count), 0)) || 0;

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
            <StatusBar backgroundColor={white} barStyle="dark-content" />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
                    <AntDesign size={25} name="close" color={primarycolor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Coupon Details</Text>
            </View>
            <View style={styles.mainCard}>
                <View style={{ height: 200 }}>
                    <Image source={{ uri: imageurl(current_image?.image_name) }} style={styles.mainImage} />
                </View>
                <ScrollView horizontal style={styles.thumbnailScroll}>
                    {product_data?.images?.map((image, key) => {
                        const is_active = current_image.id === image.id
                        return (
                            <TouchableOpacity
                                onPress={() => setcurrent_image(image)}
                                style={[styles.mini_image, { borderColor: is_active ? secondarycolor : white }]}
                                key={key}
                            >
                                <Image source={{ uri: imageurl(image?.image_name) }} style={styles.thumbnailImage} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <ScrollView contentContainerStyle={{ paddingBottom: 100, marginHorizontal: "5%" }} refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => fetchproduct()}
                        color={primarycolor}
                        tintColor={secondarycolor}
                    />
                }>

                    <View style={styles.rowBetween}>
                        <View style={styles.code_box}>
                            <Text style={styles.code_brand}>{product_data?.brand}</Text>
                        </View>
                        <View style={styles.expiry_wrapper}>
                            <Feather name="clock" color={red} />
                            <Text style={styles.expiry_text}>{countdown}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{product_data?.title}</Text>
                    <Text style={styles.description}>{product_data?.description}</Text>
                    <View style={styles.codeContainer}>
                        <Text style={styles.couponLabel}>Coupon Code</Text>
                        <View style={styles.rowBetween}>
                            <View style={styles.dashedCodeBox}>
                                <Text style={styles.couponCode}>{product_data?.code}</Text>
                            </View>
                            <TouchableOpacity onPress={handleCopyCode} style={styles.copyButton}>
                                <Feather size={18} name="copy" color={white} />
                                <Text style={styles.copyText}>Copy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL(product_data?.link)} style={styles.storeButton}>
                        <FontAwesome size={18} name="external-link" color={white} />
                        <Text style={styles.storeButtonText}>Visit Store</Text>
                    </TouchableOpacity>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox(semiprimarycolor)}>
                            <Text style={styles.statCount(primarycolor)}>{copyCount}</Text>
                            <Text style={styles.statLabel(primarycolor)}>Times Copied</Text>
                        </View>
                        <View style={styles.statBox(semisecondarycolor)}>
                            <Text style={styles.statCount(secondarycolor)}>{viewsCount}</Text>
                            <Text style={styles.statLabel(secondarycolor)}>Times Clicked</Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 5,
        backgroundColor: white,
        flexDirection: "row",
        alignItems: "center"
    },
    headerTitle: {
        color: primarycolor,
        fontSize: 25,
        fontFamily: boldfont,
        marginLeft: 10
    },
    mainCard: {
        backgroundColor: white,
        borderRadius: 20,
        marginHorizontal: "5%",
        marginTop: 5
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    thumbnailScroll: {
        marginHorizontal: 10,
        marginTop: 10
    },
    mini_image: {
        height: 80,
        width: 80,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 5
    },
    thumbnailImage: {
        height: "90%",
        width: "100%",
        resizeMode: 'contain'
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    code_box: {
        backgroundColor: semiprimarycolor,
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    code_brand: {
        color: primarycolor,
        fontFamily: lightfont
    },
    expiry_wrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    expiry_text: {
        color: red,
        fontFamily: lightfont,
        fontSize: 15,
        marginLeft: 5
    },
    title: {
        fontFamily: boldfont,
        fontSize: 25,
        marginTop: 10
    },
    description: {
        fontFamily: lightfont,
        fontSize: 15,
        marginVertical: 10
    },
    codeContainer: {
        backgroundColor: semiprimarycolor,
        padding: 10,
        borderRadius: 5
    },
    couponLabel: {
        color: primarycolor,
        fontFamily: lightfont,
        marginTop: 5
    },
    dashedCodeBox: {
        backgroundColor: white,
        width: "70%",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: primarycolor,
        padding: 10
    },
    couponCode: {
        color: primarycolor,
        fontFamily: boldfont
    },
    copyButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primarycolor,
        padding: 10,
        borderRadius: 5
    },
    copyText: {
        color: white,
        fontSize: 15,
        marginLeft: 5
    },
    storeButton: {
        backgroundColor: secondarycolor,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 15,
        borderRadius: 10,
        width: "100%",
        marginVertical: 10
    },
    storeButtonText: {
        color: white,
        fontFamily: boldfont,
        fontSize: 18,
        marginLeft: 5
    },
    statsRow: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    statBox: (bgColor) => ({
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        width: "45%",
        backgroundColor: bgColor,
        borderRadius: 5
    }),
    statCount: (color) => ({
        color,
        fontSize: 20,
        fontFamily: boldfont
    }),
    statLabel: (color) => ({
        color,
        fontSize: 16,
        fontFamily: lightfont
    })
})

export default ProductScreen