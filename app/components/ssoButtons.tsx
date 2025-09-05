import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/types";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return { backgroundColor: "#6B7280" }; // bg-gray-500
        case "danger":
            return { backgroundColor: "#EF4444" }; // bg-red-500
        case "success":
            return { backgroundColor: "#22C55E" }; // bg-green-500
        case "outline":
            return {
                backgroundColor: "transparent",
                borderColor: "#D1D5DB", // border-neutral-300
                borderWidth: 0.5,
            };
        default:
            return { backgroundColor: "#168F4D" };
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return { color: "#000" }; // text-black
        case "secondary":
            return { color: "#F3F4F6" }; // text-gray-100
        case "danger":
            return { color: "#FEE2E2" }; // text-red-100
        case "success":
            return { color: "#DCFCE7" }; // text-green-100
        default:
            return { color: "#fff" }; // text-white
    }
};

const SsoButtons = ({
                          onPress,
                          title,
                          bgVariant = "primary",
                          textVariant = "default",
                          IconLeft,
                          IconRight,
                          className,
                          bgColor,
                          textColor,
                          ...props
                      }: ButtonProps) => {
    // Determine background style - bgColor prop overrides bgVariant
    const backgroundStyle = bgColor ? { backgroundColor: bgColor } : getBgVariantStyle(bgVariant);

    // Determine text style - textColor prop overrides textVariant
    const textStyle = textColor ? { color: textColor } : getTextVariantStyle(textVariant);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    width: "100%",
                    marginBottom:3.5,
                    borderRadius: 12,
                    padding: 10,
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 2, // For Android shadow
                },
                backgroundStyle,
            ]}
            {...props}
        >
            {IconLeft && (
                <IconLeft style={{ marginRight: 12, width: 20, height: 20 }} />
            )}
            <Text
                style={[
                    {
                        fontSize: 16,
                        fontWeight: "600",
                        textAlign: "center",
                        flex: 1,
                    },
                    textStyle,
                ]}
            >
                {title}
            </Text>
            {IconRight && (
                <IconRight style={{ marginLeft: 12, width: 20, height: 20 }} />
            )}
        </TouchableOpacity>
    );
};

export default SsoButtons;