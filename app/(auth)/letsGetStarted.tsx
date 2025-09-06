import { router, Link } from "expo-router";
import { useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

import SsoButtons from "@/components/ssoButtons";
import { icons } from "@/constants";
import CustomButton from "@/components/customButton";


const GoogleIcon = () =>
    <Image source={icons.googleIcon}
           resizeMode="contain" />;
const AppleIcon = () => <Image source={icons.appleIcon}  resizeMode="contain" />;
const FacebookIcon = () => <Image source={icons.facebookIcon}  resizeMode="contain" />;
// const EmailIcon = () => <Image source={icons.emailIcon} resizeMode="contain" />;
const LetsGetStarted = () => {
    // State or logic can be added here if needed
    const [isLoading, setIsLoading] = useState(false);

    const handleGooglePress = () => {
        // Placeholder for Google SSO logic
        setIsLoading(true);
        // Simulate SSO process
        setTimeout(() => {
            router.replace("/(auth)/sign-up");
            setIsLoading(false);
        }, 1000);
    };

    const handleApplePress = () => {
        // Placeholder for Apple SSO logic
        setIsLoading(true);
        setTimeout(() => {
            router.replace("/(auth)/sign-up");
            setIsLoading(false);
        }, 1000);
    };

    const handleFacebookPress = () => {
        // Placeholder for Facebook SSO logic
        setIsLoading(true);
        setTimeout(() => {
            router.replace("/(auth)/sign-up");
            setIsLoading(false);
        }, 1000);
    };



    // const handleLoginPress = () => {
    //     // Navigate to login page
    //     router.push("/(auth)/login");
    // };

    return (
        <ScrollView contentContainerStyle={styles.safeArea}>
            <View style={styles.container}>
                {/* App Title and Description */}
                <View style={styles.header}>
                    <Text style={styles.title}>Gurmad</Text>
                    <Text style={styles.subtitle}>
                        Sadaqah , Zakat, Fitrah and Donation made easy.
                    </Text>
                </View>

                {/* SSO Buttons Section */}
                <View style={styles.ssoSection}>
                    <SsoButtons
                        title="Continue with Google"
                        onPress={handleGooglePress}
                        bgColor="#fff"
                        textColor="#000"
                        IconLeft={GoogleIcon}
                        disabled={isLoading}
                    />

                    <SsoButtons
                        title="Continue with Apple"
                        onPress={handleApplePress}
                        bgColor="#000"
                        textColor="#fff"
                        IconLeft={AppleIcon}
                        disabled={isLoading}
                    />

                    <SsoButtons
                        title="Continue with Facebook"
                        onPress={handleFacebookPress}
                        bgColor="#1877F2"
                        textColor="#fff"
                        IconLeft={FacebookIcon}
                        disabled={isLoading}
                    />


                </View>

                {/* Separator */}
                <View style={styles.separator}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>or</Text>
                    <View style={styles.separatorLine} />
                </View>

                {/* Account Actions Section */}
                <View style={styles.accountSection}>
                    <CustomButton
                        title="Create Account"
                        onPress={() => router.replace("/(auth)/sign-up")}
                        bgVariant="primary"
                        textVariant="default"
                    />

                    {/* Login Link */}
                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>Already have an account?</Text>
                        <Link href="/(auth)/log-in">
                            <Text style={styles.loginTextBlue}> Log in</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

/*
 * Styles for the Let's Get Started screen
 * Organized using StyleSheet.create for performance
 */
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },


    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 25,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 40,
        color: "#0286FF",
        marginBottom: 10,
        fontFamily: "PlusJakartaSans-ExtraBold",
    },
    subtitle: {
        fontSize: 23,
        color: "#AAAAAA",
        textAlign: "center",
        fontFamily: "PlusJakartaSans-Regular",

    },
    accountSection: {
        width: "100%",
        alignItems: "center",
    },
    loginRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    loginText: {
        color: "#AAAAAA",
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "PlusJakartaSans-Bold",
    },
    loginTextBlue: {
        color: "#0286FF",
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "PlusJakartaSans-Bold",
    },
    ssoSection: {
        width: "100%",
        marginBottom: 20,
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        width: "100%",
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E5E5",
    },
    separatorText: {
        marginHorizontal: 15,
        color: "#666666",
        fontSize: 14,
        fontFamily: "PlusJakartaSans-Regular",
    },

});

export default LetsGetStarted;