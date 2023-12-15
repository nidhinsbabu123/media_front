import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function Landing() {

  // Function definition

  // to redirect from one page to another, we can use 'useNavigate' hook

  const navigate=useNavigate()

  const handleNavigate=()=>{

    navigate('/home')

  }



  return (
    <div>

      <Row className='align-items-center'>

        <Col></Col>
        <Col lg={6}>

          <h1>Welcome to Play-Nothing.com</h1>

          <p style={{textAlign:'justify'}}>Where user can use their favourite videoos. User can upload any youtube videos by copy and paste   their   url in to Play-Nothing.com. It will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop. It is free. Try it now!!!</p>

          <button onClick={handleNavigate} className='btn btn-success'>Click Here to know more</button>

        </Col>


        <Col lg={5}>

          <img className='img-fluid' width={'550px'} height={'550px'} src="https://www.estudokids.com.br/wp-content/uploads/2017/12/descricao-video-play.jpg" alt="No Img" />

        </Col>

      </Row>

    </div>
  )
}

export default Landing