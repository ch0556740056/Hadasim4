import React from 'react';
import swal from 'sweetalert';
import '../css/user.css'
function User({ userKey,userData,onDelete,onEdit,onDetails}) {
    const handleDelete=()=>{
        swal({
            title: "Are you sure you want to delete?",
            text: "Once you delete there is no way to recover",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              onDelete(userKey)
              swal("user deleted", {
                icon: "success",
              });
            }
          });
    }
    const handleEdit=()=>{
      onEdit(userKey)

    }
    const handleDetails=()=>{
         onDetails(userKey)
    }

    return (<>
    <p> {userData.tz} | {userData.firstName} | {userData.lastName} | {userData.mobilePhone} </p>

    <button onClick={handleDelete}>Delete</button>
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleDetails}>Details</button>
    </>
    );
  }
  
  export default User;