import React from "react";
import { View } from "react-native"
import { FadeLoading } from 'react-native-fade-loading';


const Fading = () => {
    const fadeprimary = "#d5d5d5"

    return (
        <View style={{ marginHorizontal: "5%", width: "90%" }}>
            {[...Array(5)].map((e, key) =>
                <View style={{ marginVertical: 5 }} key={key}>
                    <FadeLoading
                        primaryColor={fadeprimary}
                        secondaryColor="gray"
                        style={{
                            height: 20,
                            marginVertical: 5,
                            width: "100%",
                            borderRadius: 5,

                        }}
                        duration={3000}
                        animated={true} />
                    <FadeLoading
                         primaryColor={fadeprimary}
                        secondaryColor="gray"
                        style={{
                            height: 100,
                            marginVertical: 5,
                            width: "100%",
                            borderRadius: 5,

                        }}
                        duration={3000}
                        animated={true} />
                </View>
            )}
        </View>

    )
}

export default Fading;