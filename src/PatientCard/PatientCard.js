import React, { useEffect, useState } from 'react';
import './PatientCard.css';

function PatientCard(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const modifiedUsers = props.users.map((user) => ({
      ...user,
      showCard: false,
    }));
    setUsers(modifiedUsers);
  }, [props.users]);

  const handleOnClick = (clickedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === clickedUser.id
          ? { ...user, showCard: !user.showCard }
          : user
      )
    );
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <button onClick={() => handleOnClick(user)} className="btn_switch">
            {user.showCard ? '-' : `+`} {user.FirstName}
          </button>
          {user.showCard && (
            <div className="card_container">
              <p>{user.FirstName}</p>
              <p>{user.Email}</p>
              <p>{user.Phone}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PatientCard;
