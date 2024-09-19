import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemp, getView } from "../Redux/tempSlide";
import { useEffect, useState } from "react";

function About_room({room}) {


    return ( 
        <div className="container about-container">
           
           <div className="top-container">
           <div className="options">
           <Link className='back' style={{color:'#ea2430'}} to={"/"} onClick={useDispatch(getTemp())}> <FaArrowLeftLong className='back-arrow'/> Go Back </Link>
            <button disabled={room.status == 'available'}>{room.status == 'available' ? "Book Now": 'Room is not available'}</button>
           </div>
           
           <div>
                <h1>{room.category} {room.size}</h1>
                <h3>Room</h3>

            </div>
           </div>
           <div className="bottom-container">
            <div className="about">
                <h1>About Room</h1>
                <div>
                    <p>We offers an exquisite blend of elegance and comfort, designed for the discerning guest seeking a refined experience
                    . The room features plush furnishings, including a king-sized bed draped in premium linens, a spacious seating area with designer armchairs, 
                    and modern artwork that adds a sophisticated touch. </p>
                    <p>
                    The décor balances contemporary style with classic opulence, using rich textures and a neutral 
                    color palette. Large windows allow natural light to flood the room, 
                    offering stunning views. High-end amenities such as a flat-screen TV, minibar, and marble en-suite bathroom with a rain shower complete 
                    the luxurious ambiance.
                    </p>
                </div>
            </div>
            <div className="Amenities">
                <h1>Amenities</h1>
                <div>
                   <div>
                        <p>Size</p>
                        <p>Connectivity</p>
                        <p>Guests</p>
                        <p>Occupanc</p>
                        <p>Status</p>
                   </div>
                   <div>
                        <p>175 square feet</p>
                        <p>Free Wi-Fi</p>
                        <p>Up to {Number(room?.adult) + Number(room?.children)} guests</p>
                        <p>{room?.adult} adults and {room?.children} childrens</p>
                        <p>{room.status}</p>
                   </div>
                </div>
            </div>
            <div  className="last-container">
            <div>
                <h1>Images</h1>
            </div>
           {room?.img.map((imgURL , index)=> <div key={index}>
                <img src={imgURL}/>
                </div>) } 
            </div>
           </div>

        </div>
     );
}

export default About_room;