import React,{useState} from 'react';
import {Alert,Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView,Modal} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../firebase/fire';
import Message from './message';


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




export default function ResetpassScreen({navigation})
{

    const [modalOpen,setmodalOpen]=useState(false);
    const [oldPass,setoldPass]=useState('');
    const [newPass,setnewPass]=useState('');
    const [msg,setMsg]=useState('');
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
      const reauthenticate=()=>
      {
        var user=firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email,oldPass);
        return user.reauthenticateWithCredential(cred);
      }
      const handleClick=()=>{

        //   reauthenticate
        //   firebase.auth().signOut().then(()=>{
        //       console.log("Sign out");
        //       navigation.navigate('Signin');
        //   }).catch(err=>console.log(err.message));

          reauthenticate().then(()=>
          {

            var user= firebase.auth().currentUser;
            user.updatePassword(newPass).then(
                ()=>
                {
                  setMsg('Updated password');
                  setmodalOpen(true);
                  setTimeout(function(){
                    navigation.navigate('Signup');
                  }, 2000);
                  
                })
                .catch((error)=>{
                    setMsg(error.message);
                    setmodalOpen(true);
                    console.log(error.message);
                });


          }).catch((error)=>{
              setMsg(error.message);
              setmodalOpen(true);
              
          })
         

      }




   return(
      <KeyboardAvoidingView enabled={true} style={{flex: 1}}>
            
            <KeyboardAvoidingView style={styles.container}>
                <KeyboardAvoidingView style={styles.setCont}>
                <MaterialCommunityIcons name="lock-reset" size={32} color="black" />
                    <Text style={styles.header}>Reset Password</Text>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView style={styles.centercontainer}>
                    <TextInput  placeholder={"Old Password"} style={styles.inputBox} value={oldPass} onChangeText={(value)=>{setoldPass(value)}} secureTextEntry/>
                    <TextInput placeholder={"New Password"} style={styles.inputBox2} value={newPass} onChangeText={(value)=>{setnewPass(value)}} secureTextEntry/>
                    
                </KeyboardAvoidingView>
                <Button style={styles.btnSubmit} title="reset" onPress={handleClick}/>
            </KeyboardAvoidingView>
            <Modal visible={modalOpen}>
                    <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodalOpen(false)}/>
                    <View style={styles.modalContent}>
                        <Message msg={msg}/>
                    </View>
            </Modal>
      </KeyboardAvoidingView> 
       
   )
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
    text: 
    {
        fontFamily:'Jost_400Regular',
        fontSize:16,
        width:'45%',
        marginLeft:10,
    },
    text2: 
    {
        fontFamily:'Jost_400Regular',
        fontSize:13,
        width:'45%',
        marginLeft:10,
    },
    iconCont:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row:
    {
        marginTop:65,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    container: 
    {
        flex: 1,
        marginTop:40,
        marginBottom:50,
        marginLeft:30,
        marginRight:30,
        borderRadius:10,
        backgroundColor:'#fff',

        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,


    },
    setCont:
    {
        flexDirection: 'row',
        marginTop:45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft:28,
    },
    header:
    {
        fontSize:28,
        marginLeft:10,
        fontFamily:'DancingScript_600SemiBold',
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
    fontFamily: 'Jost_400Regular',
    marginTop:35,
    
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
    marginBottom:60,
    fontFamily: 'Jost_400Regular',
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
    
    
  },

})