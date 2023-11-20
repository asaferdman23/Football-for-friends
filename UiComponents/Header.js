import { View,StyleSheet,Text } from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Football for friends</Text>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    header: {
        padding: 20,
    },
});
