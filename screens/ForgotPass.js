import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Alert, StyleSheet,Input, Text, View ,TextInput,TouchableOpacity,Button,Modal} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import firebase from '../firebase/fire';
import Ionicons from '@expo/vector-icons/Ionicons';
import Message from './message';

export default function ForgotPassScreen({navigation}) {

  const [email,setEmail]=useState("Enter E-Mail");
  //const [Error,setError]=useState('');
  const [modalOpen,setmodalOpen]=useState(false);
  const [msg,setMsg]=useState('');


  const ResetPass = async() => {
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
      setMsg('please check your email for further instructions');
      setmodalOpen(true);
    }).catch((error)=>{
      setMsg(error.message);
      setmodalOpen(true);
    });
    //Alert.alert('password reset initiated');
   
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.centercontainer}>
        <TextInput  placeholder={"Enter E-Mail"} style={styles.inputBox} onChangeText={(value) =>setEmail(value)}/>
        
        <View style={{marginTop:"12%"}}>
        <Button title="RESET" onPress={() => ResetPass()} />
        </View>
        <TouchableOpacity>
          <Text style={styles.signin} onPress={()=>{navigation.navigate('Signin');}}> Back to sign in </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalOpen}>
                    <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodalOpen(false)}/>
                    <View style={styles.modalContent}>
                        <Message msg={msg}/>
                    </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
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
      marginTop:180,
      marginBottom:150,
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
  backgroundColor:'#eee',
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
signin: 
  {
    marginTop:20,
    color:'rgb(11,103,194)'
  },
});

