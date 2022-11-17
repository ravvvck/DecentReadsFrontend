import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import useAuth from '../hooks/useAuth';
import ReviewCard from './ReviewCard';


export default function BookCard() {
    
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const { bookId } = useParams()
    const [open, setOpen] = useState(false);
    const [reviewContent, setReviewContent] = useState("")
    const [reviewRating, setReviewRating] = useState()

    const { auth } = useAuth();
    

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`/books/${bookId}`);
                setBook(response.data);
                const reviewResponse = await axios.get(`/reviews/book/${bookId}`);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bookId]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReviewContent = (e) => {
        setReviewContent(e.target.value)
        console.log(auth.accessToken)
    }

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
    

    const handleSendReview = async () => {
        const response = await axios.post("/reviews/",
            {
                "Rating": reviewRating,
                "ReviewContent": reviewContent,
                "ReviewBookId": bookId
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            })

            setReviewContent("");
    }

   



    return (
        <Grid item xs={10} sx={{ marginTop: 10 }}>
            <Grid container={true} spacing={8}>
                <Grid item xs={4}  sx={{maxHeight:"450px"}}>
                    <img className="bookcard-cover" src="https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png" 
                   />
                </Grid>
                <Grid item xs={8} >
                    < Stack direction="column" justifyContent="center" alignItems="center"  >
                        <Typography variant="h2" >
                            {book.name}
                        </Typography>
                        <Divider />


                        <Typography variant="h3" >
                            {book.authorFirstName} {book.authorLastName}
                        </Typography>
                        <Divider variant="middle" />

                        <Typography variant="overline" >
                        <Rating name="read-only" value={parseInt(book.avgRate)} readOnly precision={0.5} />
                        
                        </Typography>
                        <Divider variant="middle" />

                        <Typography variant="body2" >
                            {book.description}
                        </Typography>

                        {auth.isLogged ?
                             [reviews.find(r => r.madeBy == auth.user) === undefined ?
                        <Button onClick={handleClickOpen}> Write a review </Button> :
                        <Button inactive="true">You already reviewed this book!</Button>] :
                        <Button inactive="true">Log in to review!</Button> }
                        <Button onClick={handleAddToFav}> Add to favorites </Button> 
                    

                     
                        



                        <Dialog open={open} onClose={handleClose} >

                            <DialogTitle>Leave a review</DialogTitle>
                            <DialogContent>



                                <Typography component="legend" sx={{ marginTop: "20px" }}>Rate the book</Typography>
                                <Rating name="reviewRating"
                                    value={parseInt(reviewRating) || ''} 
                                    onChange={(event, newValue) => {
                                        setReviewRating(newValue);
                                    }} />

                                <TextField
                                    autoFocus
                                    multiline
                                    margin="dense"
                                    id="reviewContent"
                                    onChange={handleReviewContent}
                                    label="Enter your review(optional)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleSendReview}>Send</Button>
                            </DialogActions>

                        </Dialog>




                    </Stack>
                </Grid>
            </Grid>

            {reviews.map((r,index) => <ReviewCard key={index} {...r} />)}

        </Grid>
    )
}