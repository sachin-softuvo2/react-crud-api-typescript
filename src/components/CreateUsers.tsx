import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../actions/usersAction';
import Loader from './common/Loader';
import { errStateType, formStateType } from './State.Type'


const CreateUsers = () => {
    const [state, setState] = useState<formStateType>({
        firstName: '',
        lastName: '',
        userName: '',
        address: '',
        contactNumber: ''
    })
    const [showErr, setShowErr] = useState<errStateType>({
        fNameErr: false,
        lNameErr: false,
        uNameErr: false,
        adsErr: false,
        CNumErr: false,
        CNumInvld: false
    })
    const navigate = useNavigate();
    let { firstName, lastName, userName, address, contactNumber } = state;
    let { fNameErr, lNameErr, uNameErr, adsErr, CNumErr, CNumInvld } = showErr;
    const users = useSelector((state: any) => state.users);
    const { loading } = users;
    const dispatch = useDispatch();

    const createUserHandler = async (e: any) => {
        e.preventDefault();
        let phoneno = /^\d{10}$/;
        if ((!contactNumber.match(phoneno))) {
            setShowErr({
                ...showErr,
                CNumInvld: true
            })
            return
        }
        await dispatch(createUser(firstName, lastName, userName, address, contactNumber) as any);
        setState({
            firstName: '',
            lastName: '',
            userName: '',
            address: '',
            contactNumber: '',
        })
        setShowErr({
            fNameErr: false,
            lNameErr: false,
            uNameErr: false,
            adsErr: false,
            CNumErr: false,
            CNumInvld: false
        })
    }

    return (
        <form className='w-75 m-auto' style={{ opacity: loading && '0.5' }}>
            {loading && <Loader />}
            <h1 className='text-center mb-3'>Create User</h1>
            <div className="mb-3 row">
                <div className="col-sm-12">
                    <input
                        onChange={(e) => setState({ ...state, firstName: e.target.value })}
                        onBlur={() => setShowErr({ ...showErr, fNameErr: !firstName && true })}
                        onFocus={() => setShowErr({ ...showErr, fNameErr: false })}
                        type="text" className={`form-control ${fNameErr ? 'hasError' : ''}`} placeholder='Enter first name' autoComplete='true' value={firstName} />
                    {fNameErr && <span className='text-danger'>This field is required</span>}
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12">
                    <input onChange={(e) => setState({ ...state, lastName: e.target.value })}
                        onBlur={() => setShowErr({ ...showErr, lNameErr: !lastName && true })}
                        onFocus={() => setShowErr({ ...showErr, lNameErr: false })}
                        type="text" className={`form-control ${lNameErr ? 'hasError' : ''}`} placeholder='Enter last name' autoComplete='true' value={lastName} />
                    {lNameErr && <span className='text-danger'>This field is required</span>}
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12">
                    <input onChange={(e) => setState({ ...state, userName: e.target.value })}
                        onBlur={() => setShowErr({ ...showErr, uNameErr: !userName && true })}
                        onFocus={() => setShowErr({ ...showErr, uNameErr: false })}
                        type="text"
                        className={`form-control ${uNameErr ? 'hasError' : ''}`} placeholder='Enter user name' autoComplete='true' value={userName} />
                    {uNameErr && <span className='text-danger'>This field is required</span>}
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12">
                    <input onChange={(e) => setState({ ...state, address: e.target.value })}
                        onBlur={() => setShowErr({ ...showErr, adsErr: !address && true })}
                        onFocus={() => setShowErr({ ...showErr, adsErr: false })}
                        type="text"
                        className={`form-control ${adsErr ? 'hasError' : ''}`} placeholder='Enter address' autoComplete='true' value={address} />
                    {adsErr && <span className='text-danger'>This field is required</span>}
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12">
                    <input onChange={(e) => setState({ ...state, contactNumber: e.target.value })}
                        onBlur={() => setShowErr({ ...showErr, CNumErr: !contactNumber && true })}
                        onFocus={() => setShowErr({ ...showErr, CNumErr: false, CNumInvld: false })}
                        type="number"
                        className={`form-control ${(CNumErr || CNumInvld) ? 'hasError' : ''}`} placeholder='Enter contact number' autoComplete='true' value={contactNumber} />
                    {CNumErr && <span className='text-danger'>This field is required</span>}
                    {CNumInvld && <span className='text-danger'>Invalid contact number <code>(Number should be 10 digit.)</code></span>}
                </div>
            </div>
            <div className='d-flex'>
                <button type='button' className='btn btn-primary' onClick={() => navigate('/')}>Back</button>
                <button type='button'
                    disabled={firstName === '' || lastName === '' || userName === '' || address === '' || contactNumber === '' || loading}
                    className='btn btn-primary d-block m-auto' onClick={(e) => createUserHandler(e)}>Create</button>
            </div>
        </form>
    )
}

export default CreateUsers