import { Box, Stack, Rating, Typography } from "@mui/material";
import React from "react";
import {  format } from 'date-fns'


const ReviewCard = (props) => {
    return(
        <Box container="true" sx={{marginTop: '10px', boxShadow: 4, padding: '10px'}}>
        <Box container="true" sx={{ display: 'flex' }}>
            <Stack direction="row" spacing={2} >
                <b >{props.madeBy} </b> <Rating readOnly  name="reviewRating" value={parseInt(props.rating)}/>
                <Typography variant="overline" display="block" gutterBottom  sx={{justifyContent: 'flex-end' }}>
        {format(new Date(props.created), 'yyyy-MM-dd') }
        
      </Typography >
      
            </Stack>
            
        </Box>

        <Box sx={{ textAlign: 'left', maxWidth: "60%"}}>
            <Typography variant="body1">
            {props.reviewContent}
            </Typography>
        </Box>

        </Box>

    )
}

export default ReviewCard