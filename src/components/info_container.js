import {StyleSheet, Text, View, Button, Image, Pressable} from 'react-native';
import {PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';

export function InfoContainer({children, title}){
    return(
        <View style={styles.info_container}>
            <View style={styles.info_container_header}>
                <Text style={styles.info_container_header_text}>{title}</Text>
            </View>
            <View style={styles.info_container_body}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    info_container:{
        width: '90%',
    },
    border:{
        borderWidth: 5,
    },
    info_container_header:{
        backgroundColor: PHB_COLORS.BLUE,
        height: 50,
        justifyContent: 'center',
    },
    info_container_header_text:{
        color: PHB_COLORS.WHITE,
        margin: 10,
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    info_container_body:{
        height: 300
    }
});