import { Stack } from 'expo-router';


const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }}  />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="letsGetStarted" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Layout;