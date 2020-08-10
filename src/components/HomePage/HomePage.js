import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet'
import Axios from 'axios'
import API from '../../API'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { emailLogin } from '../../actions/userAction'

// icons
import {FaRegUserCircle, BsPeopleCircle, RiLogoutBoxRLine } from 'react-icons/all'

// components
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

import './HomePage.css'


const UserWindow = props => {
    return (
        <OutsideClickHandler onOutsideClick={() => props.setShowUserWindow(false)}>
            <menu className="user-window-wrapper">
                <Link to="/profile">
                <div className="user-window-btn">
                    <BsPeopleCircle />
                    <span>About Me</span>
                </div>
                </Link>
                <div className="user-window-btn">
                    <RiLogoutBoxRLine />
                    <span>Log Out</span>
                </div>
            </menu>
        </OutsideClickHandler>
    )
}


const HomePage = (props) => {

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
        <div className="home-page">
            <Helmet>
                <title>VanEat</title>
            </Helmet>
            <header >
                <Link id="home-page-header-logo" to="/">
                    <span>LOGO</span>
                </Link>
                {
                    user.isLogIn ? 
                    <div id="home-page-header-log-in" onClick={() => setShowUserWindow(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>{user.username}</span>
                    </div> :
                    <div id="home-page-header-log-in" onClick={() => setShowLogin(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>LOG IN</span>
                    </div> 
                }
                {
                    showUserWindow && 
                    <UserWindow setShowUserWindow={setShowUserWindow}/>
                }
            </header>
            <main>
                <div id="home-body">
                    <h3>One Thousand Flavours In One Place</h3>
                    <Link to="/restaurants"><button>LET'S GO EXPLORE</button></Link>
                </div>
            </main>
            {
                showLogin &&
                <LoginWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
            }
            {
                showSignup &&
                <SignupWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
            }
            { <footer className='footer'>
                <div className='footerclass'>
                    <h2> Contact us:</h2>
                    <div className='contacts'>
                        <div id='cl1'>
                            <div>Yilun Huang: yha150@sfu.ca</div>
                            <div>Weijie Sun: weijies@sfu.ca</div>
                            <div>Yifan Liu: yla455@sfu.ca</div>

                        </div>
                        <div id='cl2'>
                            <div>Dekai Lin: dekail@sfu.ca</div>
                            <div>Zhiqi Qiao: zhiqiq@sfu.ca</div>
                        </div>
                        
                    </div>
                    <div className='HZline'></div>
                    <div className='ProductInfo'>
                        <div>VanEat</div>
                        <div>LOGO</div>
                    </div>
                    
                </div>
            </footer> }
        </div>
    )
}

export default HomePage