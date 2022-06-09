import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteUser, fetchUsers, updateUser } from '../actions/usersAction';
import Loader from './common/Loader';

const AllUser = () => {

  const [userName, setUserName] = useState<string>('')
  const [lName, setLname] = useState<string>('')

  const usersList = useSelector((state: any) => state.users);
  const { loading, users, message } = usersList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers() as any)
  }, [])


  return (
    <div className='container mt-5'>

      <button type='button' className='btn btn-primary py-2 px-0' disabled={loading}>
        <NavLink to="/create" className="text-white text-decoration-none px-3 py-3">Create User
        </NavLink>
      </button>
       {loading && <Loader />}
      <div className="mt-5" style={{opacity: loading && '0.5'}}>
        {users.length > 0 ?
          <table className="table">
            <thead>
              <tr>
                <th scope="col">userId</th>
                <th scope="col">user name</th>
                <th scope="col">name</th>
                <th scope="col">lname</th>
                <th scope="col">address</th>
                <th scope="col">contact</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user: any) => {
                  return <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.name}</td>
                    <td>{userName !== user.userName
                      ? user.lname
                      : <>
                        <input type='text' defaultValue={user.lname} onChange={(e) => setLname(e.target.value)} />
                        <button type='button' className='btn btn-primary mx-3' onClick={() => { dispatch(updateUser(userName, lName || user.lname) as any); setUserName('') }}>done</button>
                      </>
                    }
                    </td>
                    <td>{user.address}</td>
                    <td>{user.contact}</td>
                    <td>
                      <button type='button' className='btn btn-primary' onClick={() => setUserName(user.userName)}>Edit</button>
                      <button type='button' className='btn btn-danger mx-3' onClick={() => dispatch(deleteUser(user.userName) as any)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
          : message && <h2 className='text-secondary text-center'>{message}</h2>
        }
      </div>
    </div>
  )
}

export default AllUser