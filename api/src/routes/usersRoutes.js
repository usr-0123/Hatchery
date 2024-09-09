import { Router } from 'express';
import { deleteUserController, fechUserbylocationController, fechUserbyMembershipdateController, fechUserbyPhoneNumberController, fechUserbyUserEmailController, fechUserbyUserIdController, fechUserbyUsernameController, fechUserbyUserStreetController, fetchUsersController, loginUserController, registerUserController, updateUserDetailsController } from '../controllers/usersControllers.js';
import { verifyTokenMiddleware } from '../middlewares/authMiddlewares.js';

const userRoutes = Router();

userRoutes.post('/user/register', registerUserController);
userRoutes.post('/user/login', loginUserController);
userRoutes.get('/users/all', verifyTokenMiddleware, fetchUsersController);
userRoutes.get('/users/street/:street', verifyTokenMiddleware, fechUserbyUserStreetController);
userRoutes.get('/users/location/:location', verifyTokenMiddleware, fechUserbylocationController);
userRoutes.get('/users/membership_date/:membershipDate', verifyTokenMiddleware, fechUserbyMembershipdateController);
userRoutes.get('/user/user_id/:userId', verifyTokenMiddleware, fechUserbyUserIdController);
userRoutes.get('/user/email/:userEmail', verifyTokenMiddleware, fechUserbyUserEmailController);
userRoutes.get('/user/username/:userName', verifyTokenMiddleware, fechUserbyUsernameController);
userRoutes.get('/user/phone_number/:userPhoneNumber', verifyTokenMiddleware, fechUserbyPhoneNumberController);
userRoutes.patch('/user/update/:editorId/:userId', verifyTokenMiddleware, updateUserDetailsController);
userRoutes.delete('/user/delete/:editorId/:userId', verifyTokenMiddleware, deleteUserController);

export default userRoutes;