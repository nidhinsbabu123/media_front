import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import View from './View'
import Add from './Add'
import Category from './Category'
import { Link } from 'react-router-dom'




function Home() {

  const[serverRes,setserverRes] = useState({})

  // function definition to get the value to the state named serverRes from the Add component

  // when we call the function handleResponse, we will get the response as the argument of the function
  const handleResponse = (res) => {
    setserverRes(res)
  }


  return (
    <>

    <div className='container-fluid'>

      <Link style={{textDecoration:'none', fontSize:'30px', color:'blue'}} to={'/watchhistory'}>Watch History</Link>

      <Row>
        {/* Add Component */}
        <Col lg={1}>

          {/* Here we are passing the function handleResponse to set the response value to the state named serverRes */}
          {/* We are using props */}
          {/* Function call of handleResponse */}
          <Add handleResponse = {handleResponse}/>
        </Col>

        {/* View Component */}

        <Col lg={7}>
          <View serverRes = {serverRes}/>
        </Col>

        {/* Category component */}
        <Col lg={4}>
          <Category/>
        </Col>

      </Row>

    </div>

    </>
  )
}

export default Home