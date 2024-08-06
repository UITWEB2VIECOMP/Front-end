import React, { useState , useEffect} from 'react'
import "../styles/ContestModify.css"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import axiosUrl from '../../config/AxiosConfig';


export default function ContestModify({ role, token }) {
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { contest_id } = useParams();
  const [img, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [name, setName] = useState('');
  const [prize, setPrize] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate()
  //For day range
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  useEffect(()=>{
      return ()=>{img&&URL.revokeObjectURL(imagePreview)}
  },[imagePreview])
  useEffect(()=>{
    if(role === "student"){
      navigate('/error')
    }
  },[])

  const handleModify = async (e, target) => {
    e.preventDefault();
    setLoading(true);

    try {
        let payload;
        if (target === 'image') {
            const formData = new FormData();
            formData.append('file', img); 
            payload = formData;
            const headers = {
                token: token,
                ...(target === 'image' && { 'Content-Type': 'multipart/form-data' })
            };
            const res = await axiosUrl.post(`/api/contest/change-${target}/${contest_id}`, payload, { headers });
            console.log(res); 
        } else {
            if (target === 'name') {
                payload = {contest_name:name}
            } else {
              if (target === 'date') {        
                payload = { start_date: convert(state[0].startDate), end_date:convert(state[0].endDate)};
              } else if (target === 'prize') {
                payload = {prizes_description: prize };
              } else if (target === 'description') {
                payload = {contest_description: description };
              }
            }
            const headers = {
              token: token,
            };
  
          const res = await axiosUrl.post(`/api/contest/change-${target}/${contest_id}`, payload, { headers });
  
          console.log(res); 
        }

        setErr('');
    } catch (err) {
        console.error('Change error: ', err);
        setErr(err.response?.data?.message || 'An error occurred');
        if (err.response?.data?.message === "Token has expired") {
          localStorage.removeItem('token');
          navigate('/login');
        }
    } finally {
        setLoading(false);
        navigate(`/contest/${contest_id}`);
    }
};

  return (
    
    <div className='contest-modify-container'>
      <h1>Contest Modification</h1>
      <hr />
      <div className="modify-content">
        <div className="contest-modify-group">
                <label htmlFor="img" className="img-label">Change Contest Image:</label>
                <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={(e) => {setImagePreview(URL.createObjectURL(e.target.files[0]))
                                    setImage(e.target.files[0])
                    }}
                    className="file-input"
                    required
                />
                {img && <img src={imagePreview} alt="Avatar Preview" className="img-preview" />}
                <button className="modify-btn" onClick={(e) => handleModify(e, 'image')}>Change Image</button>
          </div>
      </div>
      <div className="contest-modify-group">
          <label htmlFor="name">Change Name:</label>
          <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          />
      </div>
      <button className="modify-btn" onClick={(e) => handleModify(e, 'name')}>Change Name</button>

      <div className='contest-modify-group'>
        <label htmlFor="name">Change Date:</label>
        <DateRangePicker
          onChange={item => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal">
        </DateRangePicker>
      </div>
      <button className="modify-btn" onClick={(e) => handleModify(e, 'date')}>Change Date</button>

      <div className="contest-modify-group">
          <label htmlFor="name">Change Prize:</label>
          <input
              type="text"
              id="prize"
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
              required
          />
      </div>
      <button className="modify-btn" onClick={(e) => handleModify(e, 'prize')}>Change Prize</button>

      <div className="contest-modify-group">
          <label htmlFor="name">Change Description:</label>
          <textarea 
            name="" 
            id=""  
            cols="40" 
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            >
          </textarea>
      </div>
      <button className="modify-btn" onClick={(e) => handleModify(e, 'description')}>Change Description</button>
      {err && <div className="error-message">{err}</div>}
      {loading && <div className="loading-message">Loading...</div>}
    </div>
  )
}
