import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {TextField, makeStyles} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

// icons
import {FaRegUserCircle} from 'react-icons/fa'

import './Widgets.css'

const topRestaurants = [
    { name: "Church's Chicken"},
    { name: "Panago Pizza"},
    { name: "Omega Pizza & Wings"},
    { name: "Sango Japanese"},
    { name: "Sky Dragon"},
    { name: "Sakeya Sushi"},
    { name: "McDonald's"},
    { name: "Freshslice Pizza"},
    { name: "Dairy Queen"},
    { name: "Megabite Pizza"},
    { name: "Nagano"},
    { name: "Pizza Factory Tricity"},
]

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#8D9499',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8D9499',
            },
        }
    }
}));

const SearchBar = () => {

    const classes = useStyles();

    return (
        <div id="restaurant-header-search-bar">
            <Autocomplete
                freeSolo
                options={topRestaurants.map(option => option.name)}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        className={classes.root}
                        size="small"
                        margin="normal" 
                        variant="outlined" 
                        placeholder="Search for Restaurant"
                    />
                )}
            />
        </div>
    )
}



const Header = (props) => {
    return (
        <header id="restaurant-header">
            <Link id="restaurant-header-logo" to='/'>
                    <span>LOGO</span>
            </Link>
            <SearchBar/>
            <Link id="restaurant-header-log-in" to={`${props.location.pathname}/login`}>
                <span id="svg-container"><FaRegUserCircle/></span>
                <span>LOG IN</span>
            </Link>
        </header>
    )
}

export default withRouter(Header)