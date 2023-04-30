import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const travelAdvisorHeaders = {
  'x-rapidAPI-key': '3105332e11msh264d437b14b7e68p1e62d8jsnb3ffd57a961a',
  'x-rapidAPI-host': 'travel-advisor.p.rapidapi.com',
}

const baseUrl = 'https://travel-advisor.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: travelAdvisorHeaders})

export const travelApi = createApi({
  reducerPath: 'travelApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTravelLocations: builder.query({
      query: (searchingDestination) => createRequest(`/locations/search?query=${searchingDestination}`)

    }),
    getTravelAttractions: builder.query({
      query: (location_id) => createRequest(`/attractions/list?location_id=${location_id}`)
    }),
    getHotels: builder.query({
      query: (location_id) => createRequest(`/hotels/list?location_id=${location_id}`)
    })
  })  
})

export const { useGetTravelLocationsQuery, useGetTravelAttractionsQuery, useGetHotelsQuery } = travelApi
