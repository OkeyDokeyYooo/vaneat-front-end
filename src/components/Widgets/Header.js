import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {TextField, makeStyles} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

// redux
import { useSelector } from 'react-redux'

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

    const classes = useStyles()
    // when use click enter, then start search weather we have the restaurant
    const handleChange  = (event) => {
        console.log(event.target.value)
    }

    return (
        <div id="restaurant-header-search-bar">
            <Autocomplete
                freeSolo
                loadingText={'Loading...'}
                onChange={e => handleChange(e)}
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

    const user = useSelector(state => state.user)
    const match = useRouteMatch()

    console.log(user.isLogIn)

    return (
        <header id="restaurant-header">
            <Link id="restaurant-header-logo" to='/'>
                    <span>LOGO</span>
            </Link>
            <SearchBar/>
            {
                user.isLogIn ?
                <div id="restaurant-header-log-in">
                    <span id="svg-container"><FaRegUserCircle/></span>
                    <span>{ user.username }</span>
                </div> :
                <Link id="restaurant-header-log-in" to={`${match.path}/login`}>
                    <span id="svg-container"><FaRegUserCircle/></span>
                    <span>LOG IN</span>
                </Link>
            }
        </header>
    )
}

export default Header