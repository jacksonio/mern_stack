import React, {useState, useContext} from 'react'
import './styles.css'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'
export const CreatePage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const keyPressedHandler =  async (event) => {
        if(event.key === 'Enter') {
            try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${token}`
            })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className={'row'}>
            <div className="col s8 offset-s2 pt-2rem">
                <div className="input-field">
                    <input
                        placeholder="Enter your link"
                        className={'input_color'}
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={keyPressedHandler}
                    />
                    <label htmlFor="link" className={'active'}>Enter link value</label>
                </div>
            </div>
        </div>
    )
}
