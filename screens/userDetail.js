import React,{useState,useEffect} from 'react';
import {Alert,Text,TextInput,View,StyleSheet,Button,KeyboardAvoidingView,Modal} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons ,AntDesign} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from '../firebase/fire';
import Message from './message';

import LottieView from 'lottie-react-native';


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




export default function UserDetail({navigation})
{

    const [modalOpen,setmodalOpen]=useState(false);
    const [oldPass,setoldPass]=useState('');
    const [newPass,setnewPass]=useState('');
    const [msg,setMsg]=useState('');

    const ref = firebase.firestore().collection("users");
    const [item, setItem] =useState({ fname:'',lname:'',age:'',occ:'',sav:''});
    
    const [currUser, setcurrUser] = useState();
    const [loading,setLoading]=useState(true);



    const noData = 
                   <LottieView
                    style={{flex: 1}}
                    source={require('../data9.json')}
                    loop
                    autoPlay
                  />


    // Handle user state changes
    useEffect(() => {
  
      const onChange = (currentUser)=>{
            setcurrUser(currentUser);
            setLoading(false);
      };
  
      const onError = (error)=>{
        //console.log(error);
        setcurrUser(null);
        setLoading(true);
      }
      const unsubscribe = firebase.auth().onAuthStateChanged(onChange,onError);
      return unsubscribe;
    },[]);
  
    
  
  
  
    async function getRecord()
    {
     
      var user = firebase.auth().currentUser;
     if(user!=null)
     {
        setLoading(true);
        await  ref.where("id", "==", user.uid).onSnapshot((querySnapshot)=>{
            var rec ={};
            querySnapshot.forEach((doc)=>{
              rec=(doc.data());
              console.log(doc.data());
            });
            setItem(rec);
            setLoading(false);
          });
  
     
      
      }
        
      // for(var i=0;i<items.length;i++)
      // {
      //   if(items[i].typ=='income')
      //   {
      //     inc+=Number(items[i].amt);
      //   }
      //   else
      //   {
      //     exp+=Number(items[i].amt);
      //   }
      // }
     
    }
    useEffect(() => {
          getRecord();
    },[]);
    
    




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
     
      

      if(loading)
      {
        return(
          <View><Text>Loading...</Text></View>
        )
      }


   return(
      <KeyboardAvoidingView enabled={true} style={{flex: 1}}>
            
            <KeyboardAvoidingView style={styles.container}>
                <KeyboardAvoidingView style={styles.setCont}>
                    <MaterialIcons name="details" size={32} color="black" />
                    <Text style={styles.header}>Account Details</Text>
                </KeyboardAvoidingView>
                {
                  item.fname!=''?
                <View style={styles.inputContainer}>
           
            
            <View style={styles.dataCont}>
                <Text style={styles.data}>First Name:</Text>
                <Text style={styles.data}>{item.fname}</Text>      
            </View>
            
            <View style={styles.dataCont}>
                <Text style={styles.data}>Last Name:</Text>
                <Text style={styles.data}>{item.lname}</Text>      
            </View>


            <View style={styles.dataCont}>
                <Text style={styles.data}>Age:</Text>
                <Text style={styles.data}>{item.age}</Text>      
            </View>


            <View style={styles.dataCont}>
                <Text style={styles.data}>Occupation:</Text>
                <Text style={styles.data}>{item.occ}</Text>     
            </View>

            <View style={styles.dataCont}>
                <Text style={styles.data}>Savings:</Text>
                <Text style={styles.data}>{item.sav}</Text>     
            </View>
            
        </View>:noData
                }

            </KeyboardAvoidingView>
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
      fontSize:16,
      textAlign: 'center',
      width:'100%',
      padding:7,
      fontFamily: 'Jost_400Regular',
  },
  data2:
  {
      color: 'black',
      fontSize:14,
      textAlign :'justify',
      width:'100%',
      padding:3,
      fontFamily: 'Jost_400Regular',
  }

})