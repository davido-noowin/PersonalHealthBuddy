import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native';
import {PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function ScoreDisplay({navigation: {navigate}, score, title, link}){
    return(
        
        <View style={[{paddingHorizontal: 40}]}>
            <Pressable onPress={()=>navigate(link)}>
                <ImageBackground style={styles.small_octogon} source={require("../assets/small_octogon.png")}>
                    <Text style={styles.score}>
                        {score}
                    </Text>
                </ImageBackground>
            </Pressable>
            <Text style={styles.label}>
                {title}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    small_octogon:{
        height:100,
        width: 100,
        justifyContent: "center"
    },
    score:{
        fontSize: 30,
        color: PHB_COLORS.DARK_BLUE,
        alignSelf: "center",
        justifyContent: "center"
    },
    label:{
        fontSize: 20,
        color: PHB_COLORS.WHITE,
        alignSelf: "center"
        
    }
});