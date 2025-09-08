// app/(roots)/verification.tsx
import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { icons } from "@/constants";
import { useState } from "react";

const Verification = () => {
    const { email } = useLocalSearchParams();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const onPressVerify = () => {
        if (!code.trim()) {
            setError("Please enter a verification code");
            return;
        }
        // For UI testing, assume any non-empty code is correct
        router.push("/(roots)/(tabs)/home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Verification</Text>
                <Text style={styles.subText}>
                    Code has been sent to {email || "your email"}
                </Text>
                <InputField
                    label="Verification Code"
                    icon={icons.lock}
                    placeholder="Enter verification code"
                    value={code}
                    keyboardType="numeric"
                    onChangeText={setCode}
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
                <CustomButton
                    title="Verify Email"
                    onPress={onPressVerify}
                    bgColor={code.trim() ? "#168F4D" : "#9CA3AF"}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    formContainer: {
        padding: 20,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        fontFamily: "PlusJakartaSans-Bold",
    },
    subText: {
        fontFamily: "PlusJakartaSans-Regular",
        fontSize: 16,
        color: "#9ca3af",
        marginBottom: 20,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 14,
        marginTop: 4,
    },

});

export default Verification;