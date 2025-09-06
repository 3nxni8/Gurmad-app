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
                        {/* Header Image Section */}
                        <View style={{ position: 'relative', width: '100%', height: 150 }}>
                            {/*<Image*/}
                            {/*    source={images.verificationHeader || images.onboarding1} // Fallback to onboarding1 if verificationHeader doesn't exist*/}
                            {/*    style={{ zIndex: 0, width: '100%', height: 150 }}*/}
                            {/*/>*/}
                            <Text style={{
                                fontSize: 24,
                                color: 'black',
                                fontFamily: 'PlusJakartaSans-Bold',
                                fontWeight: '600',
                                position: 'absolute',
                                bottom: 20,
                                left: 20
                            }}>
                                Verification
                            </Text>
                        </View>
                        {/* Content Section */}
                        <View style={{ padding: 20, minHeight: 300 }}>
                            <Text style={{
                                fontFamily: 'PlusJakartaSans-Regular',
                                fontSize: 16,
                                marginBottom: 20
                            }}>
                                We've sent a verification code to {form.email}.
                            </Text>
                            <InputField
                                label="Code"
                                icon={icons.lock}
                                placeholder="12345"
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
                                style={{ marginTop: 24, backgroundColor: '#22c55e' }}
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