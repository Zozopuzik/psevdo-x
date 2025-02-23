import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useUserStore from "./Stores/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./Screens/MainScreen/MainScreen";
import PostScreen from "./Screens/PostScreen/PostScreen";
import { useEffect, useState } from "react";
import { auth } from "./fireBaseConfig";
import AuthScreen from "./Screens/AuthScreen/AuthScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_right",
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Post"
                component={PostScreen}
              />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
