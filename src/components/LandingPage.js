import React from 'react'
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material/';


export default function LandingPage() {
    return (
        <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center" >
            <Grid item xs={8}>
                <Typography variant='h1' align='center' sx={{ color: "white" }}>

                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant='h5' align='center' sx={{ color: "black", fontWeight: "normal", marginTop: '40px', marginBottom: '40px' }}>
                    Demo project made with:
                </Typography>
            </Grid>

            <Grid item xs={8} >
                <Stack direction="row"

                    justifyContent="center"
                    alignItems="center"
                    spacing={8}>

                    <img src='/react_logo.png' className='landingpage--tech--logo--react' />
                    <img src='/net_core_logo.png' className='landingpage--tech--logo' />
                    <img src='/material_logo.png' className='landingpage--tech--logo' />

                </Stack>
            </Grid>



        </Grid>

    )
}