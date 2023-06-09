import React from 'react';
import { BsGlobe } from "react-icons/bs";
import ReactStarRatings from 'react-star-ratings';

const PlaceDetails = ({selected, refProp, place }) => {

  //convert rating to number
  const rating = Number(place?.rating)

  if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})

  return (
    <div className='flex flex-row gap-4'>
      <div className='px-2 mb-4 flex flex-col gap-3 p-4 w-full'>
        <div className='flex justify-between gap-4'>
          <div className='basis-[60%]'>
            <h4 className='font-bold'>{place.name}</h4>
            {rating &&
            <ReactStarRatings
              rating={rating}
              starRatedColor='gold'
              numberOfStars={5}
              name='rating'
              starDimension='25px'
              starSpacing='2px'
            >
            </ReactStarRatings>
            } 
            <p>{place.num_reviews} reviews</p>
          </div>
          <div className='basis-[40%]'>
            <img src={place?.photo ? place.photo.images?.large?.url : ''} className='rounded-lg' alt='img'/>
          </div>
        </div>
        <div className='flex justify-between'>
          <p>Ranking: </p>
          <p>{place?.ranking}</p>
        </div>
        {place.price &&
        <div className='flex justify-between'>
          <p>Price: </p>
          <p>{place.price}</p>
        </div>
        }
        <div className='flex flex-wrap gap-2'>
          {place?.cuisine?.map(({name}, index) => (
            <label className='border-2 rounded-md px-3 bg-gray-300' key={index}>{name}</label>
          ))}
        </div>
        <div className='flex items-center'>
          <a className='underline underline-offset-2 mr-10 text-blue-900' target='_blank' rel="noreferrer" href={place?.web_url}><BsGlobe className='inline mr-1 '/>Trip Advisor Website</a>
          <a className='underline underline-offset-2 text-blue-900' target='_blank' rel="noreferrer" href={place?.website}> Website</a>
        </div>
      </div>  
    </div>
  )
}

export default PlaceDetails