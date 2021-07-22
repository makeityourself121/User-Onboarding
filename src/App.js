import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form'
import Member from './Member'
import schema from './Schema'
import{reach } from 'yup'
import axios from 'axios'

const initialValues={
  name: '',
  email: '',
  password: '',
  tos:false,
}
const initialErrors = {
  name: '',
  email: '',
  password: '',
  tos: '',
}

const initialDisabled = true

function App() {
  const [member, setMember]=useState([])
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState(initialErrors)
  const [disabled, setDisabled] = useState(initialDisabled)   
  
  const update = (inputName, inputValue) => {
    validate(inputName, inputValue)
    setFormValues({...formValues, [inputName]: inputValue})

  }
  const validate = (name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }
 
  const postNewMember = newMember => {

    axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        
        setMember(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialValues)
      })
  }
  // const getMembers = () => {
    
  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       console.log(res.data.data)
  //       setMember(res.data.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })

  // }

  const submitForm=()=>{
    const newMember={
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      tos:formValues.tos,
    }
        postNewMember([newMember, ...member])
        setFormValues(initialValues)
   
  }
  // useEffect(()=>{
  //   getMembers()
  // }, [])
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
    <Form key={member.id}value={formValues} update={update} submit={submitForm} errors={formErrors} disabled={disabled}/>

    {
    member.map(member=>{
      return(
        <Member key={member.id} details={member}/>
      )
    })
  }
    </div>
  );
}

export default App;
