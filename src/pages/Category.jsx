import React, { useEffect } from 'react'
import { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addCategory, deleteCategory, getCategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';

function Category() {

  // const[uploadcat,setUploadcat]=useState({
  //   id:"",
  //   caption:"",
  //   allVideos:[]
  // })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const [addcategory, setaddcategory] = useState({
    id: "",
    name: "",
    // allCategory: []
    allCatVideos: []

  })

  const [allCategory, setallCategory] = useState([])

  // setInput function definition

  // const setInput = (e) =>{
  //   const{name,value} = e.target

  //   setUploadcat({...uploadcat, [name]:value})
  // }
  // console.log(uploadcat);



  const handleAddcategory = (e) => {
    const { name, value } = e.target
    setaddcategory({ ...addcategory, [name]: value })
  }

  console.log(addcategory);

  // handleAdd function definition

  const handleAdd = async (e) => {
    e.preventDefault()
    // const{id,caption} = uploadcat
    const { id, name } = addcategory
    if (!id || !name) {
      alert('Please fill the form ')
    }
    else {
      // api call
      const res = await addCategory(addcategory)
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        // handleResponse(res.data)
        setShow(false)
        alert("Successfully added")
        getallCategory()
      }
      else {
        alert('Please provide unique id')
      }
    }
  }

  useEffect(() => {

    getallCategory()


  }, [])


  const getallCategory = async () => {
    // api call
    const response = await getCategory()
    // console.log(response.data);
    setallCategory(response.data)
  }

  console.log(allCategory);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()

    // api call for delete category
    const res = await deleteCategory(id)
    console.log(res);
    getallCategory()

  }

  // Ondrag over function definition
  const dragOver=(e)=>{
    e.preventDefault()
    console.log("Dragging over the category ");
  }

  const dropped=async(e,categoryId)=>{
    console.log("category id : ",categoryId);
    let sourceCardId=e.dataTransfer.getData("cardId ")
    console.log('source card id:',sourceCardId);
    const {data} = await getVideos(sourceCardId)
    console.log(data);

    let selectedCategory = allCategory.find(item=>item.id==categoryId)
    console.log("target category details",selectedCategory);
    selectedCategory.allCatVideos?.push(data)
    console.log("Update category details ",selectedCategory);
    await updateCategory(categoryId,selectedCategory)
    getallCategory()
  }





  return (
    <>
      {/* d-grid is to adjust the size of the button */}
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>Add Category</div>
      </div>

      {
        allCategory.map(item => (

          <div droppable onDragOver={e => dragOver(e)} onDrop={e=>dropped(e,item?.id)}>
            <div className='d-flex justify-content-between border rounded mt-3 p-3'>

              <h4>{item?.name}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}> <Trash2 color='red' /> </span>

              <Row>

                {


                  item?.allVideos?.map((card)=>(

                    <Col>

                      <VideoCard card={card} insideCategory = {true} />

                    </Col>



                  ))


                }

              </Row>

             
            </div>

          </div>

        ))
      }





      {/* modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Category </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
              <Form.Control onChange={handleAddcategory} name='id' type="text" placeholder="Category Id" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcaption" label="Caption">
              <Form.Control onChange={handleAddcategory} name='name' type="text" placeholder="Caption" />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default Category