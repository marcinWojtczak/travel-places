import React, {useContext, useState} from 'react';
import { useGetHotelsQuery } from '../../../services/travelAdvisor';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { BoundsContext } from '../../../App';

const Slider = () => {
  
  const {bounds} = useContext(BoundsContext)

  const { data: hotelsData, isLoading } = useGetHotelsQuery(bounds);

  if(isLoading) return <h4>Loading...</h4>
  
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={'auto'}
        style={{
          '--swiper-navigation-size': '30px',
          '--swiper-navigation-color': 'white',
        }}
        navigation={true}
        pagination={{ el:'.swiper-pagination', clickable: true }}
      >
        {hotelsData?.data
          ?.filter((hotel) => hotel.ranking_position)
          .slice(0, 10)
          .sort((a, b) => a.ranking_position - b.ranking_position)
          .map((hotel, index) => (
            <SwiperSlide key={index} className='flex-col basis-1/3'>
              <div 
                style={{backgroundImage: `url("${hotel?.photo?.images?.original?.url}")`}}
                className='h-[350px] lg:h-[200px] xl:h-[250px] 2xl:h-[300px]  bg-cover bg-center mb-2'
              >
              </div>
              <div className='flex flex-col gap-2'>
                <h5 className='font-semibold'>{hotel.name}</h5>
                <p className='font-medium text-zinc-700'>Number Reviews: {hotel?.num_reviews}</p>
                <p className='font-medium text-zinc-700'>Rating: {hotel?.rating}</p>
                <p className='font-medium text-zinc-700'>Price: {hotel?.price}</p>
              </div>
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider