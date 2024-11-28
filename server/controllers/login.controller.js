const User = require('../models/user.model');
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Admin = require('../models/admin.model');
const UsageLogs = require('../models/usageLogs.model')
require('dotenv').config();
// const io = require('../server'); 
// const UsageLogs = require('../models/usageLogs.model');
// // You can now use `io` in your loan controller for emitting events
// // Handle socket connection
// io.on('connection', (socket) => {
//     console.log('A user connected in loan controller');
//   });
  
//   // Function to log usage events
//   const logUsageEvent = async (userId, action, details) => {
//     const logEntry = new UsageLogs({
//       userId,
//       action,
//       details,
//       timestamp: new Date()
//     });
//     await logEntry.save();
//   };

// const getProducts = async(req,res) =>{
//     try{
//         const products = await Product.find({});
//         res.status(200).json(products);
//     } catch (error){
//         res.status(500).json({message: error.message});
//         //send(error);
//     }
// }

// const getProduct = async (req,res) =>{
//     try{
//         //params sina url id to id var da hppaga DB product.findById(var id ) do search twrga product ta hppga respond json file da product to display twba
//         const {id} = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);
//     }catch{
//         res.status(500).json({message: error.message});
//     }
// }
// const updateProduct =  async (req,res) => {
//     try{
//         const {id} = req.params;
//         // id search twrga user input hppe product var da hpkhi aduda product tudei singaga updatedProduct hpchilla show twba
//         const product =  await Product.findByIdAndUpdate(id, req.body);
//         if(!product){
//             res.status(404).json({message: 'Product not Found'})
//         }
        
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);
//     }catch (error){
//         res.status(500).json({message: error.message});
//     }
// }

// const deleteProduct = async (req, res) =>{
//     try{
//         const {id} = req.params;

//         const product = await Product.findByIdAndDelete(id);
//         if(!product){
//             res.status(404).jsan({message: "404 Page not found"})
//         }

//         res.status(200).json({message: "Product deleted"})

//     }catch (error){
//         res.status(500).json({message: error-message});
//     }
// }
//-------Registration
const createUser = async(req,res) =>{
   try{
       //    const createUser = await user.create(req.body);
       //    res.status(200).json(createUser);
        //const hashpassword = await bcryptjs.hashSync(req.body.password,10);
        const newUser = new User({
            name: req.body.name,
            enrollmentId: req.body.enrollmentId,
            email: req.body.email,
            password: req.body.password,
            //contact: req.body.contact
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
        console.log(savedUser);
    } catch (error){
        res.status(500).json({message: error.message});
        //send(error);
    }
}

const loginUser = async (req, res) => {
    const { enrollmentId, password } = req.body;
    
    try {
      // Find user by email
      //console.log(fcmToken)
      console.log(enrollmentId)
      const user = await User.findOne( {enrollmentId});
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        
        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password'} );
        }
        // Optional: Validate FCM token (if needed, using Firebase Admin SDK)
        //if (!fcmToken) {
        //    return res.status(400).send({ message: 'FCM token is required' });
        //}

        // Update user's FCM token in the database
        //user.fcmToken = fcmToken; // Ensure the user schema includes an `fcmToken` field
        //await user.save();
        // Generate token
        // Optional: Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, enrollmentId: user.enrollmentId,username: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '4h' } // Token expiration time
        );
        await UsageLogs.create({
            userId: user.enrollmentId,
            name: user.name,
            action: 'Student logged in',
            timestamp: new Date(),
          });
        
        console.log(user.enrollmentId)
    // Log usage event
    //await logUsageEvent(user._id, 'login', `Username: ${user.name}`);

   
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(400).json({ message: 'Admin not found' });
      }

      // Check if password matches
      const isMatch = await bcryptjs.compare(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: admin._id, email: admin.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token valid for 1 hour
      );

      // Respond with token and admin details
      return res.status(200).json({
          message: 'Login successful',
          token,
          admin: {
              id: admin._id,
              name: admin.name,
              email: admin.email,
          },
      });
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
    // getProducts,
    // getProduct,
    // deleteProduct,
    // updateProduct
    createUser,
    loginUser,
    loginAdmin
}
