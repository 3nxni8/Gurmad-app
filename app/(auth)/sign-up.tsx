import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { router } from "expo-router";
import ReactNativeModal from 'react-native-modal';

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [form, setForm] = useState({
        FullName: '',
        email: '',
        password: '',
    });

    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            // Set the user's email address
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerification({
                ...verification,
                state: "pending",
            });

        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error During SignUp", err.errors[0].longMessage);
        }
    };

    // Check if form is filled to determine button styling
    const isFormFilled = form.FullName.trim() !== '' && form.email.trim() !== '' && form.password.trim() !== '';

    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });
            if (completeSignUp.status === "complete") {
                await fetchAPI("/(api)/user", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.FullName,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                });
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({
                    ...verification,
                    state: "success",
                });
            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again.",
                    state: "failed",
                });
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({
                ...verification,
                error: err.errors[0].longMessage,
                state: "failed",
            });
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Create Your Account</Text>

                    <InputField
                        label="FullName"
                        placeholder="Enter name"
                        icon={icons.person}
                        value={form.FullName}
                        onChangeText={(value) => setForm({ ...form, FullName: value })}
                        isFirst={true}
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                        marginTop={16}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        marginTop={16}
                    />

                    <CustomButton
                        title="Sign Up"
                        onPress={onSignUpPress}
                        bgColor={isFormFilled && isLoaded ? "#168F4D" : "#9CA3AF"}
                        style={styles.button}
                    />
                </View>
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}>
                        {/* Content Section - Similar to Sign Screen */}
                        <View style={styles.formContainer}>
                            <Text style={styles.headerText}>Verification</Text>
                            <Text style={{
                                fontFamily: 'PlusJakartaSans-Regular',
                                fontSize: 16,
                                color: '#9ca3af',
                                marginBottom: 20
                            }}>
                                Code has been sent to {form.email}
                            </Text>
                            <InputField
                                label="Verification Code"
                                icon={icons.lock}
                                placeholder="Enter verification code"
                                value={verification.code}
                                keyboardType="numeric"
                                onChangeText={(code) =>
                                    setVerification({ ...verification, code })
                                }
                            />
                            {verification.error && (
                                <Text style={{
                                    color: '#ef4444',
                                    fontSize: 14,
                                    marginTop: 4
                                }}>
                                    {verification.error}
                                </Text>
                            )}
                            <CustomButton
                                title="Verify Email"
                                onPress={onPressVerify}
                                bgColor={verification.code.trim() !== '' ? "#168F4D" : "#9CA3AF"}
                                style={{ marginTop: 24 }}
                            />
                        </View>
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}>
                        {/* Content Section */}
                        <View style={{ padding: 20, minHeight: 300 }}>
                            <Text style={{
                                fontSize: 30,
                                fontFamily: 'PlusJakartaSans-Bold',
                                fontWeight: '700',
                                textAlign: 'center',
                                marginBottom: 8
                            }}>
                                Verified
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#9ca3af',
                                fontFamily: 'PlusJakartaSans-Regular',
                                textAlign: 'center',
                                marginBottom: 20
                            }}>
                                You have successfully verified your account.
                            </Text>
                            <CustomButton
                                title="Browse Home"
                                onPress={() => router.push(`/(roots)/(tabs)/home`)}
                                style={{ marginTop: 24 }}
                            />
                        </View>
                    </View>
                </ReactNativeModal>

            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainer: {
        padding: 20,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'PlusJakartaSans-Bold',
    },
    button: {
        marginTop: 24,
    }
});

export default SignUp;