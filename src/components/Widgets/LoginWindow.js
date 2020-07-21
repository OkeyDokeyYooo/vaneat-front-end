import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import OutsideClickHandler from 'react-outside-click-handler';
import {useHistory, Link} from 'react-router-dom'

// material ui
import {TextField, InputAdornment, IconButton, FormControl, InputLabel, FilledInput} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// react-icon
import { BsX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {FaFacebookSquare} from 'react-icons/fa'
import {MdVisibility, MdVisibilityOff} from "react-icons/md"


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

const LoginWindow = (props) => {

    const classes = useStyles()
    const [showLoginForm, setShowLoginForm] = useState(false)
    const history = useHistory()

    const responseLogin = (res) => {
        console.log(res)
    }

    const LoginButton = (props) => {
        return (
            <button id="log-in-btn" onClick={props.onClick}>
                <span>{props.icon}</span>
                <span>{props.title}</span>
            </button>
        )
    }

    const LoginForm = () => {

        const [values, setValues] = useState({
            email: '',
            password: '',
            showPassword: false,
            emailError: '',
            passwordError: '',
        })

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
            console.log(event)
        }

        return (
            <form id="login-in-form" className={classes.root} onSubmit={handleLogin}>
                <TextField 
                    variant="filled" 
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


    return (
        <div className="pop-up-window-background">
            <OutsideClickHandler
                onOutsideClick={() => history.push('/')}
            >
                <div id="pop-up-window">
                    <div id="pop-up-window-header">
                        <BsX style={{float: 'left', color: "rgba(0, 0, 0, 0.54)", fontSize: "1.5em"}} onClick={() => history.push('/')}/>
                        Log In To Trip Advisor
                    </div>
                    <div id="pop-up-window-body">
                        <section id="third-party-log-in-section">
                            <GoogleLogin
                                clientId="1017526824029-2bmodiavf0sdhiegcf7iua2gvln4d8nt.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseLogin}
                                onFailure={responseLogin}
                                isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <LoginButton onClick={renderProps.onClick} title={"CONTINUE WITH GOOGLE"} icon={<FcGoogle />}/>
                                )}
                            />
                            <FacebookLogin
                                appId="1014300172362283"
                                fields="name,email,picture"
                                icon="fa-facebook"
                                callback={responseLogin} 
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
                                <LoginForm />
                            }

                        </section>
                    </div>
                    <div id="pop-up-window-bottom">
                        <p>Need an account? <Link to='/signup'>Sign up</Link></p>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default LoginWindow