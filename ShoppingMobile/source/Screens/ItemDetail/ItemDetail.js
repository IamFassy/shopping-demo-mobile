import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';
import CustomText from '../../Components/CustomText/CustomText';
import { Picker } from '@react-native-picker/picker';
import { addToCart } from '../../ReduxClasses/Actions/ProductActions';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

export class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            colors: [],
            selectedColor: "",
            size: [],
            selectedSize: "",
            quantity: 1,
        }
    }

    componentDidMount() {
        const { route } = this.props

        this.setState({
            item: route.params.item.item,
            colors: route.params.item.item.color,
            selectedColor: route.params.item.item.color[0],
            size: route.params.item.item.size,
            selectedSize: route.params.item.item.size[0]
        })
    }



    addToCart = () => {
        const { dispatch } = this.props;
        let itemArr = this.props.addedItems;
        let exists = itemArr.find((item) => item.id === this.state.item.id);
        let item;
        if (exists) {
            item = exists
            item.quantity = exists.quantity + this.state.quantity
        }
        else {
            item = this.state.item
            item.color = this.state.selectedColor
            item.size = this.state.selectedSize
            item.quantity = this.state.quantity
        }

        dispatch(addToCart(item))
    }

    colorsView = (item) => {
        const col = item === "Green" ? Colors.green : item === "Blue" ? Colors.blue : item === "Orange" ? Colors.orange : Colors.red
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedColor: item })}>
                <View style={[styles.roundView, { backgroundColor: col, justifyContent: "center" }]}>
                    {this.state.selectedColor === item && <FontAwesomeIcon icon="check" color={Colors.white} size={18} style={{ alignSelf: "center" }} />}
                </View>
            </TouchableOpacity>

        )
    }

    sizeView = (item) => {
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedSize: item })}>
                <View style={[styles.sizeInnerView, {
                    backgroundColor: this.state.selectedSize === item ? Colors.primaryColor : Colors.white,
                    borderWidth: this.state.selectedSize === item ? 0 : 0.5
                }]}>
                    <CustomText style={{ color: this.state.selectedSize === item ? Colors.white : Colors.text }} size="heading" >{item}</CustomText>
                </View>
            </TouchableOpacity>

        )
    }

    render() {

        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.headerView}>
                    <View style={styles.leftView}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesomeIcon icon={"chevron-left"} size={22} color={Colors.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rightView}>
                        <TouchableOpacity >
                            <FontAwesomeIcon icon={"shopping-cart"} size={22} color={Colors.primaryColor} />
                            {this.props.count > 0 &&
                                <View style={styles.countView}>
                                    <CustomText style={styles.countText} type="bold">
                                        {this.props.count}
                                    </CustomText>
                                </View>}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.imageView}>
                    <FastImage source={{ uri: this.state.item.img }} resizeMode={FastImage.resizeMode.contain} style={styles.img} />
                </View>
                <View style={styles.detailView}>
                    <CustomText type="bold" size="heading" style={styles.name}>{this.state.item.name}</CustomText>
                    <View style={styles.rowView}>
                        <CustomText type="bold" style={styles.price}>{'\u20B9'} {this.state.item.priceAfterDiscount}</CustomText>
                        {this.state.item.discount !== 0 && <CustomText type="bold" style={styles.original}>{'\u20B9'} {this.state.item.originalPrice}</CustomText>}
                    </View>
                    <View style={styles.colorsView}>
                        {this.state.colors.length > 0 &&
                            this.state.colors.map((item, index) => {
                                return (<View key={index}>
                                    {this.colorsView(item)}
                                </View>)
                            })}
                    </View>

                </View>
                <View style={styles.sizeView}>
                    {this.state.size.length > 0 &&
                        this.state.size.map((item, index) => {
                            return (<View key={index}>
                                {this.sizeView(item)}
                            </View>)
                        })}
                </View>

                <View style={styles.bottomView}>
                    <View style={{ flex: 0.3, }}>

                        <View style={styles.quantityButton}>
                            <View style={{ flex: 0.5, justifyContent: "flex-end" }}>
                                <CustomText size="heading" style={{ color: Colors.white, textAlign: "right" }} type="bold">Qty: {this.state.quantity}</CustomText>
                            </View>


                            <View style={{ flex: 0.5, }}>
                                <Picker
                                    dropdownIconColor={Colors.white}
                                    style={{ color: Colors.white, width: 50 }}
                                    selectedValue={this.state.quantity}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ quantity: itemValue })
                                    }>
                                    <Picker.Item label={"1"} value={1} />
                                    <Picker.Item label={"2"} value={2} />
                                    <Picker.Item label={"3"} value={3} />
                                    <Picker.Item label={"4"} value={4} />
                                </Picker>
                            </View>
                        </View>

                    </View>
                    <View style={{ flex: 0.7, }}>
                        <TouchableOpacity onPress={() => this.addToCart()}>
                            <View style={styles.cartButton}>
                                <CustomText size="heading" style={{ color: Colors.white }} type="bold">ADD TO CART</CustomText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        count: state.product.count,
        addedItems: state.product.addedItems,
        product: state.product
    }
}

export default connect(mapStateToProps)(ItemDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 5
    },
    leftView: {
        flex: 0.1,
        alignItems: "center"
    },
    imageView: {

    },
    img: {
        width: widthPercentageToDP(100),
        height: 300
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        width: widthPercentageToDP(100),
        zIndex: 1,
        justifyContent: "space-between",
        position: "absolute",
        top: 5

    },
    rightView: {
        flex: 0.1
    },
    detailView: {
        paddingVertical: 20,
        borderTopWidth: 0.5,
        borderColor: Colors.text

    },
    name: {
        textAlign: "center",
        color: Colors.darkText
    },
    price: {
        color: Colors.primaryColor,
        fontSize: 20
    },
    rowView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 10,
        alignItems: "center"
    },
    original: {
        textDecorationLine: "line-through",
        color: Colors.text,
        paddingLeft: 10
    },
    colorsView: {
        display: "flex",
        marginVertical: 10,
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-around"
    },
    roundView: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primaryColor
    },
    sizeView: {
        paddingVertical: 20,
        borderTopWidth: 0.5,
        borderColor: Colors.text,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    sizeInnerView: {
        borderWidth: 0.5,
        borderColor: Colors.text,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        display: "flex",

    },
    cartButton: {
        backgroundColor: Colors.primaryColor,
        // paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    quantityButton: {
        backgroundColor: Colors.darkPrimary,
        // paddingVertical: 10,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: 50
    },
    countView: {
        backgroundColor: Colors.green,
        position: "absolute",
        borderRadius: 180,
        left: 15,
        bottom: 7,
        width: 16,
        height: 16,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    countText: {
        color: Colors.white,
        fontSize: 10
    }

})
