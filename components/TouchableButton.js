import React from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';



const TouchableButton = ({ text, onPress }) => {
const isDarkModeEnabled = isDark
    return (
        <TouchableOpacity onPress={{onPress}} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>{text}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    buttonslight: {
        backgroundColor: "red",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
      },
      buttonsdark: {
        backgroundColor: "orange",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
      },
      buttontextlight: {
        fontSize: 30,
      },
      buttontextdark: {
        fontSize: 30,
      },
})

export default TouchableButton