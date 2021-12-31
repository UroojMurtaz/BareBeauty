import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Constants from 'expo-constants';
// import { Icon } from 'react-native-elements';

// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
// You can import from local files
// import AssetExample from './components/AssetExample';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import 'react-native-get-random-values';
// import uuid from 'react-native-uuid';


// import { v4 as uuidv4 } from 'uuid';



const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Add_Product"
      activeColor="white"
      shifting={true}
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}>
      <Tab.Screen
        name="Add_Product"
        component={Add_Product}
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="clipboard" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Remove_Product"
        component={Remove_Product}
        options={{
          tabBarLabel: 'Remove',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

function Add_Product({ navigation }) {
  const [proName,setproName]=React.useState("");
  const [desc,setDesc]=React.useState("");
  const [pic,setpic]=React.useState("");
  const [quan,setquan]=React.useState(1);
  const [price,setPrice]=React.useState("");
  const [category,setcategory]=React.useState("")


  const sentData = () => {
    let ID = uuid.v4().toString()
    
    var reqOptions = {
      method: 'PUT',
      body: JSON.stringify({
        ID:ID,
        Name: proName,
        Description:desc,
        Quantity:quan,
        Price:price,
        Category:category,
        uri: pic.uri

      
      }),
    };
    fetch(
      `https://barebeauty-bc3ab-default-rtdb.firebaseio.com/Products/${ID}.json`,
      reqOptions
    )
      .then((res) => console.log(res))
      .then((result) => console.log('Add Response:', result))
      .catch((error) => console.log('error', error));
  };


  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setpic(pickerResult);
  };
  const getData = async () => {
    const response = await fetch(`https://barebeauty-bc3ab-default-rtdb.firebaseio.com/Products.json`);
    const data = await response.json();
    console.log(data);
  };

  const add=()=>{

    setquan(quan+1)
  }

  React.useEffect(()=>{
    // sentData();
    // getData()
  },[])
  return (
    <View style={{ flex: 1, alignContent: 'center', padding: 10 }}>
      <View style={{ padding: 10 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22 }}>
          {' '}
          Add Product Name
        </Text>
        <TextInput
          // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          maxLength={20}
          multiline={true}
          placeholder="Enter Product name"
          onChangeText={text => setproName(text)}
          style={{ width: 250, left: 100, fontSize: 18, fontWeight: 'bold' }}
        />
      </View>

      <TextInput
        // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={50}
        multiline={true}
        placeholder="Write Description"
        onChangeText={text => setDesc(text)}
        style={{
          borderRadius: 20,
          width: 250,
          alignContent: 'center',
          left: 70,
          textAlign: 'center',
          fontSize: 19,
        }}
      />
      <View style={{ padding: 40, borderRadius: 70, top: 30 }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFhwjBljPPzTeky2EXqMU1bCZMAeUMWPUjLw&usqp=CAU',
          }}
          style={styles.logo}
        />
        <Text style={styles.instructions}>
          To add a photo from your phone, just press the button below!
        </Text>

        <TouchableOpacity onPress={openImagePickerAsync}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: '#D90B1C',
            }}>
            Add Image
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 180,
          left: 110,
          padding: 10,
        }}>
        <TouchableOpacity onPress={()=>add()} >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              backgroundColor: 'lightpink',
              borderWidth: 1,
              borderRadius: 100,
            }}>
            +
          </Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>
         {quan}
        </Text>
        <TouchableOpacity onPress={()=>{quan-1}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              backgroundColor: 'lightpink',
              borderWidth: 1,
              borderRadius: 100,
            }}>
            -
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 50,
        }}>
        <Text>Price</Text>
        <TextInput placeholder="price "
          onChangeText={text=>setPrice(text)}
          />
        <TouchableOpacity
          style={{
            height: 70,
            width: 130,
            borderRadius: 20,
            backgroundColor: '#D90B1C',
            shadowColor: 'black', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 3, // IOS
            shadowRadius: 4,
          }}
          onPress={() => sentData()}>
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white',
            }}>
            Add
          </Text>
          <View style={{ top: -10 }}>
            {/* <Icon
              name="arrow-circle-right"
              size={26}
              type="font-awesome"
              color="white"
            /> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// function Remove_Product({ navigation }) {
//   const [array, setarray] = React.useState([]);
//   const [getcondition, setcondition] = React.useState(true);
   
//    var key;
//    // const id="-MsEEu8o7LywlFLFeTET";
//    const deleteProduct = (id) => {
//    var requestOptions = {
//      method: 'DELETE',
//    };

//    fetch(`https://barebeauty-bc3ab-default-rtdb.firebaseio.com/Products/${id}.json`, requestOptions)
//      .then((response) => response.json())
//      .then((result) => console.log('Delete Response:', result))
//      .then(getproduct)
//      .catch((error) => console.log('error', error));
//  };
//    const getproduct = () => {
//      fetch(
//        `https://barebeauty-bc3ab-default-rtdb.firebaseio.com/Products.json`,
//        {
//          method: 'GET',
//        }
//      )
//        .then((response) => response.json())
//        .then((responsejson) => {
//          let samplearray = [];
//          for (key in responsejson) {
//            if (array.length == 0) {
//              console.log('First add');
//              samplearray.push(responsejson[key]);
//            } else {
//              console.log('other addition');
//              samplearray.push(responsejson[key]);
//            }
//          }
//          setarray(samplearray);
//          console.log("Set Array Called")
         

//          setcondition(false);
//        })
//        .catch((err) => {
//          console.error(err);
//        });
//    };

//    React.useEffect(() => {
//      getproduct();
//    }, []);
   
//    return(
//    <FlatList
//          data={array}
//          renderItem={({ item }) => {
//            console.log(item)
//            return (
             
//            <View style={{flexDirection:"row"}}>

//              <View style={styles.carts}>
//                <Image
//                  style={styles.productImg}
//                  source={{
//                    uri: item.uri,
//                  }}
//                />
//                <View>
//                  <Text style={styles.prdtext1}>{item.Name}</Text>
                 
//                </View>
//                <View style={styles.row}>
//                  <Text style={styles.prdtext2}>Rs {item.Price}</Text>
//                   <Text style={styles.prdtext2}>key {item.keys}</Text>

//                  <TouchableOpacity
//                    style={{
//                      backgroundColor: '#EC255A',
//                      width: 30,
//                      height: 30,
//                      borderRadius: 50,
//                      justifyContent: 'center',
//                      alignItems: 'center',
//                      marginTop: 7,
//                    }}
//                    onPress={() => deleteProduct(item.ID)}>
//                    <Text
//                      style={{
//                        color: 'white',
//                        fontSize: 18,
//                        fontWeight: 'bold',
//                      }}>
//                      -
//                    </Text>
//                  </TouchableOpacity>
//                </View>
//              </View>
//            </View>
//    )
//          }}
//           keyExtractor={(item, index) => index.toString()}
//    />
      
 
             
//  );
// }

const Order = ({ navigation }) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Product',
            headerStyle: {
              backgroundColor: '#ECBEAD',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 20,
            },
          }}
        />

        <Drawer.Screen
          name="Order"
          component={Order}
          options={{
            title: 'Order Management',
            headerStyle: {
              backgroundColor: '#ECBEAD',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'black',
              fontSize: 20,
            },
          }}
        />




      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 305,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    shadowColor: 'black', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 3,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
