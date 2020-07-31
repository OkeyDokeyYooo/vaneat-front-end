import React, { useState }from 'react'
import { Link } from 'react-router-dom'
import {TextField, makeStyles} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';

// component
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

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
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)


    return (
        <React.Fragment>
            <header id="restaurant-header">
                <Link id="restaurant-header-logo" to='/'>
                        <span>LOGO</span>
                </Link>
                <SearchBar/>
                {
                    user.isLogIn ?
                    <Link id="restaurant-header-log-in" to="/profile" >
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>{ user.username }</span>
                    </Link> :
                    <div id="restaurant-header-log-in" onClick={() => setShowLogin(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>LOG IN</span>
                    </div>
                }
            </header>
            {
                showLogin &&
                <LoginWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
            }
            {
                showSignup &&
                <SignupWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
            }
        </React.Fragment>
    )
}

export default Header