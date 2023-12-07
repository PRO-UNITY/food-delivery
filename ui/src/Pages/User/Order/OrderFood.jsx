import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';


const OrderFood = () => {
    const [map, setMap] = useState(null);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

   useEffect(() => {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         setLocation({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
         });
       },
       (error) => {
         console.error(error);
       }
     );
   }, []);
    const handleMapLoad = (mapInstance) => {
     setMap(mapInstance);
   }
   const handlePlaceChange = (event) => {
     const { lat, lng } = event.latLng;
     setLocation({ latitude: lat, longitude: lng });
   }
   const sendLocation = async () => {
     if (!location.latitude || !location.longitude) return;
     try {
       await fetch('/api/location', {
         method: 'POST',
         body: JSON.stringify(location),
         headers: {
           'Content-Type': 'application/json',
         },
       });
       alert('Location sent successfully!');
       console.log(location);
     } catch (error) {
       console.error(error);
     }
   };

    return(
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card w-50">
                <div className="card-header bg-primary text-light">
                    <h3>Order Food</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={sendLocation}>
                        <input placeholder="type your address" className="form-control mb-2" type="text" />
                        {/* <div className='bg-primary' style={{width:"200px"}}>
                        <LoadScript
                           googleMapsApiKey=""
                           libraries={['places']}
                         >
                           <GoogleMap
                             mapContainerStyle={{ width: '100vw', height: '400px' }}
                             zoom={8}
                             center={location}
                             onLoad={handleMapLoad}
                             onClick={handlePlaceChange}
                           >
                             {location.latitude && location.longitude && (
                               <Marker position={location} />
                             )}
                           </GoogleMap>
                         </LoadScript></div> */}
                        <button className="btn btn-primary">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OrderFood

// import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// function MyComponent() {
//   const [map, setMap] = useState(null);
//   const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }, []);

//   const handleMapLoad = (mapInstance) => {
//     setMap(mapInstance);
//   };

//   const handlePlaceChange = (event) => {
//     const { lat, lng } = event.latLng;
//     setLocation({ latitude: lat, longitude: lng });
//   };

//   const sendLocation = async () => {
//     if (!location.latitude || !location.longitude) return;
//     try {
//       await fetch('/api/location', {
//         method: 'POST',
//         body: JSON.stringify(location),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       alert('Location sent successfully!');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey={YOUR_API_KEY}
//       libraries={['places']}
//     >
//       <GoogleMap
//         mapContainerStyle={{ width: '100vw', height: '400px' }}
//         zoom={8}
//         center={location}
//         onLoad={handleMapLoad}
//         onClick={handlePlaceChange}
//       >
//         {location.latitude && location.longitude && (
//           <Marker position={location} />
//         )}
//       </GoogleMap>
//       <button onClick={sendLocation}>Send Location</button>
//     </LoadScript>
//   );
// }

// export default MyComponent;
