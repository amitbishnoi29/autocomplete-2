import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './place-details.css'
import { setPlaceDetails } from '../../redux/detailsReducer.js';

const PlaceDetails = () => {
    const dispatch = useDispatch()
    // const [placeDetails, setPlaceDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(id)

    const placeDetails = useSelector(state => state.details.placeDetails)

    useEffect(() => {
        getPlaceDetails(id)
    }, [])

    const getPlaceDetails = (id) => {
        axios.get(`/getPlaceDetails/?id=${id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    dispatch(setPlaceDetails(res.data))
                    // setPlaceDetails(res.data)
                    setLoading(false)
                    // return res?.data?.result?.photos[0]?.photo_reference
                }
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }

    if (Object.keys(placeDetails).length===0) return "Loading..."

    return (

        <div className='place-details'>
            <div className='container'>
                <div className="place-name">
                    Place Name :
                    <div>{placeDetails?.result?.name}</div>
                    <p>{placeDetails?.result?.formatted_address}</p>
                </div>

                <div className='map-link'>
                    <h3>Google Maps Link : </h3>
                    <span><a target='_blank' href={`${placeDetails?.result?.url}`}>{placeDetails?.result?.url}</a> </span>
                </div>

                <div className='coords'>
                    <h3>Coordinates: </h3>
                    <p>Lat : {placeDetails?.result?.geometry?.location?.lat}</p>
                    <p>Lng : {placeDetails?.result?.geometry?.location?.lng}</p>
                </div>

                <div className='viewports'>
                    <div><h3>Viewports: </h3></div>
                    <div style={{ paddingLeft: 20 }}>
                        <h5>NorthEast:</h5>
                        <p>Lat : {placeDetails?.result?.geometry?.viewport?.northeast?.lat}</p>
                        <p>Lng : {placeDetails?.result?.geometry?.viewport?.northeast?.lng}</p>
                    </div>

                    <div style={{ paddingLeft: 20 }}>
                        <h5>Southwest:</h5>
                        <p>Lat : {placeDetails?.result?.geometry?.viewport?.southwest?.lat}</p>
                        <p>Lng : {placeDetails?.result?.geometry?.viewport?.southwest?.lng}</p>
                    </div>

                </div>
                {placeDetails?.result?.website && <>
                    <div>
                        <h3>Website :</h3>
                        <a target='_blank' href={placeDetails?.result?.website}>{placeDetails?.result?.website}</a>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default PlaceDetails