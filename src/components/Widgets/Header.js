import React, { useState, useEffect }from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {TextField, makeStyles} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import OutsideClickHandler from 'react-outside-click-handler';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

// component
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { userLogout, emailLogin } from '../../actions/userAction'

// icons
import {FaRegUserCircle, BsPeopleCircle, RiLogoutBoxRLine} from 'react-icons/all'

import './Widgets.css'
import API from '../../API';

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
    const history = useHistory()
    const [search, setSearch] = useState(undefined)

    useEffect(() => {
        Axios.get(API.searchResult)
        .then(res => {
            if (res.status === 200) {
                setSearch(res.data.restaurantName)
            }
        }).catch(() => {
            console.log("Error to Loading Search Result")
        })
    }, [])

    // when use click enter, then start search weather we have the restaurant
    const handleChange  = (val, reason) => {
        if (reason === 'select-option') {
            const restaurantId = search.find(rest => rest.name === val).id
            history.push(`/restaurants/${restaurantId}`)
        }
    }

    return (
        <div id="restaurant-header-search-bar">
            {
                search &&
                <Autocomplete
                    freeSolo
                    onChange={(e, val, reason) => handleChange(val, reason)}
                    loadingText={'Loading...'}
                    options={search.map(option => option.name)}
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
            }
        </div>
    )
}

const UserWindow = props => {

    const dispatch = useDispatch()
    let location = useLocation()
    let history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies([]);


    const handleLogout = () => {
        dispatch(userLogout())
        removeCookie('access_token', {path: '/'})
        props.setShowUserWindow(false)
        if (location.pathname === '/profile') {
            history.push('/')
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={() => props.setShowUserWindow(false)}>
            <menu className="user-window-wrapper">
                <Link to="/profile">
                <div className="user-window-btn">
                    <BsPeopleCircle />
                    <span>About Me</span>
                </div>
                </Link>
                <div className="user-window-btn" onClick={() => handleLogout()}>
                    <RiLogoutBoxRLine />
                    <span>Log Out</span>
                </div>
            </menu>
        </OutsideClickHandler>
    )
}



const Header = (props) => {

    const user = useSelector(state => state.user)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showUserWindow, setShowUserWindow] = useState(false)
    const [cookies, setCookie] = useCookies(['access_token']);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user.isLogIn){
            let { access_token } = cookies
            Axios.get(API.userCheck, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(res => {
                if (res.status === 200){
                    let storeData = {token: access_token, ...res.data}
                    dispatch(emailLogin(storeData))
                }
            })
        }
    }, [])

    return (
        <React.Fragment>
            <header id="restaurant-header">
                <Link id="restaurant-header-logo" to='/restaurants'>
                        <span>LOGO</span>
                </Link>
                <SearchBar/>
                {
                    user.isLogIn ?
                    <div id="restaurant-header-log-in" onClick={() => setShowUserWindow(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>{ user.username }</span>
                    </div> :
                    <div id="restaurant-header-log-in" onClick={() => setShowLogin(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>LOG IN</span>
                    </div>
                }
                {
                    showUserWindow && 
                    <UserWindow setShowUserWindow={setShowUserWindow}/>
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