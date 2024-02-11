import {StyleSheet, Text, View, Button, Image, Pressable, ScrollView} from 'react-native';
import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function PHB_Body({style, children, scroll}){
    if(scroll){
        return (
            <View style={PHB_STYLES.body_flex}>
                <ScrollView style={[styles.scroll_view, PHB_STYLES.body]}>
                    {children}
                </ScrollView>
            </View>
        )
    }
    else{
        return (
            <View style={[PHB_STYLES.body, PHB_STYLES.body_flex]}>
                {children}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    scroll_view:{
        flex: 1
    }
})