import React, { useRef, useState, useContext } from 'react'
import { sanFrancisco,  } from '../../assets/index';
import {Autocomplete} from '@react-google-maps/api';
import { CoordinatesContext, PlacesContext, BoundsContext } from '../../App';




const Main = ({ coord }) => {

  const { coordinates, setCoordinates } = useContext(CoordinatesContext)
  const { bounds, setBounds } = useContext(BoundsContext)
  console.log({bounds})
  const { places, setPlaces } = useContext(PlacesContext)
  const [autocomplete, setAutocomplete] = useState(null)
  const onLoad = (autoC) => setAutocomplete(autoC)


  const onPlaceChanged = () => {
    const newPlaces = autocomplete.getPlace();
    setPlaces(newPlaces);
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const ne = {
      lat: autocomplete.getPlace().geometry.viewport.getNorthEast().lat(),
      lng: autocomplete.getPlace().geometry.viewport.getNorthEast().lng(),
    };
    const sw = {
      lat: autocomplete.getPlace().geometry.viewport.getSouthWest().lat(),
      lng: autocomplete.getPlace().geometry.viewport.getSouthWest().lng(),
    };
    setCoordinates({lat, lng})
    setBounds({ ne, sw })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div style={{backgroundImage: `url(${sanFrancisco})` }} className='bg-center bg-cover w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-2/3 text-center'>
          <h1 className='font-bold w-content tracking-wider mb-6'>Explore the World with Us - Your Ultimate Travel Guide</h1>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
            <form  onSubmit={handleSubmit}>
            <input className='w-full h-16 border-0 outline-none rounded-lg pl-8 text-[black]   'placeholder='Search destination'
            type='text'
            name='destination'
        
            >
            </input>
            <button type='submit'></button>
          </form>
          </Autocomplete>
        </div>
      </div>
    </>
  )
}

export default Main