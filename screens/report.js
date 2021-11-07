import React ,{useState,useEffect} from 'react';
import { View,StyleSheet,TextInput,Text as Ord_text,ScrollView } from 'react-native';
import { Grid } from 'react-native-svg-charts';
import { Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


import LottieView from 'lottie-react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'

  
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
  



import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const noExpense = 
                   <LottieView
                    style={{flex: 1}}
                    source={require('../data3.json')}
                    loop
                    autoPlay
                  />

const noData = 
                   <LottieView
                    style={{flex: 1}}
                    source={require('../data4.json')}
                    loop
                    autoPlay
                  />

function Report({items}) {


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


  const expenseArr=[],catArr=[];
  var expense=0,income=0,total=0;
  var star = 0;
  for(var i=0;i<items.length;i++)
    {
      if(items[i].typ=='expense')
      {
        expense+=Number(items[i].amt);
        expenseArr.push(items[i].amt);
        catArr.push(items[i].cat);
      }
      else
      {
        income+=Number(items[i].amt);
      }

    }
    total=income-expense;
  if(total*100/income>=25)
  {
    star=5;
  }
  else if(total*100/income>=20)
  {
    star=4;
  }
  else if(total*100/income>=15)
  {
    star=3;
  }
  else if(total*100/income>=10)
  {
    star=2;
  }
  else if(total*100/income>=1)
  {
    star=1;
  }
  const stars=[];
  for(var i=0; i<star; i++)
  {
    stars.push(<AntDesign name="star" size={35} color="rgb(255,200,61)" />)
  }
  var barData = {
    labels: [...catArr],
    datasets: [
      {
        data: [...expenseArr],
      },
    ],
  };
    const colors = ['rgb(1,0,1)', 'rgb(50,50,51)', 'rgb(102,103,103)', 'rgb(152,152,153)','rgb(205,205,204)','rgb(250,250,246)'];
    const chartConfig = {
        backgroundGradientFrom: "#FFF",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "#FFF",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(1, 1, 0, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 0.7,
        useShadowColorFromDataset: false, // optional
        decimalPlaces: 0
      };

      
    
      const pieData2 = [];
      for(var i=0;i<expenseArr.length;i++)
      {
        pieData2.push(
        {
          name:catArr[i],
          amount:Number(expenseArr[i]),
          color:colors[i%6], 
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,

        });
      }
      
      const pieData=[...pieData2];

      // const pieData =[
      //   {
      //     name: 'Seoul',
      //     population: 2150,
      //     color: 'rgb(205,205,204)',
      //     legendFontColor: '#7F7F7F',
      //     legendFontSize: 15,
      //   },
      //   {
      //     name: 'Toronto',
      //     population: 2800,
      //     color: 'rgb(152,152,153)',
      //     legendFontColor: '#7F7F7F',
      //     legendFontSize: 15,
      //   },
      //   {
      //     name: 'Beijing',
      //     population: 5276,
      //     color: 'rgb(102,103,103)',
      //     legendFontColor: '#7F7F7F',
      //     legendFontSize: 15,
      //   },
      //   {
      //     name: 'New York',
      //     population: 8538,
      //     color: 'rgb(50,50,51)',
      //     legendFontColor: '#7F7F7F',
      //     legendFontSize: 15,
      //   },
      //   {
      //     name: 'Moscow',
      //     population: 2192,
      //     color: 'rgb(1,0,1)',
      //     legendFontColor: '#7F7F7F',
      //     legendFontSize: 15,
      //   },
      // ];

    
      const graphStyle = {
        marginVertical: 8,
        ...chartConfig.style
      };
    return(
      <View style={styles.main}>
      {expenseArr.length!=0? 
        <ScrollView>
        <View style={styles.container}>

          <View style={styles.cont2}>
            <Text style={styles.text}>Bar Chart</Text>
            <BarChart
                style={styles.graphC}
                // style={graphStyle}
                data={barData}
                width={screenWidth}
                height={250}
                width={350}
                yAxisLabel={'₹'}
                chartConfig={chartConfig}
            />
          </View>
            
            <View style={styles.cont2}>
                <Text style={styles.text}>Pie Chart</Text>
                <PieChart
                data={pieData}
                width={350}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="10"
                absolute
                />
            </View>


            <View style={styles.cont3}>
              <Text style={styles.text2}>Star Rating</Text>
              <View style={styles.starCont}>{stars}</View>
            </View>

              </View>
              </ScrollView> : items.length==0?noData:noExpense}  
       </View> 
        
    );

}
<View></View>
const styles = StyleSheet.create({
  starCont:
  {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop:40,
  },
  row:
  {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    backgroundColor:'yellow',
    width:'100%',
  },
  main:
  {
      flex:1
  },
    container:{
        flex : 1,
        alignItems:'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#EEE',
    },
    cont2:
    {
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:300,
        backgroundColor:'#FFF',
        padding:100,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius:13,
        marginTop:40,
        marginBottom:10
    },
    cont3:
    {
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:20,
        backgroundColor:'#FFF',
        padding:80,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius:13,
        marginTop:40,
        marginBottom:20,
    },
    text: 
    {
        fontSize:19,
        color: 'black',
        fontFamily: 'DancingScript_500Medium'
    },
    text2: 
    {
        fontSize:21,
        color: 'black',
        fontFamily: 'DancingScript_500Medium'
    },
    incomeAmt:
    {
      fontSize:16,
      color:'rgb(52,168,83)',
    },
    expenseAmt:
    {
      fontSize:16,
      color:'rgb(237,95,83)',
    },
    totalAmt:
    {
      fontSize:16,
      color:'rgbrgb(26,115,232)',
    },
    dCont:
    {
      justifyContent: 'center',
      alignItems: 'center',

      width:'100%',
    }

});

export default Report;


