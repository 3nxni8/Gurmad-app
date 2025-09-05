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

const CustomButton = ({
                          onPress,
                          title,
                          bgVariant = "primary",
                          textVariant = "default",
                          IconLeft,
                          IconRight,
                          className, // Note: className is ignored as we’re using inline styles
                          ...props
                      }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                {
                    width: "100%",
                    borderRadius: 25,
                    padding: 12,
                    marginVertical: 6,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4, // For Android shadow
                },
                getBgVariantStyle(bgVariant),
            ]}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text
                style={[
                    {
                        fontSize: 18,
                        fontWeight: "bold",
                    },
                    getTextVariantStyle(textVariant),
                ]}
            >
                {title}
            </Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
};

export default CustomButton;