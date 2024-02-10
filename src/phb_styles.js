import { StyleSheet } from "react-native";

//define all common project styles here

export const PHB_COLORS = {
    WHITE: '#F1EFEF',
    LIGHTBLUE: '#DDF2FD',
    SLATE: '#9BBEC8',
    BLUE: '#427D9D',
    DARK_BLUE: '#164863'
}

export const PHB_FONTS = {

}

export const PHB_STYLES = StyleSheet.create({
    root_container: {
        flex: 1,
        backgroundColor: PHB_COLORS.WHITE,
        flexDirection:'column',
    },

    header:{
        flex: 1,
        backgroundColor: PHB_COLORS.SLATE,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '3%'
    },

    header_text:{
        color:'white',
        fontSize:30
    },

    center:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll_view:{
        height: '90%',
        width: '50%',
        margin: '10%',
    },

    body:{
        flex: 9,
        backgroundColor: PHB_COLORS.DARK_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    body_text:{
        color:'white',
    },
    page_title_frame:{
        backgroundColor: PHB_COLORS.SLATE,
        margin: 20,
        padding: 10,
    },
    page_title_text:{
        fontSize: 30
    },
    border:{
        borderWidth: 5,
    },

});