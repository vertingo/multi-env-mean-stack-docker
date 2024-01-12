const { User } = require('../models/user.model');
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Role = require('../lib/role')
const UserController = require('../controllers/user');
const GainController = require('../controllers/gain');
const { LimitRequests } = require ('../middleware/limit-requests')



//get all users
router.get("/",  UserController.getAllUsers);

//get user by id
router.get('/:id',  UserController.getUserById);
// router.get('/:id', authorize([Role.Client,Role.Employee,Role.Admin]), UserController.getUserById);

//delete user by id
router.delete('/:id', UserController.deleteUserById);

//patch by id
router.patch('/:id',  UserController.patchUserById)
// router.patch('/:id', authorize([Role.Client,Role.Employee,Role.Admin]), UserController.patchUserById)

//post code gain
// router.post('/gain', authorize(Role.Client), GainController.gain);
router.post('/gain', GainController.gain);


module.exports = router; 









// <div class="container navtop">

// <h2 class="text-center titre font-weight-bold"><b> Tour du véhicule</b></h2>


// <div class=" row justify-content-center mt-3 ">
//   <div class="col-10 col-md-6">
//   <img [src]="img" class="img-fluid" alt="clem">
// </div>
// </div>


// <div class=" row justify-content-center mt-3 ">
//   <h3 class="col-7 col-md-4 text-center txt font-weight-bold" style="color: red;">
//     Veuillez sélectionner les éléments accidentés :</h3>
// </div>




//           <!-- zone 1 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 1</b></h3>
//       <li *ngFor="let item of zone1">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>

//           <!-- zone 2 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 2</b></h3>
//       <li *ngFor="let item of zone2">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>

//           <!-- zone 3 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 3</b></h3>
//       <li *ngFor="let item of zone3">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>

//            <!-- zone 4 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 4</b></h3>
//       <li *ngFor="let item of zone4">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>

//     <!-- zone 5 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 5</b></h3>
//       <li *ngFor="let item of zone5">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>


//     <!-- zone 6 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 6</b></h3>
//       <li *ngFor="let item of zone6">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>

//     <!-- zone 7 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 7</b></h3>
//       <li *ngFor="let item of zone7">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>


//     <!-- zone 8 -->
//     <ul>
//       <h3 class="titre font-weight-bold zone"><b>ZONE 8</b></h3>
//       <li *ngFor="let item of zone8">
//         <mat-checkbox [(ngModel)]="item.checked">
//           {{item.name}}
//         </mat-checkbox>
//       </li>
//     </ul>






// <div class=" row justify-content-center mt-3 mb-5">
//   <button class="col-8 col-md-4" mat-raised-button color="primary" (click)="sendCheck()">
//     <b> Valider</b></button>
// </div>






// </div>


