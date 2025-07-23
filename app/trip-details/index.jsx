
  
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, ScrollView } from 'react-native';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import moment from 'moment';
// import FlightInfo from '../../component/TripDetails/FlightInfo';
// import HotelList from '../../component/TripDetails/HotelList';
// import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// export default function TripDetails() {
//   const navigation = useNavigation();
//   const {trip}=useLocalSearchParams();
//   // const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
//   const [tripDetails, setTripDetails] = useState([]);

//   const formatData = (data) => {
//     return JSON.parse(data);
//   };

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: '',
//     });
//     setTripDetails(JSON.parse(trip));
//   }, []);

//   return (
//     tripDetails && (
//       <ScrollView>
//         <Image
//           source={{
//             uri:
//               'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
//               formatData(tripDetails.tripData).locationInfo?.photoRef +
//               '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
//           }}
//           style={{
//             width: '100%',
//             height: 330,
//           }}
//         />
//         <View
//           style={{
//             padding: 15,
//             backgroundColor: Colors.WHITE,
//             height: '100%',
//             marginTop: -30,
//             borderTopLeftRadius: 30,
//             borderBottomRightRadius: 30,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 25,
//               fontFamily: 'outfit-bold',
//             }}
//           >
//             {tripDetails?.tripPlan?.travelPlan?.location}
//           </Text>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: 5,
//               marginTop: 5,
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: 'outfit',
//                 fontSize: 18,
//                 color: Colors.GRAY,
//               }}
//             >
//               {moment(formatData(tripDetails.tripdata).startDate).format('DD MMM yyyy')}
//             </Text>
//             <Text
//               style={{
//                 fontFamily: 'outfit',
//                 fontSize: 18,
//                 color: Colors.GRAY,
//               }}
//             >
//               -{moment(formatData(tripDetails.tripdata).endDate).format('DD MMM yyyy')}
//             </Text>
//           </View>
//           <Text
//             style={{
//               fontFamily: 'outfit',
//               fontSize: 17,
//             }}
//           >
//             🚌{formatData(tripDetails.tripdata)?.traveler?.title}
//           </Text>
//           <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />
//           <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />
//           <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary} />
//         </View>
//       </ScrollView>
//     )
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image,  ActivityIndicator, ScrollView,StyleSheet } from 'react-native';
// import { useLocalSearchParams, useNavigation } from 'expo-router';
// import axios from 'axios';
// import moment from 'moment/moment';
// import FlightInfo from '../../component/TripDetails/FlightInfo';
// import HotelList from '../../component/TripDetails/HotelList';
// import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// const fetchImage = async (locationName) => {
//   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//   try {
//     console.log("Fetching image for location:", locationName);
//     const response = await axios.get("https://pixabay.com/api/", {
//       params: {
//         key: apiKey,
//         q: locationName,
//         image_type: 'photo',
//       },
//     });
//     console.log("Fetched image URL:", response.data.hits[0].largeImageURL);
//     return response.data.hits[0].largeImageURL;
//   } catch (error) {
//     console.error("Error fetching image from Pixabay:", error);
//     throw error;
//   }
// };


// export default function TripDetails() {
//   const navigation = useNavigation();
//   const params = useLocalSearchParams();
//   const [tripDetails, setTripDetails] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: ''
//     });

//     console.log("Received params:", JSON.stringify(params, null, 2));

//     if (params.trip) {
//       try {
//         let parsedTrip;
//         if (typeof params.trip === 'string') {
//           parsedTrip = JSON.parse(params.trip);
//         } else {
//           parsedTrip = params.trip;
//         }
//         console.log("Parsed trip:", JSON.stringify(parsedTrip, null, 2));

//         setTripDetails(parsedTrip);

//         let tripData;
//         if (typeof parsedTrip.tripData === 'string') {
//           tripData = JSON.parse(parsedTrip.tripData);
//         } else {
//           tripData = parsedTrip.tripData;
//         }
//         console.log("Parsed tripData:", JSON.stringify(tripData, null, 2));

//         const locationName = tripData?.locationInfo?.name;

//         if (locationName) {
//           fetchImage(locationName)
//             .then(url => {
//               setImageUrl(url);
//               setLoading(false);
//             })
//             .catch(error => {
//               console.error('Error fetching image:', error);
//               setLoading(false);
//             });
//         } else {
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error parsing trip details:", error);
//         setError("Failed to parse trip details");
//         setLoading(false);
//       }
//     } else {
//       setError("Trip details are not provided");
//       setLoading(false);
//     }
//   }, [params.trip]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   if (!tripDetails) {
//     return (
//       <View style={styles.centered}>
//         <Text>No trip details available</Text>
//       </View>
//     );
//   }

//   let tripData;
//   try {
//     tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
//   } catch (error) {
//     console.error("Error parsing tripData:", error);
//     return (
//       <View style={styles.centered}>
//         <Text>Error loading trip data</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} style={styles.image} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.locationText}>
//           {tripDetails.tripPlan?.trip_details?.destination}
//         </Text>
//         <Text style={styles.dates}>
//           📅 {moment(tripData.startDate).format("MMM Do")} - {" "}
//           {moment(tripData.endDate).format("MMM Do, YYYY")}
//         </Text>
//         <Text style={styles.travelers}>
//           🚌 {tripData.traveler.title} - {tripData.traveler.desc}
//         </Text>
//       </View>

//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>✈️ Flights</Text>
//         <FlightInfo flightData={tripDetails?.tripPlan?.flights?.details} />
//       </View>

//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>🏨 Hotels</Text>
//         <HotelList hotelList={tripDetails?.tripPlan?.hotels?.options} />
//       </View>

//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>🌄 Plan Details</Text>
//         <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   locationText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   dates: {
//     fontSize: 16,
//     color: '#555',
//   },
//   travelers: {
//     fontSize: 16,
//     color: '#555',
//   },
//   sectionContainer: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
// working
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import moment from 'moment/moment';
import FlightInfo from '../../component/TripDetails/FlightInfo';
import HotelList from '../../component/TripDetails/HotelList';
import PlannedTrip from '../../component/TripDetails/PlannedTrip';
const Colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#808080",
  primary: "#007AFF",
  lightGray: "#D3D3D3",
  softSkyBlue: "#E3F2FD",      // Light blue, airy feel
  paleMintGreen: "#E8F5E9",    // Soft green, natural touch
  blushPink: "#FCE4EC",        // Warm pink, inviting
  lavenderMist: "#F3E5F5",      // Subtle lavender tone
  warmPeach: "#FFF3E0",        // Gentle, warm peach
  lightLemonYellow: "#FFFDE7", // Bright and fresh yellow
};
const fetchImage = async (locationName) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
  try {
    console.log("Fetching image for location:", locationName);
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });

    if (response.data.hits.length > 0) {
      console.log("Fetched image URL:", response.data.hits[0].largeImageURL);
      return response.data.hits[0].largeImageURL;
    } else {
      console.warn("No image found for location:", locationName);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    return null;
  }
};

export default function TripDetails() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    console.log("Received params:", JSON.stringify(params, null, 2));

    if (params.trip) {
      try {
        let parsedTrip = typeof params.trip === 'string' ? JSON.parse(params.trip) : params.trip;
        console.log("Parsed trip:", JSON.stringify(parsedTrip, null, 2));

        setTripDetails(parsedTrip);

        let tripData = parsedTrip?.tripData;
        if (typeof tripData === 'string') {
          tripData = JSON.parse(tripData); // Only parse if it's a string
        }

        if (!tripData) {
          throw new Error("Trip data is missing or invalid.");
        }

        console.log("Final tripData:", JSON.stringify(tripData, null, 2));

        const locationName = tripData?.locationInfo?.name;
        if (locationName) {
          fetchImage(locationName).then(url => {
            if (url) setImageUrl(url);
            setLoading(false);
          }).catch(error => {
            console.error('Error fetching image:', error);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing trip details:", error);
        setError("Failed to parse trip details");
        setLoading(false);
      }
    } else {
      setError("Trip details are not provided");
      setLoading(false);
    }
  }, [params.trip]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!tripDetails) {
    return (
      <View style={styles.centered}>
        <Text>No trip details available</Text>
      </View>
    );
  }

  let tripData;
  try {
    tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
  } catch (error) {
    console.error("Error parsing tripData:", error);
    return (
      <View style={styles.centered}>
        <Text>Error loading trip data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.locationText}>
          {tripDetails.tripPlan?.trip_details?.destination || "Unknown Destination"}
        </Text>
        <Text style={styles.dates}>
          📅 {tripData?.startDate ? moment(tripData.startDate).format("MMM Do") : "Start Date"} - {" "}
          {tripData?.endDate ? moment(tripData.endDate).format("MMM Do, YYYY") : "End Date"}
        </Text>
        <Text style={styles.travelers}>
          🚌 {tripData?.traveler?.title || "Traveler Info Missing"} - {tripData?.traveler?.desc || ""}
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        {/* <Text style={styles.sectionTitle}>✈️ Flights</Text> */}
        <FlightInfo flightData={tripDetails?.tripPlan?.flights?.details} />
      </View>

      <ScrollView >
        {/* <Text style={styles.sectionTitle}>🏨 Hotels</Text> */}
        <HotelList hotelList={tripDetails?.tripPlan?.hotels?.options} />
        {/* <HotelList hotelList={tripDetails?.tripPlan?.hotels} /> */}

      </ScrollView>

      <View style={styles.sectionContainer}>
        {/* <Text style={styles.sectionTitle}>🌄 Plan Details</Text> */}
        <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:Colors.blushPink,
    backgroundColor:Colors.softSkyBlue

  },
  image: {
    width: '100%',
    height:199,
  },
  detailsContainer: {
    padding: 20,
  },
  locationText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 16,
    color: '#555',
  },
  travelers: {
    fontSize: 16,
    color: '#555',
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
// // // // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // // // import axios from 'axios';
// // // // import moment from 'moment';

// // // // // ✅ Ensure proper imports
// // // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // // import HotelList from '../../component/TripDetails/HotelList';
// // // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // // // ✅ Check if API Key is stored securely
// // // // const PIXABAY_API_KEY = '44938756-d9d562ffdaf712150c470c59e'; 

// // // // const fetchImage = async (locationName) => {
// // // //   try {
// // // //     console.log("Fetching image for:", locationName);
// // // //     const response = await axios.get("https://pixabay.com/api/", {
// // // //       params: { key: PIXABAY_API_KEY, q: locationName, image_type: 'photo' },
// // // //     });
// // // //     return response.data.hits.length > 0 ? response.data.hits[0].largeImageURL : null;
// // // //   } catch (error) {
// // // //     console.error("Error fetching image:", error);
// // // //     return null;
// // // //   }
// // // // };

// // // // export default function TripDetails() {
// // // //   const navigation = useNavigation();
// // // //   const params = useLocalSearchParams();
  
// // // //   const [tripDetails, setTripDetails] = useState(null);
// // // //   const [imageUrl, setImageUrl] = useState("");
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     navigation.setOptions({
// // // //       headerShown: true,
// // // //       headerTransparent: true,
// // // //       headerTitle: ''
// // // //     });

// // // //     console.log("Received params:", params);

// // // //     if (!params.trip) {
// // // //       setError("Trip details not provided.");
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const parsedTrip = typeof params.trip === 'string' ? JSON.parse(params.trip) : params.trip;
// // // //       setTripDetails(parsedTrip);

// // // //       const tripData = typeof parsedTrip.tripData === 'string' ? JSON.parse(parsedTrip.tripData) : parsedTrip.tripData;
// // // //       console.log("Parsed Trip Data:", tripData);

// // // //       if (tripData?.locationInfo?.name) {
// // // //         fetchImage(tripData.locationInfo.name)
// // // //           .then(url => setImageUrl(url))
// // // //           .catch(() => console.error("Failed to fetch trip image."));
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error parsing trip details:", error);
// // // //       setError("Error parsing trip details.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, [params.trip]);

// // // //   if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
// // // //   if (error) return <View style={styles.centered}><Text>{error}</Text></View>;
// // // //   if (!tripDetails) return <View style={styles.centered}><Text>No trip details available</Text></View>;

// // // //   let tripData;
// // // //   try {
// // // //     tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
// // // //   } catch (error) {
// // // //     console.error("Error parsing tripData:", error);
// // // //     return <View style={styles.centered}><Text>Error loading trip data</Text></View>;
// // // //   }

// // // //   return (
// // // //     <ScrollView style={styles.container}>
// // // //       <Image source={imageUrl ? { uri: imageUrl } : require('../../assets/images/p1.jpg')} style={styles.image} />
// // // //       <View style={styles.detailsContainer}>
// // // //         <Text style={styles.locationText}>
// // // //           {tripDetails.tripPlan?.trip_details?.destination || "Unknown Destination"}
// // // //         </Text>
// // // //         <Text style={styles.dates}>
// // // //           📅 {moment(tripData.startDate).format("MMM Do")} - {" "}
// // // //           {moment(tripData.endDate).format("MMM Do, YYYY")}
// // // //         </Text>
// // // //         <Text style={styles.travelers}>
// // // //           🚌 {tripData.traveler?.title || "Traveler"} - {tripData.traveler?.desc || ""}
// // // //         </Text>
// // // //       </View>

// // // //       <View style={styles.sectionContainer}>
// // // //         <Text style={styles.sectionTitle}>✈️ Flights</Text>
// // // //         <FlightInfo flightData={tripDetails?.tripPlan?.flights?.details || []} />
// // // //       </View>

// // // //       <View style={styles.sectionContainer}>
// // // //         <Text style={styles.sectionTitle}>🏨 Hotels</Text>
// // // //         <HotelList hotelList={tripDetails?.tripPlan?.hotels?.options || []} />
// // // //       </View>

// // // //       <View style={styles.sectionContainer}>
// // // //         <Text style={styles.sectionTitle}>🌄 Plan Details</Text>
// // // //         <PlannedTrip details={tripDetails?.tripPlan?.itinerary || []} />
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // // // ✅ Added styles
// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: '#FFF',
// // // //   },
// // // //   image: {
// // // //     width: '100%',
// // // //     height: 200,
// // // //   },
// // // //   detailsContainer: {
// // // //     padding: 20,
// // // //   },
// // // //   locationText: {
// // // //     fontSize: 22,
// // // //     fontWeight: 'bold',
// // // //   },
// // // //   dates: {
// // // //     fontSize: 16,
// // // //     color: '#555',
// // // //   },
// // // //   travelers: {
// // // //     fontSize: 16,
// // // //     color: '#555',
// // // //   },
// // // //   sectionContainer: {
// // // //     padding: 20,
// // // //   },
// // // //   sectionTitle: {
// // // //     fontSize: 20,
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 10,
// // // //   },
// // // //   centered: {
// // // //     flex: 1,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //   },
// // // // });
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, Image, ScrollView } from 'react-native';
// // // // import { useNavigation, useLocalSearchParams } from 'expo-router';
// // // // import moment from 'moment';

// // // // // ✅ Corrected Import Paths
// // // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // // import HotelList from '../../component/TripDetails/HotelList';
// // // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // // export default function TripDetails() {
// // // //   const navigation = useNavigation();
// // // //   const params = useLocalSearchParams();
// // // //   const [tripDetails, setTripDetails] = useState(null);

// // // //   useEffect(() => {
// // // //     navigation.setOptions({
// // // //       headerShown: true,
// // // //       headerTransparent: true,
// // // //       headerTitle: '',
// // // //     });

// // // //     if (!params.trip) {
// // // //       console.error("Trip data not found!");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       // ✅ Ensure safe parsing
// // // //       const parsedTrip = typeof params.trip === 'string' ? JSON.parse(params.trip) : params.trip;
// // // //       setTripDetails(parsedTrip);
// // // //     } catch (error) {
// // // //       console.error("Error parsing trip data:", error);
// // // //     }
// // // //   }, [params.trip]);

// // // //   // ✅ If no trip details, return an empty state
// // // //   if (!tripDetails) {
// // // //     return (
// // // //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // //         <Text>Loading trip details...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;

// // // //   return (
// // // //     <ScrollView>
// // // //       <Image
// // // //         source={{
// // // //           uri:
// // // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // // //             (tripData?.locationInfo?.photoRef || '') +
// // // //             '&key=' +
// // // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // // //         }}
// // // //         style={{
// // // //           width: '100%',
// // // //           height: 330,
// // // //         }}
// // // //       />
// // // //       <View
// // // //         style={{
// // // //           padding: 15,
// // // //           backgroundColor: '#FFF',
// // // //           height: '100%',
// // // //           marginTop: -30,
// // // //           borderTopLeftRadius: 30,
// // // //           borderBottomRightRadius: 30,
// // // //         }}
// // // //       >
// // // //         <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
// // // //           {tripDetails?.tripPlan?.travelPlan?.location || 'Unknown Destination'}
// // // //         </Text>
// // // //         <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             {moment(tripData?.startDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             - {moment(tripData?.endDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //         </View>
// // // //         <Text style={{ fontSize: 17 }}>
// // // //           🚌 {tripData?.traveler?.title || 'Traveler'}
// // // //         </Text>

// // // //         <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />
// // // //         <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />
// // // //         <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary} />
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, Image, ScrollView } from 'react-native';
// // // // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // // // import moment from 'moment';
// // // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // // import HotelList from '../../component/TripDetails/HotelList';
// // // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // // export default function TripDetails() {
// // // //   const navigation = useNavigation();
// // // //   const { trip } = useLocalSearchParams();
// // // //   const [tripDetails, setTripDetails] = useState(null);

// // // //   useEffect(() => {
// // // //     navigation.setOptions({
// // // //       headerShown: true,
// // // //       headerTransparent: true,
// // // //       headerTitle: '',
// // // //     });

// // // //     if (!trip) {
// // // //       console.error('Trip data is missing!');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       // ✅ Check if `trip` is a string before parsing
// // // //       const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
// // // //       setTripDetails(parsedTrip);
// // // //     } catch (error) {
// // // //       console.error('Error parsing trip data:', error);
// // // //     }
// // // //   }, [trip]);

// // // //   // ✅ Handle case when trip details are still loading
// // // //   if (!tripDetails) {
// // // //     return (
// // // //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // //         <Text>Loading trip details...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   // ✅ Ensure `tripData` is properly parsed
// // // //   const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;

// // // //   return (
// // // //     <ScrollView>
// // // //       <Image
// // // //         source={{
// // // //           uri:
// // // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // // //             (tripData?.locationInfo?.photoRef || '') +
// // // //             '&key=' +
// // // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // // //         }}
// // // //         style={{
// // // //           width: '100%',
// // // //           height: 330,
// // // //         }}
// // // //       />
// // // //       <View
// // // //         style={{
// // // //           padding: 15,
// // // //           backgroundColor: '#FFF', // ✅ Replaced Colors.WHITE
// // // //           height: '100%',
// // // //           marginTop: -30,
// // // //           borderTopLeftRadius: 30,
// // // //           borderBottomRightRadius: 30,
// // // //         }}
// // // //       >
// // // //         <Text
// // // //           style={{
// // // //             fontSize: 25,
// // // //             fontWeight: 'bold',
// // // //           }}
// // // //         >
// // // //           {tripDetails?.tripPlan?.travelPlan?.location || 'Unknown Destination'}
// // // //         </Text>
// // // //         <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             {moment(tripData?.startDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             - {moment(tripData?.endDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //         </View>
// // // //         <Text style={{ fontSize: 17 }}>
// // // //           🚌 {tripData?.traveler?.title || 'Traveler'}
// // // //         </Text>

// // // //         <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />
// // // //         <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />
// // // //         <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary} />
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // // }
// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, Image, ScrollView } from 'react-native';
// // // // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // // // import moment from 'moment';

// // // // // ✅ Ensure these imports are correct!
// // // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // // import HotelList from '../../component/TripDetails/HotelList';
// // // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // // export default function TripDetails() {
// // // //   const navigation = useNavigation();
// // // //   const { trip } = useLocalSearchParams();
// // // //   const [tripDetails, setTripDetails] = useState(null);

// // // //   useEffect(() => {
// // // //     navigation.setOptions({
// // // //       headerShown: true,
// // // //       headerTransparent: true,
// // // //       headerTitle: '',
// // // //     });

// // // //     if (!trip) {
// // // //       console.error('Trip data is missing!');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
// // // //       setTripDetails(parsedTrip);
// // // //     } catch (error) {
// // // //       console.error('Error parsing trip data:', error);
// // // //     }
// // // //   }, [trip]);

// // // //   if (!tripDetails) {
// // // //     return (
// // // //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // //         <Text>Loading trip details...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;

// // // //   return (
// // // //     <ScrollView>
// // // //       <Image
// // // //         source={{
// // // //           uri:
// // // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // // //             (tripData?.locationInfo?.photoRef || '') +
// // // //             '&key=' +
// // // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // // //         }}
// // // //         style={{
// // // //           width: '100%',
// // // //           height: 330,
// // // //         }}
// // // //       />
// // // //       <View
// // // //         style={{
// // // //           padding: 15,
// // // //           backgroundColor: '#FFF',
// // // //           height: '100%',
// // // //           marginTop: -30,
// // // //           borderTopLeftRadius: 30,
// // // //           borderBottomRightRadius: 30,
// // // //         }}
// // // //       >
// // // //         <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
// // // //           {tripDetails?.tripPlan?.travelPlan?.location || 'Unknown Destination'}
// // // //         </Text>
// // // //         <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             {moment(tripData?.startDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>













// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, Image, ScrollView } from 'react-native';
// // // // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // // // import moment from 'moment';

// // // // // ✅ Ensure these imports are correct!
// // // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // // import HotelList from '../../component/TripDetails/HotelList';
// // // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // // export default function TripDetails() {
// // // //   const navigation = useNavigation();
// // // //   const { trip } = useLocalSearchParams();
// // // //   const [tripDetails, setTripDetails] = useState(null);
// // // //   const formatData = (data) => {
// // // //         return JSON.parse(data);
// // // //       };
// // // //   useEffect(() => {
// // // //     navigation.setOptions({
// // // //       headerShown: true,
// // // //       headerTransparent: true,
// // // //       headerTitle: '',
// // // //     });

// // // //     if (!trip) {
// // // //       console.error('Trip data is missing!');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
// // // //       setTripDetails(parsedTrip);
// // // //     } catch (error) {
// // // //       console.error('Error parsing trip data:', error);
// // // //     }
// // // //   }, [trip]);

// // // //   if (!tripDetails) {
// // // //     return (
// // // //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // // //         <Text>Loading trip details...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;

// // // //   return (
// // // //     <ScrollView>
// // // //       {/* <Image
// // // //         source={{
// // // //           uri:
// // // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // // //             (tripData?.locationInfo?.photoRef || '') +
// // // //             '&key=' +
// // // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // // //         }}
// // // //         style={{
// // // //           width: '100%',
// // // //           height: 330,
// // // //         }}
// // // //       /> */}
// // // //       <Image
// // // //           source={{
// // // //             uri:
// // // //               'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // // //               formatData(tripDetails.tripData).locationInfo?.photoRef +
// // // //               '&key=' +
// // // //               process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
// // // //           }}
// // // //           style={{
// // // //             width: '100%',
// // // //             height: 330,
// // // //           }}
// // // //         />
// // // //       <View
// // // //         style={{
// // // //           padding: 15,
// // // //           backgroundColor: '#FFF',
// // // //           height: '100%',
// // // //           marginTop: -30,
// // // //           borderTopLeftRadius: 30,
// // // //           borderBottomRightRadius: 30,
// // // //         }}
// // // //       >
// // // //         <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
// // // //           {tripDetails?.tripPlan?.travelPlan?.location || 'Unknown Destination'}
// // // //         </Text>
// // // //         <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             {moment(tripData?.startDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // // //             - {moment(tripData?.endDate).format('DD MMM YYYY')}
// // // //           </Text>
// // // //         </View>
// // // //         <Text style={{ fontSize: 17 }}>
// // // //           🚌 {tripData?.traveler?.title || 'Traveler'}
// // // //         </Text>

// // // //         {/* ✅ Ensure these components are correctly imported and used */}
// // // //         {tripDetails?.tripPlan?.travelPlan?.flight && <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />}
// // // //         {tripDetails?.tripPlan?.travelPlan?.hotels && <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />}
// // // //         {tripDetails?.tripPlan?.travelPlan?.itinerary && <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.itinerary} />}
// // // //       </View>
// // // //     </ScrollView>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, Image, ScrollView } from 'react-native';
// // // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // // import moment from 'moment';

// // // // ✅ Ensure correct imports
// // // import FlightInfo from '../../component/TripDetails/FlightInfo';
// // // import HotelList from '../../component/TripDetails/HotelList';
// // // import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// // // export default function TripDetails() {
// // //   const navigation = useNavigation();
// // //   const { trip } = useLocalSearchParams();
// // //   const [tripDetails, setTripDetails] = useState(null);

// // //   useEffect(() => {
// // //     navigation.setOptions({
// // //       headerShown: true,
// // //       headerTransparent: true,
// // //       headerTitle: '',
// // //     });

// // //     if (!trip) {
// // //       console.error('🚨 Trip data is missing!');
// // //       return;
// // //     }

// // //     try {
// // //       // ✅ Ensure `trip` is a string before parsing
// // //       const parsedTrip = typeof trip === 'string' ? JSON.parse(trip) : trip;
// // //       console.log('✅ Parsed Trip Details:', parsedTrip);
// // //       setTripDetails(parsedTrip);
// // //     } catch (error) {
// // //       console.error('❌ Error parsing trip data:', error);
// // //     }
// // //   }, [trip]);

// // //   // ✅ Ensure data is ready before rendering
// // //   if (!tripDetails || !tripDetails.tripData) {
// // //     return (
// // //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// // //         <Text>Loading trip details...</Text>
// // //       </View>
// // //     );
// // //   }

// // //   // ✅ Ensure tripData is properly parsed
// // //   const tripData =
// // //     typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;

// // //   console.log('📌 TripData:', tripData);

// // //   return (
// // //     <ScrollView>
// // //       {/* ✅ Safe Image Handling */}
// // //       <Image
// // //         source={{
// // //           uri: tripData?.locationInfo?.photoRef
// // //             ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
// // //             : 'https://via.placeholder.com/400', // Fallback image
// // //         }}
// // //         style={{
// // //           width: '100%',
// // //           height: 330,
// // //         }}
// // //       />
      
// // //       <View
// // //         style={{
// // //           padding: 15,
// // //           backgroundColor: '#FFF',
// // //           height: '100%',
// // //           marginTop: -30,
// // //           borderTopLeftRadius: 30,
// // //           borderBottomRightRadius: 30,
// // //         }}
// // //       >
// // //         {/* ✅ Trip Location */}
// // //         <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
// // //           {tripDetails?.tripPlan?.travelPlan?.location || 'Unknown Destination'}
// // //         </Text>

// // //         {/* ✅ Trip Date Range */}
// // //         <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
// // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // //             {tripData?.startDate ? moment(tripData.startDate).format('DD MMM YYYY') : 'Start Date Unknown'}
// // //           </Text>
// // //           <Text style={{ fontSize: 18, color: 'gray' }}>
// // //             - {tripData?.endDate ? moment(tripData.endDate).format('DD MMM YYYY') : 'End Date Unknown'}
// // //           </Text>
// // //         </View>

// // //         {/* ✅ Traveler Info */}
// // //         <Text style={{ fontSize: 17 }}>
// // //           🚌 {tripData?.traveler?.title || 'Traveler'}
// // //         </Text>

// // //         {/* ✅ Conditionally Render Components */}
// // //         {tripDetails?.tripPlan?.travelPlan?.flight && (
// // //           <FlightInfo flightData={tripDetails.tripPlan.travelPlan.flight} />
// // //         )}
// // //         {tripDetails?.tripPlan?.travelPlan?.hotels && (
// // //           <HotelList hotelList={tripDetails.tripPlan.travelPlan.hotels} />
// // //         )}
// // //         {tripDetails?.tripPlan?.travelPlan?.itinerary && (
// // //           <PlannedTrip details={tripDetails.tripPlan.travelPlan.itinerary} />
// // //         )}
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // }
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// // import { useLocalSearchParams, useNavigation } from 'expo-router';
// // import axios from 'axios';
// // import moment from 'moment/moment';
// // import {FlightInfo} from '../../component/TripDetails/FlightInfo';
// // import {HotelList} from '../../component/TripDetails/HotelList';
// // import {PlannedTrip} from '../../component/TripDetails/PlannedTrip';

// // const fetchImage = async (locationName) => {
// //   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
// //   try {
// //     console.log("Fetching image for location:", locationName);
// //     const response = await axios.get("https://pixabay.com/api/", {
// //       params: {
// //         key: apiKey,
// //         q: locationName,
// //         image_type: 'photo',
// //       },
// //     });
// //     console.log("Fetched image URL:", response.data.hits[0].largeImageURL);
// //     return response.data.hits[0].largeImageURL;
// //   } catch (error) {
// //     console.error("Error fetching image from Pixabay:", error);
// //     throw error;
// //   }
// // };


// // export default function TripDetails() {
// //   const navigation = useNavigation();
// //   const params = useLocalSearchParams();
// //   const [tripDetails, setTripDetails] = useState(null);
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     navigation.setOptions({
// //       headerShown: true,
// //       headerTransparent: true,
// //       headerTitle: ''
// //     });

// //     console.log("Received params:", JSON.stringify(params, null, 2));

// //     if (params.trip) {
// //       try {
// //         let parsedTrip;
// //         if (typeof params.trip === 'string') {
// //           parsedTrip = JSON.parse(params.trip);
// //         } else {
// //           parsedTrip = params.trip;
// //         }
// //         console.log("Parsed trip:", JSON.stringify(parsedTrip, null, 2));

// //         setTripDetails(parsedTrip);

// //         let tripData;
// //         if (typeof parsedTrip.tripData === 'string') {
// //           tripData = JSON.parse(parsedTrip.tripData);
// //         } else {
// //           tripData = parsedTrip.tripData;
// //         }
// //         console.log("Parsed tripData:", JSON.stringify(tripData, null, 2));

// //         const locationName = tripData?.locationInfo?.name;

// //         if (locationName) {
// //           fetchImage(locationName)
// //             .then(url => {
// //               setImageUrl(url);
// //               setLoading(false);
// //             })
// //             .catch(error => {
// //               console.error('Error fetching image:', error);
// //               setLoading(false);
// //             });
// //         } else {
// //           setLoading(false);
// //         }
// //       } catch (error) {
// //         console.error("Error parsing trip details:", error);
// //         setError("Failed to parse trip details");
// //         setLoading(false);
// //       }
// //     } else {
// //       setError("Trip details are not provided");
// //       setLoading(false);
// //     }
// //   }, [params.trip]);

// //   if (loading) {
// //     return (
// //       <View style={styles.centered}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //       </View>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <View style={styles.centered}>
// //         <Text>{error}</Text>
// //       </View>
// //     );
// //   }

// //   if (!tripDetails) {
// //     return (
// //       <View style={styles.centered}>
// //         <Text>No trip details available</Text>
// //       </View>
// //     );
// //   }

// //   let tripData;
// //   try {
// //     tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
// //   } catch (error) {
// //     console.error("Error parsing tripData:", error);
// //     return (
// //       <View style={styles.centered}>
// //         <Text>Error loading trip data</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} style={styles.image} />
// //       <View style={styles.detailsContainer}>
// //         <Text style={styles.locationText}>
// //           {tripDetails.tripPlan?.trip_details?.destination}
// //         </Text>
// //         <Text style={styles.dates}>
// //           📅 {moment(tripData.startDate).format("MMM Do")} - {" "}
// //           {moment(tripData.endDate).format("MMM Do, YYYY")}
// //         </Text>
// //         <Text style={styles.travelers}>
// //           🚌 {tripData.traveler.title} - {tripData.traveler.desc}
// //         </Text>
// //       </View>

// //       <View style={styles.sectionContainer}>
// //         <Text style={styles.sectionTitle}>✈️ Flights</Text>
// //         <FlightInfo flightData={tripDetails?.tripPlan?.flights?.details} />
// //       </View>

// //       <View style={styles.sectionContainer}>
// //         <Text style={styles.sectionTitle}>🏨 Hotels</Text>
// //         <HotelList hotelList={tripDetails?.tripPlan?.hotels?.options} />
// //       </View>

// //       <View style={styles.sectionContainer}>
// //         <Text style={styles.sectionTitle}>🌄 Plan Details</Text>
// //         <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFF',
// //   },
// //   image: {
// //     width: '100%',
// //     height: 200,
// //   },
// //   detailsContainer: {
// //     padding: 20,
// //   },
// //   locationText: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //   },
// //   dates: {
// //     fontSize: 16,
// //     color: '#555',
// //   },
// //   travelers: {
// //     fontSize: 16,
// //     color: '#555',
// //   },
// //   sectionContainer: {
// //     padding: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   centered: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });
// import { View, Text ,Image} from 'react-native'

// import React, { useState, useEffect } from 'react';

// import { useLocalSearchParams, useNavigation } from 'expo-router';

// export default function TripDetails() {
//   const navigation = useNavigation();
//     const {trip}=useLocalSearchParams();
//   // // //   // const tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
//     const [tripDetails, setTripDetails] = useState([]);
  
//     const formatData = (data) => {
//       return JSON.parse(data);
//     };
 
 
 
//   useEffect(() => {
//         navigation.setOptions({
//           headerShown: true,
//           headerTransparent: true,
//           headerTitle: ''

//         });
//         setTripDetails(JSON.parse(trip))
//       },[])
    
//   return (
//     <View>
//    <Image
//       source={{
//           uri:
//             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
//             formatData(tripDetails.tripData).locationInfo?.photoRef +
//              '&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
//          style={{
//             width: '100%',
//             height:100,
//             borderRadius:15
            
//            }}
//       />
//     </View>
//   )
// }
// import { View, Text, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useLocalSearchParams, useNavigation } from 'expo-router';

// export default function TripDetails() {
//   const navigation = useNavigation();
//   const { trip } = useLocalSearchParams();
//   const [tripDetails, setTripDetails] = useState(null);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: '',
//     });

//     try {
//       if (trip) {
//         const parsedTrip = JSON.parse(decodeURIComponent(trip)); // Ensure proper decoding
//         setTripDetails(parsedTrip);
//       }
//     } catch (error) {
//       console.error('Error parsing trip:', error);
//     }
//   }, [trip]);

//   if (!tripDetails) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading trip details...</Text>
//       </View>
//     );
//   }

//   const tripData = typeof tripDetails.tripData === 'string'
//     ? JSON.parse(tripDetails.tripData)
//     : tripDetails.tripData;

//   return (
//     <View>
//       <Image
//         source={{
//           uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
//             tripData?.locationInfo?.photoRef || ''
//           }&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
//         }}
//         style={{
//           width: '100%',
//           height: 100,
//           borderRadius: 15,
//         }}
//       />
//     </View>
//   );
// }
// import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
// import { useNavigation, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from "react";
// // import { Colors } from '../../constants/Colors';
// import moment from 'moment';
// import FlightInfo from '../../component/TripDetails/FlightInfo';
// import HotelList from '../../component/TripDetails/HotelList';
// import PlannedTrip from '../../component/TripDetails/PlannedTrip';
// const Colors = {
//   black: "#000000",
//   white: "#FFFFFF",
//   gray: "#808080",
//   primary: "#007AFF", // Example primary color (iOS blue)
// };
// const Index = () => {
//   const navigation = useNavigation();
//   const { trip } = useLocalSearchParams();
//   const [tripDetails, setTripDetails] = useState(null);

//   const formatData = (data) => {
//     try {
//       return JSON.parse(data);
//     } catch (error) {
//       console.error('Error parsing data:', error);
//       return null;
//     }
//   };

//   const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: '',
//     });

//     if (trip) {
//       const parsedTrip = formatData(trip);
//       setTripDetails(parsedTrip);
//     }
//   }, [trip]);

//   if (!tripDetails) return null;

//   const tripData = formatData(tripDetails?.tripData);
//   const photoRef = tripData?.locationInfo?.photoRef;

//   const imageUrl = photoRef && apiKey 
//     ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
//     : null;

//   const flights = tripDetails?.tripPlan?.trip?.flights || [];
//   const hotels = tripDetails?.tripPlan?.trip?.hotels || [];
//   const tripDailyPlan = tripDetails?.tripPlan?.trip?.itinerary || [];


//   return (
//     <ScrollView>
//       {imageUrl ? (
//         <Image 
//           source={{ uri: imageUrl }} 
//           style={styles.image} 
//         />
//       ) : (
//         <Image 
//           source={require('./../../assets/images/p1.jpg')} 
//           style={styles.image} 
//         />
//       )}
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           {tripDetails.tripPlan?.travel_plan?.destination}
//         </Text>
//         <View style={styles.flexBox}>
//           <Text style={styles.smallPara}>
//             {moment(tripData?.startDate).format("DD MMM YYYY")}
//           </Text>
//           <Text style={styles.smallPara}>
//             - {moment(tripData?.endDate).format("DD MMM YYYY")}
//           </Text>
//         </View>
//         <Text style={styles.smallPara}>
//           🚌 {tripData?.traveler?.title}
//         </Text>

//         {/* Flight Info */}
//         <FlightInfo flightData={flights} />
//         {/* Hotel List  */}
//         <HotelList hotelList={hotels}/>
//         {/* Trip Daily Plan */}
    
//   <PlannedTrip details={tripDailyPlan}/>
//       </View>
//     </ScrollView>
//   );
// }

// export default Index;

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     height: 330,
//   },
//   container: {
//     padding: 15,
//     backgroundColor: Colors.white,
//     height: '100%',
//     marginTop: -30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 25,
//   },
//   smallPara: {
//     fontFamily: 'Outfit',
//     fontSize: 18,
//     color: Colors.gray,
//   },
//   flexBox: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 5,
//     marginTop: 5,
//   },
 
// });
// import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
// import { useNavigation, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from "react";
// import moment from 'moment';
// import FlightInfo from '../../component/TripDetails/FlightInfo';
// import HotelList from '../../component/TripDetails/HotelList';
// import PlannedTrip from '../../component/TripDetails/PlannedTrip';

// const Colors = {
//   black: "#000000",
//   white: "#FFFFFF",
//   gray: "#808080",
//   primary: "#007AFF",
// };

// const Index = () => {
//   const navigation = useNavigation();
//   const { trip } = useLocalSearchParams();
//   const [tripDetails, setTripDetails] = useState(null);

//   const formatData = (data) => {
//     try {
//       return JSON.parse(data);
//     } catch (error) {
//       console.error('Error parsing data:', error);
//       return null;
//     }
//   };

//   const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: '',
//     });

//     if (trip) {
//       const parsedTrip = formatData(trip);
//       setTripDetails(parsedTrip);
//     }
//   }, [trip]);

//   if (!tripDetails) return null;

//   const tripData = formatData(tripDetails?.tripData);
//   const photoRef = tripData?.locationInfo?.photoRef;

//   const imageUrl = photoRef && apiKey 
//     ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
//     : null;

//   const flights = tripDetails?.tripPlan?.trip?.flights || [];
//   const hotels = tripDetails?.tripPlan?.trip?.hotels || [];
//   const tripDailyPlan = tripDetails?.tripPlan?.trip?.itinerary || [];

//   return (
//     <ScrollView>
//       <Image 
//         source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} 
//         style={styles.image} 
//       />
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           {tripDetails.tripPlan?.travel_plan?.destination}
//         </Text>
//         <View style={styles.flexBox}>
//           <Text style={styles.smallPara}>
//             {moment(tripData?.startDate).format("DD MMM YYYY")}
//           </Text>
//           <Text style={styles.smallPara}>
//             - {moment(tripData?.endDate).format("DD MMM YYYY")}
//           </Text>
//         </View>
//         <Text style={styles.smallPara}>
//           🚌 {tripData?.traveler?.title}
//         </Text>

//         {/* Only render components if they exist */}
//         {flights.length > 0 && <FlightInfo flightData={flights} />}
//         {hotels.length > 0 && <HotelList hotelList={hotels}/>}
//         {tripDailyPlan.length > 0 && <PlannedTrip details={tripDailyPlan}/>}
//       </View>
//     </ScrollView>
//   );
// }

// export default Index;

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     height: 330,
//   },
//   container: {
//     padding: 15,
//     backgroundColor: Colors.white,
//     height: '100%',
//     marginTop: -30,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 25,
//   },
//   smallPara: {
//     fontFamily: 'Outfit',
//     fontSize: 18,
//     color: Colors.gray,
//   },
//   flexBox: {
//     flexDirection: 'row',
//     gap: 5,
//     marginTop: 5,
//   },
// });
