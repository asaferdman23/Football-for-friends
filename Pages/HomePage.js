import { View, StyleSheet } from "react-native";
import Header from "../UiComponents/Header";
import Logo from "../UiComponents/Logo";
import SetPasswordButton from "../UiComponents/SetPasswordButton";
import ButtonToCheckSomething from "../UiComponents/ButtonToCheckSomething";
import LoginButton from "../UiComponents/LoginButton";
import SignUpButton from "../UiComponents/SignUpButton";
import { useNavigation } from '@react-navigation/native';


const signUpPage="SignUpPage";
const loginPage="LoginPage";

const HomeScreen = () => {
    const navigation = useNavigation();
    const handleLoginButtonPress = () => {
        console.log('Login button pressed');
        navigation.navigate(loginPage);
    };

    const handleSignUpButtonPress = () => {
        console.log('SignUp button pressed');
        navigation.navigate(signUpPage);
    };
    return (
        <View style={styles.container}>
            <Header />
            <Logo style={styles.logo} />
            <View style={styles.boxContainer}>
                <LoginButton onPress={handleLoginButtonPress} title="Login" />
                <SignUpButton onPress={handleSignUpButtonPress} title="Sign Up" />
            </View>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "#97c6d1"
    },
    logo: {
        marginTop: 20,
    },
    boxContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 200,
    },

});
