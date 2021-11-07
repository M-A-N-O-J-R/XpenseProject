import React,{useState} from 'react';
import {Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView} from 'react-native';



import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { 
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold 
  } from '@expo-google-fonts/dancing-script';


  import { 
    Jost_100Thin,
    Jost_200ExtraLight,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold,
    Jost_800ExtraBold,
    Jost_900Black,
    Jost_100Thin_Italic,
    Jost_200ExtraLight_Italic,
    Jost_300Light_Italic,
    Jost_400Regular_Italic,
    Jost_500Medium_Italic,
    Jost_600SemiBold_Italic,
    Jost_700Bold_Italic,
    Jost_800ExtraBold_Italic,
    Jost_900Black_Italic 
  } from '@expo-google-fonts/jost'


export default function DisplayItem({item,handleDelete})
{
    let [fontsLoaded,error]= useFonts({
        DancingScript_400Regular,
        DancingScript_500Medium,
        DancingScript_600SemiBold,
        DancingScript_700Bold,
        Jost_100Thin,
        Jost_200ExtraLight,
        Jost_300Light,
        Jost_400Regular,
        Jost_500Medium,
        Jost_600SemiBold,
        Jost_700Bold,
        Jost_800ExtraBold,
        Jost_900Black,
        Jost_100Thin_Italic,
        Jost_200ExtraLight_Italic,
        Jost_300Light_Italic,
        Jost_400Regular_Italic,
        Jost_500Medium_Italic,
        Jost_600SemiBold_Italic,
        Jost_700Bold_Italic,
        Jost_800ExtraBold_Italic,
        Jost_900Black_Italic 
        
      });

      if(!fontsLoaded)
      {
        return<AppLoading/>
      }
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.header}>Details</Text>
            
            <View style={styles.dataCont}>
                <Text style={styles.data}>Date:</Text>
                <Text style={styles.data}>{item.date}</Text>      
            </View>
            
            <View style={styles.dataCont}>
                <Text style={styles.data}>Account:</Text>
                <Text style={styles.data}>{item.acnt}</Text>      
            </View>


            <View style={styles.dataCont}>
                <Text style={styles.data}>Amount:</Text>
                <Text style={styles.data}>{item.amt}</Text>      
            </View>


            <View style={styles.dataCont}>
                <Text style={styles.data}>Category:</Text>
                <Text style={styles.data}>{item.cat}</Text>     
            </View>

        <View style={styles.dataCont2}>
            <View> 
                <Text style={styles.data}>Note :</Text>
                <Text></Text>
            </View>
            <Text style={{...styles.data2,width:'100%'}}>{item.note}</Text>
        </View>
            <Button title="delete" onPress={()=>handleDelete(item.r_no)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    dataCont:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width:'100%',
        
        alignItems: 'center',
        borderRadius: 3,
        marginBottom:15,
        
        padding:10,
        borderRadius: 5,
        borderBottomWidth:1,
        
    },
    dataCont2:
    {
        justifyContent: 'space-evenly',
        width:'100%',
        borderRadius: 3,
        marginBottom:15,
        
        padding:10,
        borderRadius: 5,
        borderBottomWidth:1,

    },
    inputContainer:
    {
        flex: 1,
        padding:10,
        margin:30,
        borderRadius: 15,
        backgroundColor:'#eee',
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        
    },
    header:
    {
        fontSize:35,
        fontFamily:'DancingScript_600SemiBold',
        textAlign: 'center',
        marginTop:20,
        marginBottom:25,
    },
    data:
    {
        color: 'black',
        fontSize:18,
        textAlign: 'center',
        width:'40%',
        padding:3,
        fontFamily: 'Jost_400Regular',
    },
    data2:
    {
        color: 'black',
        fontSize:15,
        textAlign :'justify',
        width:'80%',
        padding:3,
        fontFamily: 'Jost_400Regular',
    }
});