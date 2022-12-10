import { StyleSheet, Text, View } from 'react-native'


export default function Header({headerText}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        height:50,
        backgroundColor:'#fff',
        justifyContent:"center",
        paddingLeft:10        
    },
    headerText:{
        color:'#000',
        fontWeight:'bold',
        fontSize:25
    }
})