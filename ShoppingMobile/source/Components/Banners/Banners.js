import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import Colors from '../../Utils/Colors'



export default class Banners extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper} activeDotColor={Colors.white} removeClippedSubviews={false} autoplay={true} >
                <View style={styles.slide}>
                    <Image style={styles.img} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37XN-7CrSo3eUjbxbK2-xE_T8pxfhORvCFA&usqp=CAU" }} />
                </View>
                <View style={styles.slide}>
                    <Image style={styles.img} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37XN-7CrSo3eUjbxbK2-xE_T8pxfhORvCFA&usqp=CAU" }} />
                </View>
                <View style={styles.slide}>
                    <Image style={styles.img} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37XN-7CrSo3eUjbxbK2-xE_T8pxfhORvCFA&usqp=CAU" }} />
                </View>
            </Swiper>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    img: {
        width: "100%",
        height: "100%"
    }
})