import React, { useState, useEffect } from 'react'

import { Grid, Stack, Box, Container } from '@mui/material/';
import "./FrameComponent.css";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import axios_rec_system from '../api/axios_rec_system'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import useAuth from '../hooks/useAuth';
import ReviewCard from './ReviewCard';
import BookRecommendationCard from './BookRecommendationCard';
import CircularProgress from '@mui/material/CircularProgress';
import { SafetyDivider } from '@mui/icons-material';


  

export default function BookDetails() {
    const [existingRating, setExistingRating] = React.useState();  
    const [rating, setRating] = React.useState(existingRating);  

    const [book, setBook] = useState({})
    const [recBooks, setRecBooks] = useState([])
    const { bookId } = useParams()
    
    const [reviewRating, setReviewRating] = useState()
    const { auth } = useAuth();
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/books/${bookId}`);
                setBook(response.data);
                console.log(response.data)
                console.log("fdfsdfsdf")
 
                const existingRatingResponse = await axios.get(`/ratings/book/${bookId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`
                    }
                });
                setExistingRating(existingRatingResponse.data)
                console.log("existing rating: ",existingRating)

                const recBooksResponse = await axios_rec_system.get(`book?book_id=${bookId}`);
                setRecBooks(recBooksResponse.data);
                console.log("rec: ", recBooks)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bookId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const recBooksResponse = await axios_rec_system.get(`book?book_id=${bookId}`);
                setRecBooks(recBooksResponse.data);
                console.log("rec: ", recBooks)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bookId]);

    useEffect(() => {
      try {
        const response = axios.post(`/ratings`,
        {
          "Value": rating,
          "BookId": bookId
      },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }).then(res => {
                console.log(res)
            }
            )
            setExistingRating(rating)
          }
            
            catch(error)
            {
                console.log(error.response)
            }
    }, [rating]);

    

    const handleAddToFav = async () => {
        try {
        const response = await axios.post(`/favoritebooks/${bookId}`,
        {},
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            }).then(res => {
                console.log(res)
            }
            )}
            catch(error)
            {
                console.log(error.response)
            }
    }
    

    

   
    return (
      <Container sx={{paddingTop: '50px'}}>

        <Grid  container spacing={0} justifyContent="center" >

        <Grid item xs={3}>
        <img className="cover" alt="" src={book.image_URL} />
        <Typography variant="h6" > <span>{book.name?.replace(/ *\([^)]*\) */g, "")} </span> </Typography>
        <Typography variant="subtitle1" > <span>{book.author}   </span>   </Typography>
        <Rating
                name="simple-controlled"
                value={existingRating ?? 0}
                onChange={(event, newValue) => {
                setRating(newValue);
                }}/> 
                
        <Typography variant="body2" > <span><Typography variant="subtitle2" > Genres: </Typography>
         {book.genres}  </span>   </Typography>          
                       
        </Grid>

        <Grid item xs={5}>
        <Typography variant="subtitle2" > Description </Typography>
        <Divider sx={{margin: '5px'}}></Divider>
        <Typography variant="body2" > {book.description} </Typography>
        

        <Divider sx={{margin: '5px'}}></Divider>
        <Typography variant="subtitle2" > Published </Typography>
        <Typography variant="body2" > {book.publication_year} </Typography>

        <Divider sx={{margin: '5px'}}></Divider>
        <Typography variant="subtitle2" > ISBN </Typography>
        <Typography variant="body2" > {book.isbn} </Typography>
        </Grid>

        <Grid item xs={3} sx={{paddingLeft: '40px'}}>
        <Typography variant="h5" > <span>You may also like   </span>   </Typography>
            { recBooks.lenght < 1 ? <CircularProgress/> : recBooks.map((r,index) => <BookRecommendationCard key={index} {...r} />)}
        </Grid>

        
      </Grid>
       
        </Container>
      );
    };