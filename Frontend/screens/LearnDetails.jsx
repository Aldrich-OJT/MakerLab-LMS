import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";


export default function LearnDetails() {
    const router = useRoute()
    const navigation = useNavigation()

    console.log(router.params)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: router.params.item.title
        })
    }, [])
    return (
        <View>
            <Text>
               {router.params.item.description}
            </Text>
            <Image/>
        </View>
    )
}