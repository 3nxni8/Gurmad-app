import onboarding1 from "@assets/images/onboarding1.png";
import onboarding2 from "@assets/images/onboarding2.png";
import onboarding3 from "@assets/images/onboarding3.gif";

// icons import here
import facebookIcon from "@assets/icons/facebookicon.png";
import googleIcon from "@assets/icons/googleicon.png";
import appleIcon from "@assets/icons/appleicon.png";
import person from "@assets/icons/person.png";
import lock from "@assets/icons/lock.png";
import email from "@assets/icons/email.png";



export const icons = {
    facebookIcon,
    googleIcon,
    appleIcon,
    person,
    lock,
    email,

}





export const images = {
    onboarding1,
    onboarding2,
    onboarding3,
}


export const onboarding = [
    {
        id: 1,
        title: "Community-Powered Fundraising.",
        description:
            "Welcome to the trusted way to raise funds together. Our platform simplifies  contributions,at LargeScale",
        image: images.onboarding1,
    },
    {
        id: 2,
        title: "Initiate a Campaign",
        description:
            "Have a project or community goal? Create a campaign, set a target, and we'll handle the secure payouts and transparent tracking.",
        image: images.onboarding2,
    },
    {
        id: 3,
        title: "Contribute with Transparency",
        description:
            "Join a trusted group and make a , See exactly how much has been raised ",
        image: images.onboarding3,
    },
];