import {StyleSheet, Text, View, Button, Image, Pressable} from 'react-native';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function PHB_Header({navigation: {navigate}}){
    return (
        <View style={PHB_STYLES.header}>
            <Text style={PHB_STYLES.header_text}>Personal Health Buddy</Text>
            <Pressable onPress={()=>navigate('Home')}>
                <Image source={require("../assets/home_button.png")} />
            </Pressable>
            
        </View>
    )
}
