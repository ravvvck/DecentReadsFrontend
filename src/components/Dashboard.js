import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'


export default function Dashboard() {
    const [favBooks, SetFavBooks] = useState([]);
    const { auth } = useAuth();
    useEffect(() => {
        const fetch = async () => {
            try {
                const favUserBooks = await axios.get(`/books/favorite/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${auth.accessToken}`
                        }
                    })
                SetFavBooks(favUserBooks.data);

            }
            catch (error) {
                console.log(error.response);
            }
        }
        fetch();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', maxWidth: 30, hide: true },
        { field: 'name', headerName: 'Title', width: 400 },
        { field: 'author', headerName: 'Author', width: 125, minWidth: 150, maxWidth: 200 },
        { field: 'added', headerName: 'Added', width: 125, minWidth: 150, maxWidth: 200 }
    ];

    const rows = favBooks.map(b => ({
        id: b.bookId,
        name: b.bookTitle,
        author: b.bookAuthor,
        added: format(new Date(b.added), 'yyyy-MM-dd')
    }))

    return (
        <>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Stack>
                    <Typography>
                        Your favorite books
                    </Typography>
                </Stack>


            </Box>
            <div sx={{ width: '800px' }}>
                <DataGrid rows={rows} columns={columns} autoHeight minWidth='800px' disableSelectionOnClick disableColumnSelector={true} />
            </div>
        </>
    )
}