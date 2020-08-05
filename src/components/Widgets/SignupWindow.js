/* eslint-disable no-useless-escape */
import React, {useState}from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import axios from 'axios'

// material ui
import {TextField, InputAdornment, IconButton, FormControl, InputLabel, FilledInput, FormHelperText} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// icons
import { BsX } from "react-icons/bs"
import {MdVisibility, MdVisibilityOff} from "react-icons/md"
import API from '../../API'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: "0 0 1.5em",
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

const signUpInitState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
}


const SignupForm = props => {

    const classes = useStyles()
    const [values, setValues] = useState(signUpInitState)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const validateInput = () => {
        let usernameError = ''
        let emailError = ''
        let passwordError = ''
        let confirmPasswordError = ''

        // check username is not empty
        if (values.username === '') {
            usernameError = 'The user name is required'
        }

        // check email address is valid format
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        if (!re.test(values.email)){
            emailError = 'The input is not a valid email address'
        }

        // check password length is greater than 6
        if (values.password.length < 6) {
            passwordError = 'Password must have a minimum of 6 characters'
        }

        // check confirm password match with password
        if (values.confirmPassword.length < 6 || values.confirmPassword !== values.password) {
            confirmPasswordError = 'Passwords do not match'
        }


        if (usernameError || emailError || passwordError || confirmPasswordError) {
            setValues({
                ...values,
                usernameError,
                emailError,
                passwordError,
                confirmPasswordError
            })
            return false
        }

        return true
    }

    const handleSignUp = event => {
        event.preventDefault()
        const isValid = validateInput()
        if (isValid) {
            // here submit user signup form to backend
            axios.post(API.signup, {
                username: values.username,
                email: values.email,
                password: values.password
            }).then(res => {
                if (res.status === 201) {
                    props.setShowSignup(false); 
                    props.setShowLogin(true)
                    setValues(signUpInitState)
                }
            }).catch(err => {
                if (err.response.status === 409) {
                    setValues({
                        ...values,
                        emailError: 'Email Already been taken'
                    })
                }
            })
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSignUp}>
            <TextField
                error={values.usernameError !== '' ? true : false}
                helperText={values.usernameError !== '' ? values.usernameError : ''}
                value={values.username}
                variant='filled'
                label='User Name'
                onChange={handleChange('username')}
            />
            <TextField 
                error={values.emailError !== '' ? true : false}
                helperText={values.emailError !== '' ? values.emailError : ''}
                value={values.email}
                variant='filled'
                label='Email'
                onChange={handleChange('email')}
            />
            <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        error={values.passwordError !== ''}
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
                    <FormHelperText error={values.passwordError !== ''} id="filled-adornment-password-helper-text">{values.passwordError !== '' ? values.passwordError : 'Password Length Must Be Greater Than 6'}</FormHelperText>
            </FormControl>
            <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-confirm-password">Confirm Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-confirm-password"
                        error={values.confirmPasswordError !== ''}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                <FormHelperText error={values.confirmPasswordError !== ''}>{values.confirmPasswordError}</FormHelperText>
            </FormControl>
            <button className={classes.button} type="submit">SIGN UP</button>
        </form>
    )
}


const SignupWindow = (props) => {

    return (
        <div className="pop-up-window-background">
            <OutsideClickHandler 
                onOutsideClick={() => props.setShowSignup(false)}
            >
                <div id="pop-up-window">
                    <div id="pop-up-window-header">
                        <BsX style={{float: 'left', color: "rgba(0, 0, 0, 0.54)", fontSize: "1.5em"}} onClick={() => props.setShowSignup(false)}/>
                        Sign Up For An Account
                    </div>
                    <div id="pop-up-window-body">
                        <SignupForm setShowSignup={props.setShowSignup} setShowLogin={props.setShowLogin}/>
                    </div>
                    <div id="pop-up-window-bottom">
                        <p>Already Have An Account? <span onClick={() => {props.setShowSignup(false); props.setShowLogin(true)}}>Log In</span></p>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default SignupWindow