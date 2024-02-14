import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { PHB_COLORS, PHB_FONTS, PHB_STYLES } from '../phb_styles';
import { PHB_Header, InfoContainer, PHB_Body } from '../phb_components'

export function LogExercisePage({ navigation }) {
    return (
        <View style={PHB_STYLES.root_container}>
    
          <PHB_Header navigation={navigation}/>

          <PHB_Body scroll={true}>
             <View style={PHB_STYLES.page_title_frame}>
                <Text style={[PHB_STYLES.page_title_text, PHB_STYLES.body_text]}>Log Exercise</Text>
            </View>
            <InfoContainer title="Steps Taken: something">
                <Text>
                    Put graph here
                </Text>
            </InfoContainer>
            <InfoContainer title="Workout List">
                <Text>
                    workout list
                </Text>
            </InfoContainer>
          </PHB_Body>
    
          <StatusBar style="auto" />
        </View>
    );
}
    
const styles = StyleSheet.create({
    scroll_view:{
        height: '90%',
        width: '50%',
        margin: '10%',
    },
});

