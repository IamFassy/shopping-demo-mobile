//Custom text component for reusability

//Library
import React from 'react';
import { StyleSheet, Text } from 'react-native';
//Components
// import Colors from '../../Utils/Colors';

const CustomText = (props) => {
    return (
        <Text numberOfLines={props.numberOfLines} style={[
            props.size === "heading" ? styles.headingText : props.size === "subHeading" ? styles.subHeadingText : styles.commonText,
            {
                fontFamily: "Roboto-Regular",
                fontWeight: props.type === "bold" ? "bold" : "normal",
                ...props.style
            }]}>
            {props.children}
        </Text>
    )
}

export default CustomText;

const styles = StyleSheet.create({
    commonText: {
        fontSize: 14,
    },
    headingText: {
        fontSize: 18,
    },
    subHeadingText: {
        fontSize: 16,
    }

})