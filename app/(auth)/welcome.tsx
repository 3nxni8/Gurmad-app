import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import {onboarding} from "@/constants";


const Home = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/sign-up");
                }}
                style={styles.skipButton}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                ))}
            </Swiper>

            {/*<CustomButton*/}
            {/*    title={isLastSlide ? "Get Started" : "Next"}*/}
            {/*    onPress={() =>*/}
            {/*        isLastSlide*/}
            {/*            ? router.replace("/(auth)/sign-up")*/}
            {/*            : swiperRef.current?.scrollBy(1)*/}
            {/*    }*/}
            {/*    style={styles.button}*/}
            {/*/>*/}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    skipButton: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 20,
    },
    skipText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
    },
    dot: {
        width: 32,
        height: 4,
        marginHorizontal: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 9999,
    },
    activeDot: {
        width: 32,
        height: 4,
        marginHorizontal: 4,
        backgroundColor: "#0286FF",
        borderRadius: 9999,
    },
    slide: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 40,
    },
    titleText: {
        color: "#000",
        fontSize: 30,
        fontWeight: "bold",
        marginHorizontal: 40,
        textAlign: "center",
    },
    descriptionText: {
        fontSize: 16,
        fontFamily: "JakartaSemiBold",
        textAlign: "center",
        color: "#858585",
        marginHorizontal: 40,
        marginTop: 12,
    },
    button: {
        width: "91.666%",
        marginTop: 40,
        marginBottom: 20,
    },
});

export default Home;