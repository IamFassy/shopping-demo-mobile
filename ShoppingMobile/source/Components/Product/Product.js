import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../Utils/Colors';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';
import CustomText from '../CustomText/CustomText';
import FastImage from 'react-native-fast-image';

const Product = ({ item }) => {
    return (
        <View style={styles.productView}>
            <FastImage resizeMode={FastImage.resizeMode.contain} source={{ uri: item.img }} style={{ height: 150, width: "100%" }} />
            <View style={styles.bottomView}>
                <CustomText size="subHeading" style={styles.name}>{item.name}</CustomText>
                <View style={styles.rowView}>
                    <CustomText numberOfLines={1} type="bold" size="heading" style={styles.price}>{'\u20B9'} {item.priceAfterDiscount}</CustomText>
                    {item.discount !== 0 && <CustomText numberOfLines={1} type="bold" size="subHeading" style={styles.originalText}>{'\u20B9'} {item.originalPrice}</CustomText>}
                </View>
            </View>

        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    productView: {
        backgroundColor: Colors.white,
        width: widthPercentageToDP(45),
        height: 220
    },
    name: {
        color: Colors.text,
        paddingTop: 5

    },
    bottomView: {
        paddingHorizontal: 5,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    price: {
        color: Colors.primaryColor
    },
    rowView: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    originalText: {
        textDecorationLine: "line-through",
        paddingLeft: 10,
        color: Colors.text
    }
})
