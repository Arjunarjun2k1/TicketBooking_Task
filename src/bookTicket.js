import React, { useEffect, useState } from "react";

const BookTickets = ()=>{
    const [movies,setMovies] = useState([
        {id:1,name:'Avegers EndGame',price:200,occupiedSeats:[]},
        {id:2,name:'LEO',price:200,occupiedSeats:[]},
        {id:3,name:'Toy Story 4',price:150,occupiedSeats:[]}
    ])
    const [selectedMovie,setSelectedMovie] = useState(2)
    const seatStatus = [{name:'N/A',color:'white'},{name:'Selected',color:'green'},{name:'Occupied',color:'black'}]
    const [numberOfSeatsSelected,setNumberOfSeatsSelected] = useState(0)
    
    useEffect(()=>{
        let arr = []
        for(let i=0;i<48;i++){
            arr.push({color:'white',id:i+1,selected:false,occupied:false})
        }
        let addingSeats = movies.map((value)=>{
            return{
                ...value,
                occupiedSeats:[...arr]
            }
        })
        setMovies([...addingSeats])
    },[])
    
    useEffect(()=>{
        let count = movies[selectedMovie-1].occupiedSeats.filter((value)=>{
            return value.selected===true
        })
        setNumberOfSeatsSelected(count.length)
    },[movies])

    const handleSelection = (id)=>{
        let existingMovies = movies
        let array = movies[selectedMovie-1].occupiedSeats.map((value)=>{
            if(value.id===id && !value.occupied){
                return{
                    ...value,
                    selected:!value.selected
                }
            }else{
                return {...value}
            }
        })

        existingMovies[selectedMovie-1].occupiedSeats = [...array]
        setMovies([...existingMovies])
    }

    const handleSelect = (e)=>{
        setSelectedMovie(e.target.value)
        setNumberOfSeatsSelected(0)
        let changeStatus = movies.map((value)=>{
            return{
                ...value,
                occupiedSeats:value.occupiedSeats.map((item)=>{
                    return{
                        ...item,
                        selected:false
                    }
                })
            }
        })
        setMovies([...changeStatus])
    }

    const handleBooking = ()=>{
        let existingMovies = movies
        let array = movies[selectedMovie-1].occupiedSeats.map((value)=>{
            if(value.selected){
                return{
                    ...value,
                    occupied:true,
                    selected:false
                }
            }else{
                return {...value}
            }
        })

        existingMovies[selectedMovie-1].occupiedSeats = [...array]
        setMovies([...existingMovies])
        setNumberOfSeatsSelected(0)
    }
    return(
        <>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <div style={{display:'flex'}}>
                    <h4 style={{color:'violet',marginRight:'8px'}}>SELECT A MOVIE :</h4>
                    <select value={selectedMovie} onChange={(e)=>handleSelect(e)}>
                        {movies.map((value)=>{
                            return(
                                <option value={value.id}>{`${value.name} (${value.price})`}</option>
                                )
                            })}
                    </select>
                </div>
                <div style={{backgroundColor:'lightgray',width:'50%',display:'flex',justifyContent:"space-between",padding:'8px',margin:'8px'}}>
                    {seatStatus.map((value)=>{
                        return(
                            <div style={{display:'flex'}}>
                                <div style={{border:'1px solid black',height:'20px',width:'20px',backgroundColor:value.color,marginRight:'8px'}}></div>
                                <p>{value.name}</p>
                            </div>
                        )
                    })}
                </div>
               <div style={{display:'grid',gridTemplateColumns:'auto auto auto auto auto auto auto auto',backgroundColor:'lightgray',width:'20%',margin:'8px',}}>
                   {movies[selectedMovie-1].occupiedSeats.map((value)=>{
                        return(
                            <div onClick={()=>handleSelection(value.id)} style={{border:'1px solid black',height:'20px',width:'20px',margin:'8px',backgroundColor:`${value.occupied===true ? 'black' : value.selected===true ? 'green' : 'white'}`}}></div>
                        )
                   })}
                </div>
                <p style={{margin:'8px'}}>You have selected {numberOfSeatsSelected} seats for the price of {numberOfSeatsSelected * movies[selectedMovie-1].price}</p>
                <button onClick={handleBooking}>BOOK</button>
            </div>
        </>
    )
}

export default BookTickets;