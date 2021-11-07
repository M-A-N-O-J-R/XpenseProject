import React,{useState} from 'react';
import {Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from '../firebase/fire';


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

export default function Input({navigation})
{

   
    const ref = firebase.firestore().collection("users");
    const [item, setItem] =useState({ fname:'',lname:'',age:'',occ:'',sav:''});
    const [fname,setfName]=useState('');
    const [lname,setlName]=useState('');
    const [age,setAge]=useState('');
    const [occ,setOcc]=useState('');
    const [sav,setSav]=useState('');
    // const [note,setNote]=useState('');
    // const [type,setType]=useState('');
    

    const handleClick=()=>{
        setItem(
            { fname:fname,lname:lname,age:age,occ:occ,sav:sav});

            console.log(item);
        if(item.fname!='')
        {
            var user = firebase.auth().currentUser;
            ref.add(
                { 
                  fname:item.fname,
                  lname:item.lname,
                  age:item.age,
                  occ:item.occ,
                  sav:item.sav,
                  id:user.uid,
                  r_no:Math.random().toString(),
                }
                ).then(()=>{
                console.log('record added');
                navigation.navigate('Home');

            }).catch((error)=>{
                console.log(error.message);
            })
           
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
            <Text style={styles.header} >Hello User 👋</Text>
            
                        <View>
                        
                       

                            <TextInput style={styles.textInput}
                              placeholder={'First name'}
                              onChangeText={(value)=>setfName(value)}
                              value={fname}
                            />
                          
                    
                          <TextInput style={styles.textInput}
                              placeholder={'Last name'}
                              onChangeText={(value)=>setlName(value)}
                              value={lname}
                            />
                          
                          

                          <TextInput style={styles.textInput}
                              keyboardType='numeric'
                              placeholder={'Age'}
                              onChangeText={(value)=>setAge(value)}
                              value={age}
                            />
                         


                          <TextInput style={styles.textInput}
                              placeholder={'Occupation'}
                              onChangeText={(value)=>setOcc(value)}
                              value={occ}
                            />
                        


                          <TextInput style={styles.textInput}
                              keyboardType='numeric'
                              placeholder={'Expected Savings'}
                              onChangeText={(value)=>setSav(value)}
                              value={sav}
                            />
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
        fontSize:22,
        textTransform: 'capitalize',
        marginBottom:20,
        textAlign: 'center',
        fontFamily:'Jost_300Light'
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
        marginTop: 70,
        borderRadius: 15,
        backgroundColor:'#eee',
        elevation: 3,
       
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        
        
        
    },



});