import React, { useState, useRef } from 'react';


function Camera() {
    const [playing, setPlaying] = useState(false);

    const vest = useRef(null);
    const videoRef = useRef(null);



    const HEIGHT = 650;
    const WIDTH = 490;

    const startVideo = () => {
        setPlaying(true);
        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0];
                if (video) {
                    video.srcObject = stream;
                }
            },
            (err) => console.error(err)
        );
    };

    const stopVideo = () => {
        setPlaying(false);
        let video = document.getElementsByClassName('app__videoFeed')[0];
        video.srcObject.getTracks()[0].stop();
    };

    const snap = () => {
        if (playing === false) {
            console.log("no camera found")
        }
        else {
            console.log("camera found", vest)
            var context = vest.current.getContext('2d')
            context.drawImage(videoRef.current, 0, 0, HEIGHT, WIDTH);

        }
        console.log('snap')
    }

    window.onload = () => {
        const canvas = document.getElementById('canvas');

        const saveButton = document.getElementById('save');
        saveButton.addEventListener('click', () => save(canvas));
    };

    // save function
    function save(canvas) {
        const data = canvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = data;
        anchor.download = 'image.png';
        anchor.click();
    }
    // const dl = () => {
    //     let canvas = document.getElementsByClassName('saveBtn')[0];
    //     let image = canvas.toDataURL('image/jpeg', 1.0);
    //     // create temporary link  
    //     var tmpLink = document.createElement('a');
    //     tmpLink.download = 'image.png'; // set the name of the download file 
    //     tmpLink.href = image;

    //     // temporarily add link to body and initiate the download  
    //     document.body.appendChild(tmpLink);
    //     tmpLink.click();
    //     document.body.removeChild(tmpLink);
    // }



    return (

        <div className="app">
            <div className="app__container">

                <video ref={videoRef}
                    height={HEIGHT}
                    width={WIDTH}
                    muted
                    autoPlay
                    className="app__videoFeed"
                ></video>
            </div>

            <canvas ref={vest} id="canvas" width={WIDTH} height={HEIGHT}></canvas>

            <div className="app__input">
                {playing ? (
                    <button onClick={stopVideo}>Stop</button>
                ) : (
                        <button onClick={startVideo}>Start</button>
                    )}
                <button className="btn btn-success" id="capture" onClick={snap}>CAPTURE</button>

            </div>

            <button id="save" type="button">save</button>
        </div>
    );
}

export default Camera;