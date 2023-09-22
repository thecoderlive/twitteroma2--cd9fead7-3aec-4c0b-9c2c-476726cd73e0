import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './chat_data'
import Messages from './Messages'

function Chat({ navigation, route }){ 
const url = (api.chat ?? "chat/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state



async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.chat} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'column'}}  >
<Image
    style={styles.profile_image}
    source={{uri: item.profile_image}}
    />
<Text style={styles.user_name} numberOfLines={1}>{item.user_name}</Text>
</View>
<Messages item={'messages' in item ? item.messages: item} navigation={navigation}/>
<Image
    style={styles.profile_image}
    source={{uri: item.profile_image}}
    />
<Text style={styles.user_name} numberOfLines={1}>{item.user_name}</Text>
</ScrollView>
)}

export default Chat;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "user_name": {
        "flex": 1,
        "color": "#42b89a",
        "fontSize": 30,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    },
    "profile_image": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    }
});