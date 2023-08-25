import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { images } from '../../assets/imagesData'
import { FaLocationDot } from 'react-icons/fa6'
import axios from 'axios'
import './hotel-details.css'
import { setHotelDetails } from '../../redux/detailsReducer';

const HotelDetails = () => {

    const dispatch = useDispatch()
    // const [hotelDetails, setHotelDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(id)

    const hotelDetails = useSelector(state => state.details.hotelDetails)

    useEffect(() => {
        getHotelDetails(id)

    }, [])

    const getHotelDetails = (id) => {
        axios.get(`/getHotelDetails/?id=${id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    // setHotelDetails(res.data)
                    dispatch(setHotelDetails(res.data))
                    setLoading(false)

                }
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })


    }
    if (!hotelDetails) return "Loading..."
    return (
        <div id='hotel-details'>
            <div className="container">
                <div className="hotel-image">
                    <img src={images[Math.floor(Math.random() * 10)]} alt="image" width={500} />
                    <h3>{hotelDetails?.title}</h3>
                    <p> <FaLocationDot /> {" "}{hotelDetails?.address}</p>
                    <p className='description'>{hotelDetails?.description}</p>
                </div>

            </div>
        </div>
    )
}

export default HotelDetails