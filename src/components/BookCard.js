import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
import Autocomplete from "@mui/material/Autocomplete";
import lodash from "lodash";


export default function BookCard() {
    const locationResults = [];
    const [results, setResults] = useState({})
    const [book, setBook] = useState({})
    const [reviews, setReviews] = useState([])
    const [recBooks, setRecBooks] = useState([])
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
                console.log(response.data)

                const reviewResponse = await axios.get(`/reviews/book/${bookId}`);
                setReviews(reviewResponse.data);

                const recBooksResponse = await axios_rec_system.get(`book?book_id=${bookId}`);
                setRecBooks(recBooksResponse.data);
                console.log("rec: ", recBooks)
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
    
    const [, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const url = `https://localhost:7259/api/books/search?name=`;
    axios
      .get(url)
      .then(function(response) {
        // handle success
        const { status, data } = response;
        if (status === 200) {
          const b = lodash.map(data, "name");
          // console.log(b);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleChange = event => {
    setInputValue(event.target.value);
    const url = `https://localhost:7259/api/books/search?name=${event.target.value}`;
    axios
      .get(url)
      .then(function(response) {
        // handle success
        const { status, data } = response;
        if (status === 200) {
          console.log(data);
          setOptions(data);
          setData(data);
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

    return (
       
            <Grid container spacing={5} sx={{marginTop: '30px'}}>
                <Grid item xs={3}  sx={{maxHeight:"450px"}}>
                    <img className="bookcard-cover" src={book.image_URL}/>
                    <Autocomplete
                        id="google-map-demo"
                        style={{ width: 300 }}
                        getOptionLabel={option =>
                        typeof option === "string" ? option : option.name
                        }
                        filterOptions={x => {
                        return x;
                        }}
                        options={data.map((option) =>({id: option.id, name: option.name, author: option.author.fullName}))}
                        autoComplete
                        includeInputInList
                        freeSolo
                        disableOpenOnFocus
                        renderInput={params => (
                        <TextField
                            {...params}
                            label="Add a location"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                        )}
                        renderOption={option => {
                        return (
                            <Grid container alignItems="center">
                                {console.log(option)}
                            <Grid item xs>
                                {option.key}
                            </Grid>
                            </Grid>
                        );
                        }}
                    />
                </Grid>
                
                <Grid item xs={5} >
                    < Stack direction="column" justifyContent="center" alignItems="center"  >
                        <Typography variant="h2" >
                            {book.name?.replace(/ *\([^)]*\) */g, "")}
                        </Typography>
                        <Divider />


                        <Typography variant="h3" >
                            {book.author} 
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
                
                <Grid item xs={1}  sx={{maxHeight:"450px"}}>
                <Typography fontWeight="md" textColor="success.plainColor" mb={0.5}>
                Similar books:
                </Typography>
                {/* {(recBooks.length === 0) ? (<CircularProgress/>) : ({recBooks.map((r,index) => <BookRecommendationCard key={index} {...r} />)})} */}
                { recBooks.lenght < 1
                  ? 
                    
                  <CircularProgress/> : recBooks.map((r,index) => <BookRecommendationCard key={index} {...r} />)
             }
                   
                </Grid>
              
                
            </Grid>
                                     
            // {reviews.map((r,index) => <ReviewCard key={index} {...r} />)}

       
    )
}