import React, { useEffect, useState } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Card from './Card'
import axios from 'axios'
import { LoadScript } from 'react-load-script'
import { REACT_APP_BASE_URL } from '../config'

const Home = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        setScriptLoaded(true)
      }

      document.body.appendChild(script)
    }

    loadRazorpayScript()
  }, [])

  // const handleScriptLoad = () => {
  //     setScriptLoaded(true);
  // };

  const checkoutHandler = async amount => {
    if (scriptLoaded) {
      const {
        data: { key }
      } = await axios.get(`${REACT_APP_BASE_URL}/api/getkey`)
      console.log(key)
      const {
        data: { order }
      } = await axios.post(`${REACT_APP_BASE_URL}/api/checkout`, {
        amount
      })

      console.log(order)
      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: '6 Pack Programmer',
        description: 'Tutorial of RazorPay',
        image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
        order_id: order.id,
        callback_url:
          'https://felxiva-backend.onrender.com/api/paymentverification',
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#121212'
        }
      }
      const razor = new window.Razorpay(options)
      razor.open()
    } else {
      console.error('Failed to load Razorpay script')
    }
    // razor.createPayment(options)
  }

  return (
    <Box>
      {/* <LoadScript
                url="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={handleScriptLoad}
            /> */}

      <Stack
        h={'100vh'}
        alignItems='center'
        justifyContent='center'
        direction={['column', 'row']}
      >
        <Card
          amount={5000}
          img={
            'https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png'
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img={
            'http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b'
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  )
}

export default Home
