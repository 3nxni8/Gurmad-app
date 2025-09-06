import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    StyleSheet} from 'react-native';
import {useState} from "react";
// import { useSignUp } from "@clerk/clerk-expo";
import InputField from "@/components/inputField";
import CustomButton from "@/components/customButton";
import { icons} from "@/constants";
// import { router } from "expo-router";

const SignUp = () => {
    // const {isLoaded, signUp, setActive} = useSignUp();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    // const onSignUpPress = async () => {
    //     if (!isLoaded) return;
    //     try {s
    //         await signUp.create({
    //             firstName: form.name,
    //             emailAddress: form.email,
    //             password: form.password,
    //         });
    //
    //         // Set the user's email address
    //         await signUp.prepareEmailAddressVerification({ emailAddress: form.email });
    //
    //         // Navigate to the verification screen or directly sign in if no verification needed
    //         if (setActive) {
    //             await setActive({ session: signUp.createdSessionId });
    //             router.replace("/(roots)/(tabs)/home");
    //         }
    //     } catch (err) {
    //         console.error("Error during sign up:", err);
    //     }
    // };

    return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Create Your Account</Text>

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
                        onPress={() => console.log('Sign up pressed')}

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


});
export default SignUp;