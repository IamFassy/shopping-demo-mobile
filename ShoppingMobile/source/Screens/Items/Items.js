import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomText from '../../Components/CustomText/CustomText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../../Utils/Colors';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';
import ItemsList from '../../Components/ItemsList/ItemsList';

export class Items extends Component {

    constructor() {
        super()
        this.state = {
            title: "",
            selectedTab: "first",
        }
    }

    componentDidMount() {
        const { route } = this.props
        this.setState({ title: route.params !== undefined ? route.params.title : "Items" })
    }

    customTab = (title, type) => {
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedTab: type })}>
                <View style={{ borderBottomWidth: this.state.selectedTab === type ? 3 : 0, borderColor: Colors.green, marginRight: 20 }}>
                    <Text style={[styles.buttonText, { color: this.state.selectedTab === type ? Colors.primaryColor : Colors.text }]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    toDetail = (item) => {

        this.props.navigation.navigate("ItemDetail", {
            item: item
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.headerView}>
                    <View style={styles.leftView}>
                        <TouchableOpacity onPress={() => this.props.navigation.push("Home")}>
                            <FontAwesomeIcon icon={"chevron-left"} size={22} color={Colors.back} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        {this.state.title !== "" && <CustomText size="heading">{this.state.title}</CustomText>}
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View>
                        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll} horizontal={true}>
                            <View style={styles.tabView}>
                                {this.customTab("Wallet & Bags", "first")}
                                {this.customTab("Western wear", "second")}
                                {this.customTab("Accessories", "third")}
                                {this.customTab("Jewellery", "fourth")}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.itemsView}>

                        {this.state.selectedTab === "first" &&
                            <ItemsList type="bags" toDetail={(item) => this.toDetail(item)} />
                        }

                        {this.state.selectedTab === "second" &&
                            <ItemsList type="clothing" toDetail={(item) => this.toDetail(item)} />
                        }

                        {this.state.selectedTab === "third" &&
                            <ItemsList type="accessories" toDetail={(item) => this.toDetail(item)} />
                        }

                        {this.state.selectedTab === "fourth" &&
                            <ItemsList type="bags" toDetail={(item) => this.toDetail(item)} />
                        }


                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default Items;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        display: "flex",
        flexDirection: "column"
    },
    headerView: {
        display: "flex",
        flexDirection: "row",
        width: widthPercentageToDP(100),

    },
    leftView: {
        flex: 0.1,
        alignItems: "center"
    },
    textView: {
        flex: 0.8,
        alignItems: "center"
    },
    tabView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    horizontalScroll: {
        paddingHorizontal: 10,


    },
    buttonText: {
        textAlign: "center",
        fontSize: 16,
        paddingBottom: 10,
        fontFamily: "Roboto-Regular"
    },
    itemsView: {
        backgroundColor: Colors.itemsBackground,
        flex: 1,

    }
})
