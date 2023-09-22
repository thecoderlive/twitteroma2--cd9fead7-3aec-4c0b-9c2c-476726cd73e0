import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'



function Messages({ item, navigation }){



function messagesItem({ item }){
return (
<View style={styles.messages_item}>
<Image
    style={styles.sender_image}
    source={{uri: item.sender_image}}
    />
<View style={{flexDirection: 'row'}}>
<Text style={styles.message_text}>{item.message_text}</Text>
<Text style={styles.timestamp} numberOfLines={1}>{item.timestamp}</Text>
</View>
</View>
)}

return (
<FlatList
    style={styles.messages}
    data={item}
    renderItem={messagesItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default Messages;

const styles = StyleSheet.create({
    "timestamp": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    },
    "message_text": {
        "fontSize": 12,
        "marginTop": 5,
        "fontWeight": "250",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    },
    "sender_image": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    }
});