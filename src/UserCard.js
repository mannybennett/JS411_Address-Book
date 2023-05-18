import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard() {

  const [arrayOfUsers, setArrayOfUsers] = useState([]);
  const [clicked, setClick] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await axios.get('https://randomuser.me/api?results=25');
      setArrayOfUsers(userData.data.results);
    };
    
    fetchUserData();
  }, []);

  //BUTTON TEXT NEEDS CORRECTING LINE 37

  return (
    <div className="container">
      {arrayOfUsers.map((user, idx) => (
        <Card key={idx} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.picture.large} />
        <Card.Body>
          <Card.Title>{`${user.name.first} ${user.name.last}`}</Card.Title>
          <Card.Text>
            {clicked && idx === activeUser.idx && `${activeUser.gender} - ${activeUser.dob.age}`}
          </Card.Text>
          <Button onClick={() => {
              setActiveUser({...user, idx})
              clicked ? setClick(false) : setClick(true)
            }} variant="danger">
            {clicked && idx === activeUser.idx ? "Hide Details" : "Show Details"}
          </Button>
        </Card.Body>
      </Card>
      ))}
      
    </div>
  );
}

export default UserCard;