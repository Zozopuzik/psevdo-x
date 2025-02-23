import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../fireBaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useUserStore from "../../Stores/userStore";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUser } = useUserStore();

  const handleSignIn = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      if (emailRegex.test(email)) {
        if (password === confirmPassword) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          setUser(user);
          console.log("user", user);
        } else {
          Alert.alert("Hey, there", "Passwords must be same");
        }
      } else {
        Alert.alert("Hey, there", "Enter a valid email");
      }
    } catch (error) {
      let errorToShow = error.code.replace("auth/", "").replace("-", " ");
      errorToShow = errorToShow.charAt(0).toUpperCase() + errorToShow.slice(1);
      console.log(errorToShow);
      Alert.alert("Hey, there", `We found an issue:\n${errorToShow}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.white}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.white}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.white}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => handleSignIn()}>
        <Text style={styles.btnTxt}>Sign In</Text>
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
    color: colors.white,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 40,
    color: colors.white,
    paddingHorizontal: 2,
    marginVertical: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: colors.white,
    borderWidth: 2,
  },
  btn: {
    width: "60%",
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    textTransform: "uppercase",
    color: colors.mainBlue,
    width: "100%",
    textAlign: "center",
    fontWeight: 500,
  },
});
