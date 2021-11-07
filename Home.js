import * as React from 'react';
import { RefreshControl,Text, View,StyleSheet,Modal,FlatList,TouchableOpacity, TouchableWithoutFeedback,Button,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState,useEffect} from 'react';
import Input from './screens/input';
import DisplayItem from './screens/displayItem';
import Report from './screens/report';
import AccntSet from './screens/accntSet';
import Settings from './screens/settings';
import firebase from './firebase/fire';

import { Feather } from '@expo/vector-icons';


import LottieView from 'lottie-react-native';


import { AntDesign } from '@expo/vector-icons'; 

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
  } from '@expo-google-fonts/jost';



function HomeScreen({items,setItems,navigation}) 
{
  
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  date=date+'-'+month+'-'+year;


  const ref = firebase.firestore().collection("records");
  // console.log(ref);
   //const [records,setRecords]=useState([]);

   const [loading,setLoading]=useState(false);

   
  const [modalOpen,setmodalOpen]=useState(false);
  const [modal2Open,setmodal2Open]=useState(false);

  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const [total,setTotal]=useState(0);

  const [refresh,setRefresh]=useState(false);
  // const [items, setItems] =useState([
  //   { key:1,date:date,acnt:'Cash',cat:'Rent',amt:'5000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'income'},
  //   { key:2,date:date,acnt:'Cash',cat:'Medicine',amt:'500',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
  //   { key:3,date:date,acnt:'Cheque',cat:'School',amt:'2000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'income'}
  // ]);
  
  const[modalItem,setmodalItem]=useState({ key:1,date:date,acnt:'Cash',cat:'Rent',amt:'5000',note:'Joker ',typ:'income'});

  const [currUser, setcurrUser] = useState();


  
  // Handle user state changes
  useEffect(() => {

    const onChange = (currentUser)=>{
          setcurrUser(currentUser);
          setLoading(true);
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
       await ref.where("id", "==", user.uid).onSnapshot((querySnapshot)=>{
          const rec =[];
          var inc=0,exp=0,tot=0;
          querySnapshot.forEach((doc)=>{
            rec.push(doc.data());
            //console.log(doc.data());
            if(doc.data().typ=='income')
            {
              inc+=Number(doc.data().amt);
            }
            else{
              exp+=Number(doc.data().amt);
            }
            //console.log(doc.data().amt);
          });
          setItems(rec);
          setLoading(false);
          setIncome(inc);
          setExpense(exp);
          setTotal(inc-exp);
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
  
  

  
  const handleSubmit=(item)=>
  {

    // setItems
    // (
    //     (prevItems)=>
    //     {
    //        return [...prevItems,{...item,key:Math.random().toString()}];
    //     }
    // )

    var user = firebase.auth().currentUser;
      ref.add({
        date:item.date,
        amt:item.amt,
        cat:item.cat,
        typ:item.typ,
        id:user.uid,
        note:item.note,
        acnt:item.acnt,
        r_no:Math.random().toString(),
      }).then(()=>{
        console.log('record added');
      }).catch((error)=>{
        console.log(error.message);
      })

     
    // var inc=0,exp=0,tot=0;
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
    // setIncome(inc);
    // setExpense(exp);
    // setTotal(inc-exp);
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

  if(loading)
  {
    return(
      <LottieView
                    style={{flex: 1}}
                    source={require('./data9.json')}
                    loop
                    autoPlay
                  />
    )
  }
  const handleClick=(item)=>
  {
    
    setmodalItem(item);
    setmodal2Open(true);

  }
  const handleDelete=(r_no)=>
  {
    //console.log('handleClick');
    // setItems((prevItems)=>{
    //  return prevItems.filter(item=>item.key!=key)
    // });
    var n=r_no.toString()
    var user = firebase.auth().currentUser;
    ref.where("id", "==", user.uid)
    .where("r_no", "==", n)
                    .get().then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc) {
                        doc.ref.delete();
                      });
                    }); 

  }
  const greenArrow =<Feather name="arrow-up-right" size={24} color="rgb(52,168,83)" />
  const redArrow = <Feather name="arrow-down-left" size={24} color="rgb(237,95,83)" />

  const noData = 
                   <LottieView
                    style={{flex: 1}}
                    source={require('./data.json')}
                    loop
                    autoPlay
                  />
                

   
   
  return (
    <View style={{ flex: 1 , backgroundColor:'#eee'}}>
     <View style={{flexDirection:'row',justifyContent: 'space-evenly',marginTop:10,}}
      refreshControl={
                  <RefreshControl
                  refreshing={refresh}
                  />
                }>
        <View style={styles.dCont}>
          <Text>Income</Text>
          <Text style={styles.incomeAmt} >₹{income}</Text>
        </View>
       <View style={styles.dCont}>
        <Text>Expense</Text>
        <Text style={styles.expenseAmt}>₹{expense}</Text>
       </View>
       <View style={styles.dCont}>
        <Text>Total</Text>
        <Text style={styles.totalAmt}>₹{total}</Text>
       </View>
     </View>
    {
      items.length!=0?<FlatList
      data={items}
      keyExtractor={(item) => item.r_no}
      refreshControl={
                  <RefreshControl
                  refreshing={refresh}
                  />
                }
        renderItem={({ item }) => (
          <View >
          <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <View style={styles.row} >
                <Text style={styles.col1}>{item.date}</Text>
                <Text style={styles.col2}>₹{item.amt}</Text>
                <Text style={styles.col3}>{item.cat}</Text>
                <Text style={styles.col4}>{item.typ}</Text>
                {item.typ=='income'? greenArrow : redArrow}
            </View>
          </TouchableWithoutFeedback>
          <Modal visible={modal2Open} >
            <Ionicons name="close-sharp" size={24} color="black" onPress={()=>setmodal2Open(false)} style={styles.btnClose}/>
            <View style={styles.modalContent}>
              
              <DisplayItem item={modalItem} handleDelete={handleDelete}/>
            </View>
      
         </Modal>
        
          </View>
        )}
        
        /> : noData
    }
     
        
        <Modal visible={modalOpen} >
        <Ionicons name="close-sharp" size={24} color="black" onPress={()=>setmodalOpen(false)} style={styles.btnClose}/>
        <View style={styles.modalContent}>
          
          <Input handleSubmit={handleSubmit}/>
        </View>
      
      </Modal>
      

     
      <Ionicons name="ios-add-circle-sharp"  style={styles.addBtn} size={60}  onPress={()=>setmodalOpen(true)}/>
    </View>
  );
}

function ReportScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Monthly Report!</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account Details!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Home({navigation}) {
    
  //const ref = firebase.firestore().collection("records");
 /// console.log(ref);
  // const [records,setRecords]=useState([]);
  // const [loading,setLoading]=useState(false);

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  date=date+'-'+month+'-'+year;
  
  const [items, setItems] =useState([]);
    // { key:1,date:date,acnt:'Cash',cat:'Rent',amt:'5000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'income'},
    // { key:2,date:date,acnt:'Cash',cat:'Medicine',amt:'15000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
    // { key:3,date:date,acnt:'Cheque',cat:'Bonus',amt:'5000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'income'},
    // { key:4,date:date,acnt:'Cheque',cat:'Salary',amt:'60000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'income'},
    // { key:5,date:date,acnt:'Cheque',cat:'School',amt:'20000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
    // { key:6,date:date,acnt:'Cash',cat:'Food',amt:'13000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
    // { key:7,date:date,acnt:'Cheque',cat:'Cinema',amt:'3500',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
    // { key:8,date:date,acnt:'Cash',cat:'Travel',amt:'6000',note:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled',typ:'expense'},
 


  // function getRecord()
  // {
  //   setLoading(true);
  //   ref.onSnapshot((querySnapshot)=>{
  //     const items =[];
  //     querySnapshot.forEach((doc)=>{
  //       items.push(doc.data());
  //     });
  //     setRecords(items);
  //     setLoading(false);
  //   });
  //   for(var i=0; i<records.length; i++)
  //   {
  //      console.log(records[i]);

  //   }
  // }
  // useEffect(()=>{
  //   getRecord();
  // },[]);
  // if(loading)
  // {
  //   return(
  //     <View><Text>Loading...</Text></View>
  //   )
  // }
    return (
      <View style={{flex: 1}}>
      <NavigationContainer >
       
        <Tab.Navigator tabBarOptions={
          {
           
            labelStyle: 
            {
              fontSize: 13,
            },
			    }} >

          <Tab.Screen name="Home" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={28} color="black" />
            ),
          }}>
          {() => <HomeScreen items={items} setItems={setItems} navigation={navigation}/>}
          </Tab.Screen>

          <Tab.Screen name="Account" 
          
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-sharp" size={28} color="black" />
            ),
          }}
          >
             {() => <AccntSet navigation={navigation}/>}
          </Tab.Screen>
          
          <Tab.Screen name="Report" 
          
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" size={28} color="black" />
            ),
          }} >
            {() => <Report items={items}/>}
          </Tab.Screen>

          <Tab.Screen name="Settings" 
           
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-settings-sharp" size={28} color="black" />
            ),
          }}>
            {() => <Settings navigation={navigation}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      
     </View> 
      
    );
    
}
const styles = StyleSheet.create({
  incomeAmt:
  {
    fontSize:14,
    color:'rgb(52,168,83)',
  },
  expenseAmt:
  {
    fontSize:14,
    color:'rgb(237,95,83)',
  },
  totalAmt:
  {
    fontSize:14,
    color:'rgbrgb(26,115,232)',
  },
  dCont:
  {
    justifyContent: 'center',
    alignItems: 'center',

  },
  row:
  {
    marginTop:11,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding:10,
    justifyContent: 'space-evenly',
    alignItems: 'center',


    borderRadius: 15,
    elevation: 3,
   
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    
  },
  addBtn: 
  {
    position: 'absolute',
    left: '83%',
    right: 0,
    bottom: 10,
    color:'rgba(219,109,50,255)', 
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
  col1:
  {
    width:'22%',
    textAlign: 'center',
  },
  col2:
  {
    width:'20%',
   
    textAlign: 'center',
  },
  col3:
  {
    width:'20%',
    
    textAlign: 'center',
  },
  col4:
  {
    width:'20%',
    
    textAlign: 'center',
  }
});