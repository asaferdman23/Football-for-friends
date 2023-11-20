import { Text,View,StyleSheet,Image } from "react-native";

const Logo = () => {
    return (
        <View style={styles.header}>
           <Image style={{width: 60, height:60}} source={require('./soccer.png')} />
           <Text style={styles.text} title ="asaf">Let's Play</Text>
        </View>
    )
}
export default Logo;
const styles = StyleSheet.create({
    header: {
        padding: 40,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:20,
        fontWeight: 'bold',
        padding:20,
    }
});
