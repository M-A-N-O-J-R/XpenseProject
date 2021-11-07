import React,{useState} from 'react';
import {Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView,TouchableOpacity,Modal} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ResetpassScreen from './resetPass';
import firebase from '../firebase/fire';
import UserDetail from './userDetail';
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




export default function AccntSet({navigation})
{

    const [modalOpen,setmodalOpen]=useState(false);
    const [modal2Open,setmodal2Open]=useState(false);
    const [modal3Open,setmodal3Open]=useState(false);
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
  const handleLogout = () =>
  {
    navigation.navigate('Signin');
  }
  const delUser =async()=>{
    firebase.auth().currentUser.delete().then(function () {
        setMsg("User deleted..");
        setmodal3Open(true);
        setTimeout(function(){
            navigation.navigate('Signup');
          }, 2000);
        //navigation.navigate('Signup'); 
      }) /*.catch(function (err) {
        setMsg(err.message);
        setmodalOpen(true);
        //console.log(err.message);
      }) */
  }
   return(
      <View style={{flex: 1}}>
            
            <View style={styles.container}>
                <View style={styles.setCont}>
                    <MaterialCommunityIcons name="account-cog" size={34} color="black" />
                    <Text style={styles.header}>Account Settings</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=>setmodal2Open(true)}>
                        <View style={styles.iconCont}>
                                <MaterialIcons name="details" size={32} color="black" />
                                <Text style={styles.text}>Account Details</Text>
                        </View>
                    </TouchableOpacity>
                  
                  <TouchableOpacity onPress={()=>setmodalOpen(true)}>
                        <View style={styles.iconCont}>
                                <MaterialCommunityIcons name="lock-reset" size={32} color="black" />
                                <Text style={styles.text}>Reset   Password</Text>
                        </View> 
                  </TouchableOpacity>
                   
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={()=>delUser()}>
                        <View style={styles.iconCont}>
                                <AntDesign name="deleteuser" size={32} color="black" />
                                <Text style={styles.text}>Delete User</Text>
                        </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{navigation.navigate('Signin');}}>
                        <View style={styles.iconCont}>
                                    <SimpleLineIcons name="logout" size={32} color="black" />
                                    <Text style={styles.text}>Logout</Text>
                        </View>  
                   </TouchableOpacity>
                   
                </View>
            </View>
            <KeyboardAvoidingView>
                <Modal visible={modalOpen} >
                    <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodalOpen(false)}/>
                    <View style={styles.modalContent}>
                        <ResetpassScreen navigation={navigation}/>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView>
                <Modal visible={modal2Open} >
                    <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodal2Open(false)}/>
                    <View style={styles.modalContent}>
                        <UserDetail navigation={navigation}/>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
            <TouchableOpacity>

            </TouchableOpacity>
            
            <KeyboardAvoidingView>
                <Modal visible={modal3Open} >
                    <Ionicons name="close-sharp" size={24} color="black"  style={styles.btnClose} onPress={()=>setmodal3Open(false)}/>
                    <View style={styles.modalContent}>
                        <Message msg={msg}/>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
            
      </View> 
       
   )
}

const styles = StyleSheet.create({
    text: 
    {
        fontFamily:'Jost_400Regular',
        fontSize:17,
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
        marginBottom:40,
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
        margin:25,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft:28,
        marginTop:35,
    },
    header:
    {
        fontSize:28,
        marginLeft:10,
        
        fontFamily:'DancingScript_600SemiBold',
    },
    modalContent: 
    {
        flex:1,
    },
    btnClose:
    {
        marginLeft:360,
        marginTop:5,
    },


})