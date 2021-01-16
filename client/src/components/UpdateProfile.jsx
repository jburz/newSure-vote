// import React, { Component } from 'react';
// import Employees from './Employees';
// import Button from './Button';

// // Create class Component using state to hold employee data
// class UpdateProfile extends Component {
//   state = {
//     columns: [
//       {
//         label: "First Name",
//         field: "first-name"
//       },
//       {
//         label: "Last Name",
//         field: "last-name"
//       },
//       {
//         label: "Street Address",
//         field: "street-address"
//       },
//       {
//         label: "City",
//         field: "city"
//       },
//       {
//         label: "State",
//         field: "state"
//       },
//       {
//         label: "Zip Code",
//         field: "zip-code"
//       },
//     ],
//     rows: Employees
//   }

//   // A function that handles the button click to 'Add Employee'
//   // Gets employee data based on ID and assigns a value
//   buttonClick = e => {
//     this.addEmployee(
//       document.getElementById("first-name").value,
//       document.getElementById("last-name").value,
//       document.getElementById("street-address").value,
//       document.getElementById("city").value,
//       document.getElementById("state").value,
//       document.getElementById("zip-code").value
//     )
//     // Clears input value once it's been submitted
//     document.getElementById("first-name").value = "";
//     document.getElementById("last-name").value = "";
//     document.getElementById("street-address").value = "";
//     document.getElementById("city").value = "";
//     document.getElementById("state").value = "";
//     document.getElementById("zip-code").value = "";
//   };

//   // Create addEmployee function and pass through data.Make sure that all fields are validated by sending an error message if not
//   addEmployee = (name, position, office, age, date, salary) => {
//     if (name === "" || position === "" || office === "" || age === "" || date === "" || salary === "") {
//       alert("Missing required fields!")
//       return;
//     }

//     Employees.push({
//       name: name,
//       position: position,
//       office: office,
//       age: age,
//       date: date,
//       salary: salary
//     })

//     this.setState({ rows: Employees });
//   };

//   render() {
//     return (
//       <div>
//         <Button />
//         <MDBDataTable
//           striped
//           small
//           data={this.state}
//           entriesOptions={[10, 20, 30]}
//           sorting={"true"}
//         />

//         <div className="modal fade" id="employeeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">
//                   Enter Employee Details:</h5>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                   <span className="color2" aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form action="">
//                   <ul>
//                     <li>
//                       <label className="mr-3">Name</label>
//                       <input id="name" type="text" placeholder="Full Name"></input>
//                     </li>
//                     <li>
//                       <label className="mr-3">Position</label>
//                       <input id="position" type="text" placeholder="Position"></input>
//                     </li>
//                     <li>
//                       <label className="mr-3">Office</label>
//                       <input id="office" type="text" placeholder="Office"></input>
//                     </li>
//                     <li>
//                       <label className="mr-3">Age</label>
//                       <input id="age" type="text" placeholder="Age"></input>
//                     </li>
//                     <li>
//                       <label className="mr-3">Start Date</label>
//                       <input id="date" type="text" placeholder="Date"></input>
//                     </li>
//                     <li>
//                       <label className="mr-3">Salary</label>
//                       <input id="salary" type="text" placeholder="Salary"></input>
//                     </li>
//                   </ul>
//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   onClick={this.buttonClick}
//                   id="add-employee" type="button" className="btn btn-outline-dark" data-dismiss="modal">Add</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   };

// };

// export default UpdateProfile;