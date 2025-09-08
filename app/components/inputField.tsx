import {
    TextInput,
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import { useState } from "react";

import { InputFieldProps } from "@/types/types";

const InputField = ({
                        label,
                        icon,
                        secureTextEntry = false,
                        labelStyle,
                        containerStyle,
                        inputStyle,
                        iconStyle,
                        backgroundColor = "#F1f4f8",
                        borderColor = "#Fafafa",
                        focusBorderColor = "#31905F",
                        placeholderTextColor = "#6B7280",
                        fontSize = 16,
                        inputFontSize = 15,
                        marginTop = 0,
                        marginVertical = 12,
                        padding = 16,
                        borderWidth = 1,
                        borderRadius = 12,
                        iconSize = 24,
                        ...props
                    }: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={[
                styles.fieldContainer,
                {
                    marginBottom: marginVertical,
                },
                containerStyle,
            ]}
        >
            <Text
                style={[
                    {
                        fontSize,
                        fontWeight: "600",
                        marginBottom: 8,
                    },
                    labelStyle,
                ]}
            >
                {label}
            </Text>
            <View
                style={[
                    {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor,
                        borderRadius,
                        borderWidth,
                        borderColor: isFocused ? focusBorderColor : borderColor,
                    },
                ]}
            >
                {icon && (
                    <Image
                        source={icon}
                        style={[
                            {
                                width: iconSize,
                                height: iconSize,
                                marginLeft: 16,
                            },
                            iconStyle,
                        ]}
                    />
                )}
                <TextInput
                    style={[
                        {
                            flex: 1,
                            padding,
                            fontSize: inputFontSize,
                            fontWeight: "600",
                            textAlign: "left",
                            borderRadius,
                        },
                        inputStyle,
                    ]}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={placeholderTextColor}
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fieldContainer: {
        width: "100%",
    }
});

export default InputField;
