import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { icons } from "@/constants";

const LogIn = () => {
    const insets = useSafeAreaInsets();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // Handle Log In button press to navigate to home screen
    const onLogInPress = () => {
        if (!isFormFilled) {
            Alert.alert("Error", "Please fill out all fields");
            return;
        }
        // Navigate to home tabs (group segments are omitted at runtime, but this path is kept if your router expects it)
        router.push("/(roots)/(tabs)/home");
    };

    // Check if form is filled to determine button state
    const isFormFilled = form.email.trim() !== "" && form.password.trim() !== "";

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "white" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >
            <SafeAreaView style={styles.container}>
                {/* Content */}
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formContainer}>
                            <View style={styles.headerRow}>
                                {/* Use router.back() to go to the previous screen */}
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Image
                                        source={icons.backArrow}
                                        style={{ width: 24, height: 24, marginRight: 12 }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.headerText}>Welcome Back 👋</Text>
                            <Text style={styles.descriptionText}>Log in to continue</Text>

                            <InputField
                                label="Email"
                                placeholder="Enter email"
                                icon={icons.email}
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                value={form.email}
                                onChangeText={(value) => setForm({ ...form, email: value })}
                            />

                            <InputField
                                label="Password"
                                placeholder="Enter password"
                                icon={icons.lock}
                                secureTextEntry={true}
                                textContentType="password"
                                value={form.password}
                                onChangeText={(value) => setForm({ ...form, password: value })}
                                marginVertical={16}
                            />

                            {/* Sign Up Link */}
                            <View style={styles.loginRow}>
                                <Text style={styles.loginText}>Don't have an account?</Text>
                                <Link href="/sign-up">
                                    <Text style={styles.loginTextBlue}> Sign Up</Text>
                                </Link>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Bottom Action - pinned, moves with keyboard */}
                <View style={[styles.bottomAction, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                    <CustomButton
                        title="Log In"
                        onPress={onLogInPress}
                        disabled={!isFormFilled}
                        accessibilityLabel="Log in"
                    />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        paddingBottom: 24,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    formContainer: {
        padding: 20,
        paddingTop: 20,
    },

    loginRow: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    loginText: {
        color: "#6B7280",
        fontSize: 16,
        fontFamily: "PlusJakartaSans-Bold",
    },
    loginTextBlue: {
        color: "#0286FF",
        fontSize: 16,
        textDecorationLine: "underline",
        fontFamily: "PlusJakartaSans-Bold",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 6,
        fontFamily: "PlusJakartaSans-Bold",
    },
    descriptionText: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 12,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    bottomAction: {
        paddingHorizontal: 20,
        paddingTop: 8,
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderTopColor: "#E5E7EB",
    },
});

export default LogIn;