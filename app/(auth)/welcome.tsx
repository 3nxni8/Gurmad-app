import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/customButton";
import { onboarding } from "@/constants";

// Home component for the onboarding screen
const Home = () => {
    // Reference to control the Swiper component
    const swiperRef = useRef<Swiper>(null);
    // State to track the current slide index
    const [activeIndex, setActiveIndex] = useState(0);
    const insets = useSafeAreaInsets();

    // Check if the current slide is the last one
    const isLastSlide = activeIndex === onboarding.length - 1;

    const goNext = () => {
        if (isLastSlide) {
            router.replace("/(auth)/letsGetStarted");
            return;
        }
        const swiper = swiperRef.current as any;
        if (!swiper) return;
        if (typeof swiper.scrollBy === "function") {
            swiper.scrollBy(1, true);
        } else if (typeof swiper.scrollTo === "function") {
            swiper.scrollTo(activeIndex + 1, true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip button - absolute, respects safe area */}
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/letsGetStarted");
                }}
                style={[
                    styles.skipButton,
                    { top: insets.top + 8 },
                ]}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Content */}
            <View style={styles.content}>
                {/* Swiper for displaying onboarding slides */}
                <Swiper
                    ref={swiperRef}
                    loop={false}
                    dot={<View style={styles.dot} />}
                    activeDot={<View style={styles.activeDot} />}
                    onIndexChanged={(index) => setActiveIndex(index)}
                    style={{ flex: 1 }}
                >
                    {onboarding.map((item) => (
                        // Individual slide for each onboarding item
                        <View key={item.id} style={styles.slide}>
                            {/* Image for the onboarding slide */}
                            <Image
                                source={item.image}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            {/* Container for the slide title */}
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{item.title}</Text>
                            </View>
                            {/* Description text for the slide */}
                            <Text style={styles.descriptionText}>{item.description}</Text>
                        </View>
                    ))}
                </Swiper>
            </View>

            {/* Bottom Action - pinned, respects bottom inset */}
            <View style={[styles.bottomAction, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                <CustomButton
                    title={isLastSlide ? "Get Started" : "Next"}
                    onPress={goNext}
                    accessibilityLabel={isLastSlide ? "Get Started" : "Next"}
                />
            </View>
        </SafeAreaView>
    );
};

/*
 * Styles for the onboarding screen
 * Organized using StyleSheet.create for performance
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    skipButton: {
        position: "absolute",
        right: 16,
        zIndex: 10,
        padding: 8,
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
        backgroundColor: "#168F4D",
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
        fontSize: 25,
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
    bottomAction: {
        paddingHorizontal: 20,
        paddingTop: 8,
        backgroundColor: "#fff",
        borderTopWidth: 0.5,
        borderTopColor: "#E5E7EB",
    },
});

export default Home;