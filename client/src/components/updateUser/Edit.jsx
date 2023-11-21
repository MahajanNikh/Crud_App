import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../addUser/add.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Edit = () => {

  const initialUser = {
    fname: "",
    lname: "",
    email: ""
  }

  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState(initialUser);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
    console.log(user)
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data)
      })
      .catch((e) => {
        return console.log(e.message)
      })
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" })
        navigate("/")
      })
      .catch(e => console.log(e))
  }


  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>

      <form className='addUserFrom' onSubmit={submitForm} >
        <div className='inputGroup'>
          <label htmlFor="fname">First name</label>
          <input type='text' value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='First name' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="lname">Last name</label>
          <input type='text' value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' autoComplete='off' placeholder='Last name' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="email">Email</label>
          <input type='email' value={user.email} onChange={inputChangeHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
        </div>
        <div className='inputGroup'>
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  )
}

export default Edit