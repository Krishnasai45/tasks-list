import React, { useEffect, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useSelector, useDispatch } from "react-redux";
import "../styles/login.css"
import { postUsersData } from '../redux/action';
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    const next = checked ? true : false;
    const dispatch = useDispatch();
    const isRegister = useSelector((state)=>state.signupMesg)
    const errorRegister = useSelector((state)=>state.signupError)

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
            name: name,
            email: email,
            pass: password,
        };
        dispatch(postUsersData(params))
    };

    return (
        <div>
            <div id='RegForm' className="conatiner">
                <div>
                    <h4>Hello there, Sign Up to continue</h4>
                    <div>
                        <form onSubmit={onformSubmit}>
                            <div className="name">
                                <label>Name</label> <br />
                                <input
                                    name='name'
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                                        id="reg-terms"
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
                                    value="Register"
                                />
                            </div>
                        </form>
                    </div>
                    {
                      isRegister?.isRegisterd && <Navigate to="/login" />
                    }
                </div>
            </div>
        </div>
    );
}

export default RegisterForm
