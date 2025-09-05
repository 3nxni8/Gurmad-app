import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import CustomButton from "@/components/customButton";
import { icons } from "@/constants";


const GoogleIcon = () =>
    <Image source={icons.googleIcon}
           resizeMode="contain" />;
const AppleIcon = () => <Image source={icons.appleIcon}  resizeMode="contain" />;
const FacebookIcon = () => <Image source={icons.facebookIcon}  resizeMode="contain" />;
const EmailIcon = () => <Image source={icons.emailIcon} resizeMode="contain" />;
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

    const handleEmailPress = () => {
        // Navigate to email sign-up page
        router.replace("/(auth)/sign-up");
    };

    const handleLoginPress = () => {
        // Navigate to login page
        router.replace("/(auth)/login");
    };

    return (
        <SafeAreaView style={styles.safeArea}>

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
                    <CustomButton
                        title="Continue with Google"
                        onPress={handleGooglePress}
                        bgColor="#fff"
                        textColor="#000"
                        IconLeft={GoogleIcon}
                        disabled={isLoading}
                    />

                    <CustomButton
                        title="Continue with Apple"
                        onPress={handleApplePress}
                        bgColor="#000"
                        textColor="#fff"
                        IconLeft={AppleIcon}
                        disabled={isLoading}
                    />

                    <CustomButton
                        title="Continue with Facebook"
                        onPress={handleFacebookPress}
                        bgColor="#1877F2"
                        textColor="#fff"
                        IconLeft={FacebookIcon}
                        disabled={isLoading}
                    />

                    <CustomButton
                        title="Continue with Email"
                        onPress={handleEmailPress}
                        bgColor="#f1f1f1"
                        textColor="#000"
                        IconLeft={EmailIcon}
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
                        bgVariant="success"
                        textVariant="default"
                    />

                    {/* Login Link */}
                    <TouchableOpacity onPress={handleLoginPress}>
                        <Text style={styles.loginText}>Already have an account? Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
        paddingHorizontal: 40,
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
        color: "#00000",
        textAlign: "center",
        fontFamily: "PlusJakartaSans-Regular",

    },
    loginText: {
        marginTop: 20,
        color: "#000000",
        fontSize: 16,
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
    accountSection: {
        width: "100%",
        alignItems: "center",
    },

});

export default LetsGetStarted;