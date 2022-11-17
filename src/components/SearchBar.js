import {useState, useEffect} from 'react'
import React from 'react'
import axios from '../api/axios'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Link} from 'react-router-dom'

  function SearchBar() {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
                const response = await axios.get(`books/search?name=${query}`);
                setData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        if (query !== "" & query !== undefined) {
            fetchData();
        }
        
      }, [query]);
  
    const handleQuery = (e) => {
        const {value} = e.target 
        setQuery(value)
        
    }

    
 
      
  

    return (
      <div className="searchbar">
       <Stack spacing={2} sx={{ width: 300 }}>
        
        <Autocomplete
            open
          freeSolo
          
          id="searchbar"
          clearOnEscape={true}
          onChange={handleQuery}
          onClose={()=>setData([])}
          options={data.map((option) =>({id: option.id, name: option.name, author: option.author.firstName + option.author.lastName}))}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleQuery}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
          renderOption={(props, option, state) => {
            return (
              <li {...props}  >
                <Link
                  to={`bookcard/${option.id}`}>
                  <b>{option.name}</b> by {option.author}
                </Link>
              </li>
            );
          }}

          
          
        />
      </Stack>
      </div>
    );
  }
  
  export default SearchBar;