/* eslint-disable no-useless-escape */
import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import OutsideClickHandler from 'react-outside-click-handler'
import Axios from 'axios'
import { useAlert } from 'react-alert'
import { useCookies } from 'react-cookie';

// redux
import { useDispatch } from 'react-redux'
import { googleLogin, facebookLogin, emailLogin} from '../../actions/userAction'

// material ui
import {TextField, InputAdornment, IconButton, FormControl, InputLabel, FilledInput} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// react-icon
import { BsX } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import {FaFacebookSquare} from 'react-icons/fa'
import {MdVisibility, MdVisibilityOff} from "react-icons/md"

// api 
import API from '../../API'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: "0 0 1em",
        width: '100%',
        height: '4em',
        borderRadius: '4px'
      },
    },
    button: {
        marginTop: "1em",
        outline: 'none',
        border: 'none',
        background: '#E91431',
        color: 'white',
        fontWeight: 'bolder',
        fontSize: '1em'
    }
}));

const loginInitState = {
    email: '',
    password: '',
    showPassword: false,
    emailError: '',
    passwordError: '',
}

const LoginForm = props => {
    const classes = useStyles()
    const [cookies, setCookie] = useCookies(['access_token']);
    const [values, setValues] = useState(loginInitState)

    // redux
    const dispatch = useDispatch()

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const validateInput = () => {
        let emailError = ''

        // check email is valid format 
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(values.email)){
            emailError = 'The input is not a valid email address'
        }

        if (emailError) {
            setValues({
                ...values,
                emailError
            })
            return false
        }

        return true
    }

    const handleLogin = event => {
        event.preventDefault()
        const isValid = validateInput()
        if (isValid) {
            console.log(values)
            Axios.post(API.login, {
                email: values.email,
                password: values.password
            }).then(res => {
                // console.log(res)
                setCookie('access_token', res.data.token, {maxAge: 3600})
                dispatch(emailLogin(res.data))
                setValues(loginInitState)
                props.setShowLogin(false)
            }).catch(err => {
                // if there is error during authentication
                setValues({
                    ...values,
                    emailError: "Authentication Failed!",
                    passwordError: "Authentication Failed!"
                })
            })
        }
    }

    return (
        <form id="login-in-form" className={classes.root} onSubmit={handleLogin}>
            <TextField 
                variant="filled" 
                type="email"
                value={values.email}
                error={values.emailError !== '' ? true : false}
                helperText={values.emailError !== '' ? values.emailError : ''}    
                label="Email" 
                onChange={handleChange('email')}
            />
            <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
            </FormControl>
            <button className={classes.button} type="submit">LOG IN</button>
        </form>
    )
}

const LoginWindow = (props) => {

    const [showLoginForm, setShowLoginForm] = useState(false)
    const [cookies, setCookie] = useCookies(['access_token']);
    const alert = useAlert()

    // redux
    const dispatch = useDispatch()

    const handleGoogleLogin = (res) => {
        Axios.post("http://localhost:8080/api/user/google", {
            tokenId: res.tokenId
        }).then(response => {
            if (response.status === 200) {
                setCookie('access_token', response.data.token, {maxAge: 3600})
                dispatch(googleLogin(response.data))
                props.setShowLogin(false)
            } else {
                alert.error("Error to Log in with Google")
            }
        }).catch(err => {
            console.log(err)
            alert.error("Error to Log in with Google")
        })
    }

    const handleThirdPartyLoginFail = (res) => {
        alert.error("Some Thing Went Wrong")
    }

    const handleFacebookLogin = (res) => {
        Axios.post("http://localhost:8080/api/user/facebook", {
            accessToken: res.accessToken,
            userID: res.userID
        }).then(response => {
            if (response.status === 200) {
                setCookie('access_token', response.data.token, {maxAge: 3600})
                dispatch(facebookLogin(response.data))
                props.setShowLogin(false)
            } else {
                alert.log("Error to Log in with Facebook")
            }
        })
    }

    const LoginButton = (props) => {
        return (
            <button id="log-in-btn" onClick={props.onClick}>
                <span>{props.icon}</span>
                <span>{props.title}</span>
            </button>
        )
    }

    return (
        <div className="pop-up-window-background">
            <OutsideClickHandler
                onOutsideClick={() => props.setShowLogin(false)}
            >
                <div id="pop-up-window">
                    <div id="pop-up-window-header">
                        <BsX style={{float: 'left', color: "rgba(0, 0, 0, 0.54)", fontSize: "1.5em"}} onClick={() => props.setShowLogin(false)}/>
                        Log In To Trip Advisor
                    </div>
                    <div id="pop-up-window-body">
                        <section id="third-party-log-in-section">
                            <GoogleLogin
                                clientId="564996899561-b38remq66lcdtkhge5l8bgr33putgero.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={handleGoogleLogin}
                                onFailure={handleThirdPartyLoginFail}
                                isSignedIn={false}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <LoginButton onClick={renderProps.onClick} title={"CONTINUE WITH GOOGLE"} icon={<FcGoogle />}/>
                                )}
                            />
                            <FacebookLogin
                                appId="1014300172362283"
                                fields="name,email,picture"
                                icon="fa-facebook"
                                callback={handleFacebookLogin} 
                                onFailure={handleThirdPartyLoginFail}
                                render={renderProps => (
                                    <LoginButton onClick={renderProps.onClick} title={"CONTINUE WITH FACEBOOK"} icon={<FaFacebookSquare style={{color: '#3b5998'}}/>}/>
                                )}
                            />
                        </section>

                        <div id="split-line">
                            <div id="split-line-half"/>
                            <span>OR</span>
                            <div id="split-line-half"/>
                        </div>

                        <section id="log-in-section">
                            {
                                !showLoginForm ?
                                <button id="log-in-btn" onClick={() => setShowLoginForm(true)}>
                                    <span>LOG IN WITH EMAIL</span>
                                </button>:
                                <LoginForm setShowLogin={props.setShowLogin}/>
                            }

                        </section>
                    </div>
                    <div id="pop-up-window-bottom">
                        <p>Need an account? <span onClick={() => {props.setShowLogin(false); props.setShowSignup(true)}}>Sign up</span></p>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default LoginWindow