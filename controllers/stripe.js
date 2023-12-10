const express = require('express');
const router = express.Router();
const Stripe = require("stripe")
require('dotenv').config();
const zlib = require('zlib');

const stripe = Stripe(process.env.STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => {
  const cartValue = req.body.cartItems.map((item) => item.id)

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(cartValue),
    },
  })
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: 'INR',
        product_data: {
          name: item.title,
          images: [item.img],
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'INR',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 69 * 100,
            currency: 'INR',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 3,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true
    },
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,

    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
});

// sripe webhook
let endpointSecret;
endpointSecret = "whsec_2a84f856a6d80410c9151e7fadcfdaff29cb2b5dc88c2e0cc0550eddf0f73fa7";

router.post('/webhook', express.json({ type: 'application/json' }), (request, response) => {
  const sig = request.get('stripe-signature');
  let data;
  let eventType;
  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log('event', event);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.body.data.object
    eventType = event.body.type
  }
  else {
    data = request.body.data.object
    eventType = request.body.type
  }


  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          // CREATE ORDER
          console.log('coustomer',customer);
          console.log('data',data);
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



module.exports = router;