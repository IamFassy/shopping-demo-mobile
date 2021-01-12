import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '../../Utils/Colors';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';
import CustomText from '../CustomText/CustomText';

const Product = ({ item }) => {
    return (
        <View style={styles.productView}>
            <Image source={{ uri: item.img }} style={{ height: 150, width: "100%" }} />
            <View style={styles.bottomView}>

                <CustomText size="subHeading" style={styles.name}>{item.name}</CustomText>

                <CustomText numberOfLines={1} type="bold" size="heading" style={styles.price}>{'\u20B9'} {item.priceAfterDiscount}</CustomText>






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
        // paddingVertical: 5
    },
    price: {
        color: Colors.primaryColor
    }
})
