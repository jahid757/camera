import React, { createRef, Fragment, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import imgPlaceholder from '../Assets/images/imgPlaceholder.jpg'
import { AiFillCamera,AiFillFolder } from "react-icons/ai";
import Webcam from 'react-webcam';
import SweetAlert from 'react-bootstrap-sweetalert';


const Camera = () => {
    const [photo, setPhoto] = useState(imgPlaceholder)
    const [cameraError,setCameraError] = useState(false)

    const cameraRef = createRef()
    const onCapture = () => {
       const PhotoBase64 =  cameraRef.current.getScreenshot()
        // alert(PhotoBase64)
        setPhoto(PhotoBase64)
        // console.log(photo);
    }
    const onSave = () => {
        const base64String = photo
        const a = document.createElement('a');
        a.href = base64String;
        a.download = "webcam.jpeg";
        a.click()
    }
    const onCameraError = () => {
        setCameraError(true)
    }
    const cameraErrorAlert = () => {
        if(cameraError === true) {
            return <SweetAlert danger title="Device Camera Not Working" onConfirm={onCameraTryAgain} >
            Please refresh and try again
          </SweetAlert>
        }
    }
    const onCameraTryAgain = () => {
        window.location.href = "/"
    }

    return (
        <Fragment>
            <Container>
                <Row className="mt-5">
                    <Col className="p-2" md={6} sm={12} lg={6}>
                        <Webcam
                            ref={cameraRef}
                            onUserMediaError={onCameraError}
                            audio = {false}
                            screenshotFormat="image/jpeg"
                            className="w-100"
                        />
                        <button onClick={onCapture} className="btn btn-primary"><AiFillCamera/> Capture</button>
                    </Col>
                    <Col className="p-2" md={6} sm={12} lg={6}>
                        <img className="w-100 mb-3 img-fluid" src={photo} alt=""/>
                        <button onClick={onSave} className="btn btn-primary"><AiFillFolder/> Save</button>
                    </Col>
                </Row>
            </Container>
            {
                cameraErrorAlert()
            }
        </Fragment>
    );
};

export default Camera;