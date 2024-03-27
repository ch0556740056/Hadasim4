import React, { useEffect, useState } from "react";
import User from "./user";
import userService from "./service/userService";
import diseaseService from "./service/diseaseService";
import vaccinationService from "./service/vaccinationService";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import "../css/users.css"
function Users() {
  const [users_list, setUsers_list] = useState([]);
// עובד מצויין ב"ה
const deleteOneUser= async(userKey)=>{
  try {
    const response = await userService.deleteUser(users_list[userKey].tz);
    response=await diseaseService.deleteDisease(users_list[userKey].tz)
    response=await vaccinationService.deleteVaccination(users_list[userKey].tz)
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error message:', error.message);
  }
  setUsers_list(users_list => {
        const updatedList = [...users_list]; // Create a copy of the original array
        updatedList.splice(userKey, 1); // Remove the video at the specified index
        return updatedList; // Return the updated array
  });
    console.log(users_list);
}

const editOneUser=async(userKey,user)=>{
  try {
    const response = await userService.setUser(users_list[userKey].tz,user);
    console.log('User update successfully');
  } catch (error) {
    console.error('Error message:', error.message);
  }
  
}
// עובד ב"ה
const detailsOneUser=async(userKey)=>{

    try {
      console.log(users_list[userKey].tz);
      const vaccinationResponse=await vaccinationService.getVaccination(users_list[userKey].tz)
      const vaccinationDetails=await vaccinationResponse.data.vaccination
      const vaccinationDetailsText = vaccinationDetails.map(vaccination => `
      date: ${vaccination.date}, manufacturer: ${vaccination.manufacturer}`);
      const diseasesResponse=await diseaseService.getDisease(users_list[userKey].tz)
      const user = users_list[userKey];
      let text = '';
      if (user.tz) {
         text += `tz: ${user.tz}\n`;
      }
      if (user.dateOfBirth) {
        text += `dateOfBirth: ${user.dateOfBirth}\n`;
      }
      if (user.firstName) {
        text += `firstName: ${user.firstName}\n`;
      }
      if (user.lastName) {
        text += `lastName: ${user.lastName}\n`;
      }
      if (user.city) {
        text += `city: ${user.city}\n`;
      }
      if (user.street) {
        text += `street: ${user.street}\n`;
      }
      if (user.homeNumber) {
         text += `homeNumber: ${user.homeNumber}\n`;
      }
      if (user.phone) {
         text += `phone: ${user.phone}\n`;
      }
      if (user.mobilePhone) {
        text += `mobilePhone: ${user.mobilePhone}\n`;
      }
      if (diseasesResponse.data.disease.dateOfIllness) {
          text += `dateOfIllness: ${diseasesResponse.data.disease.dateOfIllness}\n`;
      }
     if (diseasesResponse.data.disease.dateOfIllness) {
          text += `dateOfRecovery: ${diseasesResponse.data.disease.dateOfRecovery}\n`;
      }
      if (vaccinationDetailsText) {
        text += `${vaccinationDetailsText}\n`;
      }
      swal({
         title:"Details of user",
         text:text,
      }) 
} catch (error) {
      console.error('Error message:', error.message);
}
} 
//עובד ב"ה
const AddUser=async(user,disease,vaccination1,vaccination2,vaccination3,vaccination4)=>{
  const idRegex = /^\d{9}$/;
if(idRegex.test(user.tz))
  {
    try {
    const response = await userService.addUser(user)
    } catch (error) {
    console.error('Error in AddUser:', error);
    }
   try {
     const response = await diseaseService.addDisease(disease)
    } catch (error) {
  console.error('Error in AddDisease:', error);
  }

console.log(vaccination1.value);
if(vaccination1.manufacturer!=""){try {
  const response = await vaccinationService.addVaccination(vaccination1)
} catch (error) {
  console.error('Error in AddVaccination:', error);
}}
if(vaccination2.manufacturer!=""){try {
  const response = await vaccinationService.addVaccination(vaccination2)
} catch (error) {
  console.error('Error in AddVaccination:', error);
}}
if(vaccination3.manufacturer!=""){try {
  const response = await vaccinationService.addVaccination(vaccination3)
} catch (error) {
  console.error('Error in AddVaccination:', error);
}}
if(vaccination4.manufacturer!=""){
  try {
    const response = await vaccinationService.addVaccination(vaccination4)
  } catch (error) {
   console.error('Error in AddVaccination:', error);
  }
}
setUsers_list(users_list => {
  const updatedList = [...users_list,user]; // Create a copy of the original array
  return updatedList; // Return the updated array
});
}
else{
alert("tz invalid the details")
}
}

const openAddUserModal = () => {
    Swal.fire({
      title: 'Add New User',
      html: `
      <input id="tz" class="swal2-small-input" placeholder="tz" />
      <input id="fName" class="swal2-small-input" placeholder="first name" />
      <input id="lName" class="swal2-small-input" placeholder="last Name" />
      <input id="city" class="swal2-small-input" placeholder="city" />
      <input id="street" class="swal2-small-input" placeholder="street" />
      <input id="homeNumber" class="swal2-small-input" placeholder="homeNumber" />
      <input id="phone" class="swal2-small-input" placeholder="phone" />
      <input id="mobilePhone" class="swal2-small-input" placeholder="mobile phone" />
      <input id="birthdate" class="swal2-small-input" type="date" placeholder="Birthdate" />
      <p>were you sick with corona? If so enter dates </p>
      <input id="startDate" class="swal2-small-input" type="date" placeholder="startDate" /> -
      <input id="endDate" class="swal2-small-input" type="date" placeholder="endDate" />
      <p>Have you been vaccinated? If so, enter the manufacturer's name and vaccination date</p>
      <input id="manufacturer1" class="swal2-small-input" placeholder="manufacturer" /> /
      <input id="vaccinationDate1" class="swal2-small-input" type="date" placeholder="vaccination date" />
      <input id="manufacturer2" class="swal2-small-input" placeholder="manufacturer" /> /
      <input id="vaccinationDate2" class="swal2-small-input" type="date" placeholder="vaccination date" />
      <input id="manufacturer3" class="swal2-small-input" placeholder="manufacturer" /> /
      <input id="vaccinationDate3" class="swal2-small-input" type="date" placeholder="vaccination date" />
      <input id="manufacturer4" class="swal2-small-input" placeholder="manufacturer" /> /
      <input id="vaccinationDate4" class="swal2-small-input" type="date" placeholder="vaccination date" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const tz = document.getElementById('tz');
        const fName = document.getElementById('fName');
        const lName = document.getElementById('lName');
        const city = document.getElementById('city');
        const street = document.getElementById('street');
        const homeNumber = document.getElementById('homeNumber');
        const phone = document.getElementById('phone');
        const mobilePhone = document.getElementById('mobilePhone');
        const birthdate = document.getElementById('birthdate');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        const vaccination1={
          tz:document.getElementById('tz').value,
          manufacturer:document.getElementById('manufacturer1').value,
          date:document.getElementById('vaccinationDate1').value
        }
        const vaccination2={
          tz:document.getElementById('tz').value,
          manufacturer:document.getElementById('manufacturer2').value,
          date:document.getElementById('vaccinationDate2').value
        }
        const vaccination3={
          tz:document.getElementById('tz').value,
          manufacturer:document.getElementById('manufacturer3').value,
          date:document.getElementById('vaccinationDate3').value
        }
        const vaccination4={
          tz:document.getElementById('tz').value,
          manufacturer:document.getElementById('manufacturer4').value,
          date:document.getElementById('vaccinationDate4').value
        }
        const disease={
          tz: tz.value,
          dateOfIllness:startDate.value,
          dateOfRecovery:endDate.value
        }
        const user = {
          firstName: fName.value,
          lastName: lName.value,
          tz: tz.value,
          city: city.value,
          street: street.value,
          homeNumber: homeNumber.value,
          dateOfBirth: birthdate.value,
          phone: phone.value,
          mobilePhone:mobilePhone.value
        };
        console.log(user);
        //console.log(disease);
        return {user,disease,vaccination1,vaccination2,vaccination3,vaccination4};
      },
    }).then((result) => {
      AddUser(result.value.user,result.value.disease,result.value.vaccination1
        ,result.value.vaccination2,result.value.vaccination3,result.value.vaccination4)
      
    });


}
const openEditUserModal =async(userKey)=>{
    console.log(users_list[userKey].tz);
    const vaccinationResponse=await vaccinationService.getVaccination(users_list[userKey].tz)
    const vaccinationDetails=await vaccinationResponse.data.vaccination
    const vaccinationDetailsText = vaccinationDetails.map(vaccination => `
    date: ${vaccination.date}, manufacturer: ${vaccination.manufacturer}`);
    const diseasesResponse=await diseaseService.getDisease(users_list[userKey].tz)
    let dateOfIllness = '';
    let dateOfRecovery = '';
if (diseasesResponse.data.disease) {
dateOfIllness = diseasesResponse.data.disease.dateOfIllness.slice(0, 10) || '';
dateOfRecovery = diseasesResponse.data.disease.dateOfRecovery.slice(0, 10) || '';
}
  
     const user = users_list[userKey];
    // const dateString = user.birthdate;
    // const dateOnly = dateString.substring(0, 10);
    //    <input id="birthdate" class="swal2-small-input" type="date" value="${dateOnly}" />

  Swal.fire({
    title: 'update User',
    html: `
    <p id="tz" />${user.tz}</p>

    <div class="input-container">
    <label for="fName">First Name:</label>
    <input id="fName" class="swal2-small-input" value="${user.firstName}" />
    </div>

    <div class="input-container">
    <label for="lName">Last Name:</label>
    <input id="lName" class="swal2-small-input"value="${user.lastName}"" />
    </div>

    <div class="input-container">
    <label for="city">City:</label>
    <input id="city" class="swal2-small-input" value="${user.city}" />
    </div>
    <div class="input-container">
    <label for="street">Street:</label>
    <input id="street" class="swal2-small-input" value="${user.street}" />
    </div>
    <div class="input-container">

    <label for="homeNumber">homeNumber:</label>
    <input id="homeNumber" class="swal2-small-input" value="${user.homeNumber}" />
    </div>
    <div class="input-container">
    <label for="phone">phone:</label>
    <input id="phone" class="swal2-small-input" value="${user.phone}" />
    </div>
    <div class="input-container">
    <label for="mobilePhone">mobilePhone:</label>
    <input id="mobilePhone" class="swal2-small-input" value="${user.mobilePhone}" />
    </div>
   
    `,
    // <p>were you sick with corona? If so enter dates </p>
    // <input id="startDate" class="swal2-small-input" type="date" value="${dateOfIllness}" />
    // <input id="endDate" class="swal2-small-input" type="date" value="${dateOfRecovery} />
    // <p>Have you been vaccinated? If so, enter the manufacturer's name and vaccination date</p>
    // <input id="manufacturer1" class="swal2-small-input" placeholder="manufacturer" /> /
    // <input id="vaccinationDate1" class="swal2-small-input" type="date" placeholder="vaccination date" />
    // <input id="manufacturer2" class="swal2-small-input" placeholder="manufacturer" /> /
    // <input id="vaccinationDate2" class="swal2-small-input" type="date" placeholder="vaccination date" />
    // <input id="manufacturer3" class="swal2-small-input" placeholder="manufacturer" /> /
    // <input id="vaccinationDate3" class="swal2-small-input" type="date" placeholder="vaccination date" />
    // <input id="manufacturer4" class="swal2-small-input" placeholder="manufacturer" /> /
    //<input id="vaccinationDate4" class="swal2-small-input" type="date" placeholder="vaccination date" />
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const tz = document.getElementById('tz');
      const fName = document.getElementById('fName');
      const lName = document.getElementById('lName');
      const city = document.getElementById('city');
      const street = document.getElementById('street');
      const homeNumber = document.getElementById('homeNumber');
      const phone = document.getElementById('phone');
      const mobilePhone = document.getElementById('mobilePhone');
      const birthdate = document.getElementById('birthdate');
      const startDate = document.getElementById('startDate');
      const endDate = document.getElementById('endDate');
      const vaccination1={
        tz:document.getElementById('tz').value,
        manufacturer:document.getElementById('manufacturer1').value,
        date:document.getElementById('vaccinationDate1').value
      }
      const vaccination2={
        tz:document.getElementById('tz').value,
        manufacturer:document.getElementById('manufacturer2').value,
        date:document.getElementById('vaccinationDate2').value
      }
      const vaccination3={
        tz:document.getElementById('tz').value,
        manufacturer:document.getElementById('manufacturer3').value,
        date:document.getElementById('vaccinationDate3').value
      }
      const vaccination4={
        tz:document.getElementById('tz').value,
        manufacturer:document.getElementById('manufacturer4').value,
        date:document.getElementById('vaccinationDate4').value
      }
      const disease={
        tz: tz.value,
        dateOfIllness:startDate.value,
        dateOfRecovery:endDate.value
      }
      const user = {
        firstName: fName.value,
        lastName: lName.value,
        tz: user.tz,
        city: city.value,
        street: street.value,
        homeNumber: homeNumber.value,
        dateOfBirth: birthdate.value,
        phone: phone.value,
        mobilePhone:mobilePhone.value
      };
      console.log(user);
      return {user,disease,vaccination1,vaccination2,vaccination3,vaccination4};
    },
  }).then((result) => {
    editOneUser(result.user.tz,result.user)
  });
}

 useEffect(() => {
  getUsers()
}, [])
  async function getUsers() {
  const users= await userService.getAllUsers();
  setUsers_list(users);
  console.log(users);
}
return (
    <>
      <h1>list of our users: </h1>
      {users_list?.map((user, index) => (
        <User
          userKey={index}
          userData={user}
          onDelete={deleteOneUser}
          onEdit={openEditUserModal}
          onDetails={detailsOneUser}
        />
      ))} 
       
      <button onClick={openAddUserModal}>add user</button> 
    </>
  );
}

export default Users;
