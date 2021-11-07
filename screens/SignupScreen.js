import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Input, Text, View ,TextInput,TouchableOpacity,Button,KeyboardAvoidingView,Modal} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import firebase from '../firebase/fire';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Message from './message';
import { Ionicons ,AntDesign} from '@expo/vector-icons';



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


import { 
  Satisfy_400Regular 
} from '@expo-google-fonts/satisfy'


export default function SignupScreen({navigation}) {

  const [modalOpen,setmodalOpen]=useState(false);
  const [msg,setMsg]=useState('');
  const [email,setEmail]=useState("Enter the user Mail");
  const [password,setPassword]=useState("Enter the user Password");
  const [Error,setError]=useState('');

  let [fontsLoaded,error]= useFonts({
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
    Satisfy_400Regular,
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
  // const signUp = async()=>{
  //   try
  //   {
  //     firebase.auth().createUserWithEmailAndPassword(email, password);
  //     navigation.navigate('Signin');
      
  //   }catch(err){
  //     setError(err.message);
  //   }
    
  // }


  const signUp =async()=>{
    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{

        navigation.navigate('NewUser');

      })
      //navigation.navigate('Signin');
      
    }).catch((err)=>{

      setMsg(err.message);
      setmodalOpen(true);
      console.log(err.message);
    })
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <KeyboardAvoidingView style={styles.tcont}>
        <Text style={styles.title}>Xpense</Text>
        <FontAwesome5 name="piggy-bank" size={38} color="rgb(247,119,169)" />
        
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={styles.centercontainer}>
        <TextInput  placeholder={"  Email"} style={styles.inputBox} onChangeText={(value) =>setEmail(value)}/>
        <TextInput placeholder={"  Password"} style={styles.inputBox2} onChangeText={setPassword} secureTextEntry/>
        {
          error?<Text style={{color:'red'}}>{error}</Text>:null
        }
        <KeyboardAvoidingView style={{marginTop:"12%"}}>
        <Button title="SignUp" onPress={() => signUp()} />
        </KeyboardAvoidingView>
        <TouchableOpacity>
          <Text style={styles.signin} onPress={()=>{navigation.navigate('Signin');}}>Already have an account?  </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal visible={modalOpen}>
          <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodalOpen(false)}/>
          <View style={styles.modalContent}>
              <Message msg={msg}/>
          </View>
      </Modal>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContent: 
    {
        flex:1,
    },
    btnClose:
    {
        marginLeft:360,
        marginTop:5,
    },
  centercontainer: 
  {
    flex: 1,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    
    borderRadius:8,

    backgroundColor:'white'
    
    
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop:30,

    
        padding:10,
        marginTop:40,
        marginBottom:90,
        marginLeft:30,
        marginRight:30,
        borderRadius: 16,

        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
  },
  tcont:
  {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
  },
  signin: 
  {
    marginTop:20,
    color:'rgb(11,103,194)'
  },
  title: 
  {
    fontSize:41,
    fontFamily: 'Satisfy_400Regular',
    color:'rgb(247,119,169)',
    textAlign: 'center',
    marginRight:1,
    
  },
  icon:{
    textAlign: 'center',
  },
  inputBox:
  {
    height:50,
    width:'60%',
    backgroundColor:'rgb(252,252,252)',
    borderRadius:8,
    padding:10,
    borderBottomWidth:3,
    borderBottomColor: 'black',
    fontFamily:'Jost_400Regular',
    
    
  },
  inputBox2:
  {
    height:50,
    width:'60%',
    backgroundColor:'rgb(252,252,252)',
    borderRadius:8,
    padding:10,
    borderBottomWidth:3,
    borderBottomColor: 'black',
    marginTop:35,
    marginBottom:20,
    fontFamily:'Jost_400Regular',
  },
  button:
  {
    padding:30,
    borderRadius:8,
    width:100,
    textAlign:'center',
    color: 'black',
  },

});

