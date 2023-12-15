import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../service/allapi'


// destructuring the value from serverRes which was sent through the parent component Home.jsx
function View({serverRes}) {
  // here javascript

  const [allVideos, setallVideos] = useState([])

  const [deleteStatus,setdeleteStatus] = useState(false)

  // useEffect
  useEffect(() => {

    getallVideos()


  }, [serverRes,deleteStatus])

  const handleDeleteStatus = (res) => {
    setdeleteStatus(res)
  }



  // define a function for API call
  const getallVideos = async () => {
    // api call
    const response = await getVideo()
    // console.log(response.data);
    setallVideos(response.data)
  }

  console.log(allVideos);



  return (
    <>
      {/* here jsx */}

      <div className='border p-3 rounded m-4'>

        <Row>
          {
            allVideos.map(video =>(

              <Col sm={12} md={6}>

                <VideoCard card={video} handleDeleteStatus = {handleDeleteStatus} />
                
              </Col>

            ))
           
          }
      </Row>

    </div >

    </>
  )
}

export default View