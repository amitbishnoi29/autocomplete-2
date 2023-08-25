import React, { useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from "lodash";
import { useSelector, useDispatch } from 'react-redux';
import { FaHotel, FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { setHotelSuggestions, setLocationSuggestions } from '../../redux/suggestionReducer';
import axios from 'axios'
import './homepage.css'

const Homepage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const data = useSelector(state => state.suggestions)
    const suggestions = data.locationSuggestions
    const hotels = data.hotelSuggestions
   
    console.log(suggestions)
    console.log(hotels)

    useEffect(() => {
        if (input.length > 0) {
            getLocationSuggestions(input)
            getHotelSuggestions(input)
        } else {
            dispatch(setLocationSuggestions({}))
        }

    }, [input])

    const getLocationSuggestions = (input) => {
        axios.get(`/?query=${input}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    dispatch(setLocationSuggestions(res.data.data))
                    // setSuggestions(res.data.data)
                }
            })
            .catch(err => console.error(err))
    }

    const getHotelSuggestions = (input) => {
        axios.get(`/getHotels/?query=${input}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    dispatch(setHotelSuggestions(res.data.data))
                    // setHotels(res.data.data)

                }
            })
            .catch(err => console.error(err))
    }


    const onNameChange = useMemo(
        () =>
            debounce((e) => {
                if (e.target.value === '') dispatch(setLocationSuggestions({}))
                setInput(e.target.value)
            }, 0),
        []
    );

    return (
        <div id='homepage'>
            <div className="container">
                <div>
                    <input onChange={onNameChange} type="text" placeholder='Search for a Place or Hotel' />
                </div>
                {Object.keys(suggestions).length > 0 && (
                    <div className='suggestions'>
                        <div className='locations'>
                            <div className='heading'>Locations</div>
                            {suggestions?.predictions?.map(({ description, place_id }) => {
                                return (
                                    <div key={place_id} data-testid="location-suggestion" className='location' onClick={() => navigate(`/place/${place_id}`)}>
                                        <span className='icon'>{<FaLocationDot />}</span>
                                        <span className='location-name'>{description.split(',')[0]}</span>
                                        {description.split(",").length > 1 && ", "}<span className='location-address'>{description.split(',').slice(1).join(', ')}</span>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='Hotels'>
                            <div className='heading'>Hotels</div>
                            {hotels.length > 0 ? (
                                hotels.map(hotel => {
                                    return (
                                        <div key={hotel.hotelID} data-testid="hotel-suggestion" className='hotel' onClick={() => navigate(`/hotel/${hotel.hotelID}`)}>
                                            <span className='icon'>{<FaHotel />}</span>
                                            <span className='hotel-name'>{hotel.title}</span> ,
                                            {' '}<span className='hotel-address'>{hotel.address}</span>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='no-hotels-found'><i>No hotels Found</i></div>
                            )}
                        </div>
                    </div>)}

            </div>
        </div>
    )
}

export default Homepage