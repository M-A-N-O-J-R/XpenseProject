import React,{useState} from 'react';
import {Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';


import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { 
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold 
  } from '@expo-google-fonts/dancing-script'

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

export default function Input({handleSubmit})
{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    date=date+'-'+month+'-'+year;
    
    const [item, setItem] =useState({ date:date,acnt:'',cat:'',amt:'',note:'',typ:''});
    const [datE,setDate]=useState(date);
    const [acnt,setAcnt]=useState('');
    const [cat,setCat]=useState('');
    const [amt,setAmt]=useState('');
    const [note,setNote]=useState('');
    const [type,setType]=useState('');

    const handleClick=()=>{
        setItem(
            { date:datE,acnt:acnt,cat:cat,amt:amt,note:note,typ:type});

        if(item.amt!='')
        {
            handleSubmit(item);
        }
               
    }

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

        <KeyboardAvoidingView style={styles.inputContainer}>
            <Text style={styles.header} >INPUT SCREEN</Text>
            
                        <View>
                        
                       

                            <TextInput style={styles.textInput}
                              placeholder={date}
                              onChangeText={(value)=>setDate(value)}
                              value={datE}
                            />
                          
                    
                             <TextInput style={styles.textInput}
                              placeholder={'Enter the Account'}
                              onChangeText={(value)=>setAcnt(value)}
                              value={acnt}
                            />
                          
                          

                          <TextInput style={styles.textInput}
                              keyboardType='numeric'
                              placeholder={'Enter the Amount'}
                              onChangeText={(value)=>setAmt(value)}
                              value={amt}
                            />
                         


                          <TextInput style={styles.textInput}
                              placeholder={'Enter the Category'}
                              onChangeText={(value)=>setCat(value)}
                              value={cat}
                            />
                        


                          <TextInput style={styles.textInput}
                              multiline
                              placeholder={'Enter the Description'}
                              onChangeText={(value)=>setNote(value)}
                              value={note}
                            />
                         <View style={styles.drpDown}>
                            <RNPickerSelect
                                value={type}
                                onValueChange={(value) => { setType(value)
                                    }}
                                items={[
                                    { label: 'Income', value: 'income' },
                                    { label: 'Expense', value: 'expense' },
                                ]}
                            />
                             <Text>{type}</Text>
                        </View> 
                            <Button title="Submit" onPress={handleClick} />
                    </View>
                    
                
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    drpDown:
    {
       alignItems: 'center',
       marginBottom:15,
    },
    header:
    {
        fontSize:27,
        textTransform: 'capitalize',
        marginBottom:20,
        textAlign: 'center',
        fontFamily:'DancingScript_600SemiBold'
    },
    textInput: 
    {
        
        margin:15,
        marginBottom:25,
        borderWidth:1,
        borderColor: 'black',
        padding:11,
        fontSize:15,
        borderRadius:5,
        backgroundColor: 'white',
        fontFamily:'Jost_400Regular'

    },
    inputContainer:
    {
       
        flex: 1,
        justifyContent: 'center',
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



});