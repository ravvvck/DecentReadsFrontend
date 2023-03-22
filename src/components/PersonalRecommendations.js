import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import axios_rec_system from '../api/axios_rec_system'


import useAuth from '../hooks/useAuth';

import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

export default function PersonalRecommendations() {
    const { auth } = useAuth();
    const [ratedBooks, setRatedBooks] = useState(); 
    const [recommendedBooks, setRecommendedBooks] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const ratedBooksResponse = await axios.get(`ratings/personal`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`
                    }
                });

                setRatedBooks(ratedBooksResponse.data);
                console.log("ratedBooks: ", ratedBooks)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const body = JSON.stringify(ratedBooks)
                const recommendedBooksResponse = await axios_rec_system.post(`personalized`,
                {
                    ratedBooks
                 },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                            
                        }
                    })
                    const arr = recommendedBooksResponse.data
                    console.log('arr :', arr)
                  setRecommendedBooks(arr);
                console.log("rec: ", recommendedBooks)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [ratedBooks]);


    return (

        <Container>
            <Grid container spacing={0} sx={{marginTop: '30px'}}>
            <Grid item xs={2}></Grid>
            
            <Grid item xs={8}>
                <Typography variant="h5" >Personalized recommendations based on your previously rated books</Typography>
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Genres</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {recommendedBooks.map((row) => (
            <TableRow
              key={row.book_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>console.log('click')}
            >
                <TableCell align="right"><img  alt="" src={row.cover_image_url} /></TableCell>
              <TableCell component="th" scope="row">
              <Link href={'/bookdetails/' + row.book_id}variant="body2" underline="none"> {row.title} </Link>
                
              </TableCell>
              
              
             <TableCell align="right">{row.genres}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Grid> 
                
            

                <Grid item xs={2}></Grid>
                </Grid>
         </Container>       
      
                                     

       
    )
}