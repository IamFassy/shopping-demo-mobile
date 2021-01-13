import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getAccessories, getBags, getWear, httpMethods } from '../../ApiManager/EndPoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import Loading from '../../Utils/Loading';
import Product from '../Product/Product';

const ItemsList = (props) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        NetworkManager.request(props.type === "bags" ? getBags : props.type === "clothing" ? getWear : getAccessories, httpMethods.get)
            .then((res) => {
                setLoading(false)

                if (res.status === 200) {
                    setData(res.data.items)
                    setError(false)
                }
                else {
                    setError(true)
                }
            })
            .catch((err) => {
                setError(true)

            })
    }, [])

    const renderItem = (item) => {

        return (

            <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={() => props.toDetail(item)}>
                    <Product item={item.item} />
                </TouchableOpacity>
            </View>


        )
    }



    return (
        <View style={styles.container}>

            {loading && <View style={styles.loadingView}>
                <Loading />
            </View>}
            {loading === false && data.length > 0 &&
                <View>
                    <FlatList
                        data={data}
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

export default ItemsList

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
