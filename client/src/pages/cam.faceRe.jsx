import React, { useState } from 'react';
import { useGlobalContextAuthUser } from '../utils/GlobalContextAuthUser';
import './cam.faceR.css';

const URLAPI = `http://localhost:5000`

function face() {

    // eslint-disable-next-line
    const [data, setData] = useState([])
    // eslint-disable-next-line
    const [image, setImage] = useState('')
    const [userId] = useGlobalContextAuthUser();

    console.log("Face user: ", userId);

    const handleOnChange = event => {
        setImage(event.target.value)
    }

    const handleClickImage = async event => {
        event.preventDefault()
        console.log('click')
        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: image,
                })
            }

            const resp = await fetch(`${URLAPI}/create-facelist`, fetchOptions)
            const people = await resp.json()
            console.log(people.data)
            setData(people.data)
        } catch (err) {
            console.error(err)
        }
    }
    console.log(data, "AJ")
    return (
        <div className="App">
            <header className="App-header">
                <p>

                    Upload a JPG image
            </p>
                <div className="containerFile">
                    <input
                        className="inputFile"
                        placeholder="Upload image"
                        onChange={handleOnChange}
                        value={image}
                    />
                    <button
                        className="buttonFile"
                        onClick={handleClickImage}
                    >
                        Upload
              </button>
                </div>
                <h3 className="titleAtribute">Image attributes: </h3>
                <ul>
                    {
                        data.map(item => (
                            <li key={item.faceId}>
                                <span>
                                    Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <img
                    src={image}
                    width={220}
                    height={180}
                    alt={image}
                />
                <a
                    className="App-link"
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link of the image: {image}
                </a>
            </header>
        </div>
    );
}

export default face;
// , Facial hair: {item.faceAttributes.blur}