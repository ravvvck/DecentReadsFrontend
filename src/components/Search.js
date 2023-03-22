import {useState, useEffect} from 'react'
import React, { useRef } from 'react'
import axios from '../api/axios'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {Link} from 'react-router-dom'

  function Search() {
    const [data, setData] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const autoC = useRef(null);

      
    const handleChange = event => {
        setInputValue(event.target.value);
        const url = `https://localhost:7259/api/books/search?name=${inputValue}`;
        axios
          .get(url)
          .then(function(response) {
            // handle success
            const { status, data } = response;
            if (status === 200) {
              console.log(data);
              setOptions(data);
              setData(data);
              console.log("OPTIONS ", options)
            }
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      };

      const clear_values = () => {
        setData([]);
        setInputValue("");
        setOptions([]);
      }
    

    return (
      <div className="searchbar">
       <Stack spacing={2} sx={{ width: 300 }}>
        
       <Autocomplete
                       inputValue={inputValue}
                        id="google-map-demo"
                        style={{ width: 300 }}
                        getOptionLabel={option =>
                        typeof option === "string" ? option : option
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
                            label="Search"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                        />
                        )}
                        renderOption = {(props, option, state) => {
                            return (
                              <li {...props}  >
                                <Link 
                                  to={`bookdetails/${option.id}`} underline="none" onClick={()=>setInputValue('')}>
                                  
                                  <b>{option.name?.replace(/ *\([^)]*\) */g, "")}</b> by {option?.author}
                                </Link>
                              </li>
                            );
                          }}
                    />


      </Stack>
      </div>
    );
  }
  
  export default Search;