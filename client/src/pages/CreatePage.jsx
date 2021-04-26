import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState(null)

    const pressHandler = async (event) => {
        if(event.key === 'Enter'){
            try{
                const data = await request('/api/links/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            }catch (e) {}
        }
    }

    return (
        <div>
            <div className="col s8 offset-s2" style={{paddingTop: '20px'}}>
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        name="link"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Вставьте ссылку</label>
                </div>
            </div>
        </div>
    )
}
