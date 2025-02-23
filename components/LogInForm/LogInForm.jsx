import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../fireBaseConfig";
import useUserStore from "../../Stores/userStore";

export default function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUserStore();
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(userCredential.user);
      console.log("User logged in:", user.email);
    } catch (error) {
      let errorToShow = error.code.replace("auth/", "").replace("-", " ");
      errorToShow = errorToShow.charAt(0).toUpperCase() + errorToShow.slice(1);
      console.log(errorToShow);
      Alert.alert("Hey, there", `We found an issue:\n${errorToShow}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>log in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.mainBlue}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.mainBlue}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.mainBlue}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt} onPress={() => handleLogin()}>
          log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    textTransform: "uppercase",
    width: "100%",
    color: colors.mainBlue,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 40,
    color: colors.mainBlue,
    paddingHorizontal: 2,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: colors.mainBlue,
    borderWidth: 2,
  },
  btn: {
    width: "60%",
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.mainBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    textTransform: "uppercase",
    color: colors.white,
    width: "100%",
    textAlign: "center",
    fontWeight: "500",
  },
});
