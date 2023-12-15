import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allapi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





// here destructuring the response from the Add selector of home component which we want to get the value to update the state in the home component named serverRes
function Add(handleResponse) {

    const [uploadData, setuploadData] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // setInput() definition
    const setInput = (e) => {
        const { name, value } = e.target

        // Using Spread Operator

        setuploadData({ ...uploadData, [name]: value })

        // setuploadData(e.target.value)
    }

    console.log(uploadData);

    // extract youtube url

    const extractUrl = (e) => {
        // console.log(e.target.value);

        let youtubeUrl = e.target.value
        if (youtubeUrl.includes("v=")) {
            let index = youtubeUrl.indexOf("v=")
            console.log(index);

            let videoUrl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videoUrl);


            let videoData = uploadData

            videoData.url = `https://www.youtube.com/embed/${videoUrl}`

            setuploadData(videoData)
        }

        console.log(uploadData);


    }

    // define handleAdd()

    const handleAdd = async () => {

        // destructuring uploadData
        const { id, caption, thumbnail, url } = uploadData

        if (!id || !caption || !thumbnail || !url) {
            toast("Please fill the form completely")
        }
        else {
            let response = await addVideo(uploadData)


            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);

                // function call to set the value of the serverRes state in Home component
                handleResponse(response.data)

                setShow(false)
                toast.success('Video uploaded successfully!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })


            }
            else {
                toast("Please povide a unique id")
            }
        }

    }


    return (
        <>

            <div onClick={handleShow} className='btn'>
                <PlusCircle color='green' size={80} />
            </div>

            {/* Modals */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Vedio Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        {/* id */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
                            <Form.Control name='id' onChange={setInput} type="text" placeholder="Uploading vedio id" />
                        </FloatingLabel>

                        {/* Caption */}

                        <FloatingLabel className='mb-3' controlId="floatingcaption" label="uploading vedio Caption">
                            <Form.Control name='caption' onChange={setInput} type="text" placeholder="uploading vedio Caption" />
                        </FloatingLabel>

                        {/* Image url */}

                        <FloatingLabel className='mb-3' controlId="floatingimage" label="vedio cover url">
                            <Form.Control name='thumbnail' onChange={setInput} type="text" placeholder="video cover image url" />
                        </FloatingLabel>

                        {/* Vedio link */}

                        <FloatingLabel className='mb-3' controlId="floatinglink" label="uploading vedio link">
                            <Form.Control name='url' onChange={extractUrl} type="text" placeholder="Vedio link" />
                        </FloatingLabel>




                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

        </>
    )
}

export default Add