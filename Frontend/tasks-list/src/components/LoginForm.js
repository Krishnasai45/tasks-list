import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import "../styles/login.css"
import { useSelector, useDispatch } from "react-redux";
import { postLoginData } from '../redux/action';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [wrong, setWorng] = useState(false);
    const next = checked && email && password ? true : false;
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.token);
    const isAuth = useSelector((state)=>state.isAuth)
    const isError = useSelector((state)=>state.error)

    const handleChange = (e) => {
        e.persist();
        setChecked((prevState) => !prevState);
    };

    const handleShow = (e) => {
        e.persist();
        setShow((prevState) => !prevState);
    };

    const onformSubmit = (e) => {
        e.preventDefault();
        const params = {
            email: email,
            pass: password,
        };
        dispatch(postLoginData(params));
    };

    return (
        <div>
            <div id='LoginForm' className="conatiner">
                <div>
                    <h4>Hello there, Sign in to continue</h4>
                    <div>
                        <form onSubmit={onformSubmit}>
                            <div className="email">
                                <label>Email</label> <br />
                                <input
                                    name='email'
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="password">
                                <label>Password</label> <br />
                                <div className="open">
                                    <input
                                        name='password'
                                        type={show ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {show ? (
                                        <FiEyeOff onClick={handleShow} />
                                    ) : (
                                        <FiEye onClick={handleShow} />
                                    )}
                                </div>
                            </div>
                            <div className="checked">
                                <div>
                                    <input
                                        type="checkbox"
                                        id="log-terms"
                                        name="terms"
                                        checked={checked}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="terms">
                                        By creating or logging into an account, you are agreeing
                                        with our <b>Termas & Conditions</b> and{' '}
                                        <b>Privacy Policys</b>{' '}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <input
                                    className={next ? 'submitNext' : 'submit'}
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                            {/* <button>Login</button> */}
                        </form>
                    </div>
                    {isError && <h4 className="error"> Invalid password or email</h4>}
                    {isAuth && <Navigate to="/dashboard" />}
                </div>
            </div>
        </div>
    );
}

export default LoginForm
