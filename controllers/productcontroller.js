var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
var users = require('../models/user')
var verifyToken = require('../middleware/verifytokenuser');

router.get('/list', async function(req, res, next){
    try{
        //   const data = await brand.find({"is_delete":0}).populate('userId',{name:1}).sort({"createdAt":-1}).exec();
        const products =[
            {
                id: 1,
                title: "Sparx Mens Sm-649 Sports Shoes",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 900,
                quantity: 1,
                // img:"https://source.unsplash.com/collection/928424/480x480"
                img:"https://m.media-amazon.com/images/I/81GSeDCrzlL._UX625_.jpg"
              },
              {
                id: 2,
                title: "Sparx Mens Sm-648 Sneaker",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 800,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/4131tNs9rDL.jpg"
              },
              {
                id: 3,
                title: "Sparx mens Sd9039g Sneakers",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, est at venenatis consectetur, ipsum est tincidunt libero, in ullamcorper dolor odio at enim. Sed eget sapien metus. Nullam eget volutpat arcu, non luctus odio. Fusce tincidunt, risus vel viverra auctor, justo odio scelerisque metus, eu vulputate quam velit id purus. Fusce at odio vel nisl vulputate sollicitudin. Sed a tortor auctor, varius leo eget, scelerisque sapien. Cras ut sapien erat. Vivamus a magna at urna blandit volutpat nec et lectus. Integer eu mi ligula.Nunc pharetra velit eget justo viverra, eget vulputate eros efficitur. Curabitur venenatis felis a nulla condimentum scelerisque. Suspendisse ut justo eget tellus dictum bibendum. Integer eu erat lacinia, vestibulum massa ac, cursus tellus. Etiam malesuada augue in elit iaculis congue. Pellentesque",
                price: 400,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/71thnf-l9sL._UX695_.jpg"
              },
              {
                id: 4,
                title: "Sparx Mens Sm-737Sneaker",
                description:"High Quality Synthetic Leather as upper material and TPR & EVA as sole material.",
                price: 895,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/71GjwDRsO8L._SX695_.jpg"
              },
              {
                id: 5,
                title: "ASIAN Men's White Casual Sneaker",
                description:"High-Neck Shoes with Lightweight Extra Cushion Lace-Up Shoes for Men's Tarzan-11",
                price: 759,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg"
              },
              {
                id: 6,
                title: "Red Tape Casual Sneaker Shoes for Men ",
                description:" Enhanced Comfort with Cushioned Insole and Slip-Resistant",
                price: 1119,
                quantity: 1,
                img:"https://m.media-amazon.com/images/I/613JYxJjt2L._SY695_.jpg"
              },
        ]
        // res.send(products)
        return res.status(200).json({ success:'Data found', data:products });
    }catch(err){
      return res.status(500).json({ errors: err });
    }
});

module.exports = router;