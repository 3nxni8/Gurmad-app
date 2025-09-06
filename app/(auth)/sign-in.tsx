import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import {useState} from "react";
import { useSignIn } from "@clerk/clerk-expo";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { icons} from "@/constants";
import { router } from "expo-router";

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onSignInPress = async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/(roots)/(tabs)/home");
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling
                // for more info on error handling
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };

    // Check if form is filled to determine button styling
    const isFormFilled = form.email.trim() !== '' && form.password.trim() !== '';

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Welcome Back</Text>

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
                        title="Sign In"
                        onPress={onSignInPress}
                        bgColor={isFormFilled && isLoaded ? "#168F4D" : "#9CA3AF"}
                        style={styles.button}
                    />
                </View>
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
export default SignIn;