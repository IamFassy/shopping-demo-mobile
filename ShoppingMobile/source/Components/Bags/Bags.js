import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getBags, httpMethods } from '../../ApiManager/EndPoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import Loading from '../../Utils/Loading';
import CustomText from '../CustomText/CustomText';
import Product from '../Product/Product';

const Bags = () => {
    const [loading, setLoading] = useState(true)
    const [bags, setBags] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        NetworkManager.request(getBags, httpMethods.get)
            .then((res) => {
                setLoading(false)
                console.log(res, "res");
                if (res.status === 200) {
                    setBags(res.data.items)
                    setError(false)
                }
                else {
                    setError(true)
                }
            })
            .catch((err) => {
                setError(true)
                console.log(err);
            })
    }, [])

    const renderItem = (item) => {
        console.log(item, "item");
        return (
            <View style={{ margin: 10 }}>
                <Product item={item.item} />
            </View>


        )
    }



    return (
        <View style={styles.container}>

            {loading && <View style={styles.loadingView}>
                <Loading />
            </View>}
            {loading === false && bags.length > 0 &&
                <View>
                    <FlatList
                        data={bags}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.listView}
                        showsVerticalScrollIndicator={false}
                    />


                </View>

            }
        </View>
    )
}

export default Bags

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5
    },
    loadingView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    bagsView: {
        flex: 1
    },
    listView: {
        marginBottom: 10,
        paddingBottom: 20,

    }
})
