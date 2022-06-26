import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { setToast } from "../../utils/extraFunctions";
import { isCheckoutFormEmpty, validateEmail, validateMobile, validatePinCode } from "../../utils/formValidator";
import { ContinueBtn } from "../../components/checkout/ContinueBtn";
import { shallowEqual, useSelector } from 'react-redux';
import { displayRazorpay } from "../payment/razorpay";


export const Checkout = () => {

    const { orderSummary, cartProducts } = useSelector((state) => state.cartReducer, shallowEqual);

    const initState = {
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        locality: "",
        pinCode: "",
        state: "",
        country: "",
        email: "",
        mobile: ""
    };

    const [form, setForm] = useState(initState);
    const toast = useToast();

    const handleInputChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // const isEmpty = isCheckoutFormEmpty(form);
        // if (!isEmpty.status) {
        //     return setToast(toast, isEmpty.message, 'error');
        // }

        // const isEmail = validateEmail(form.email);
        // if (!isEmail.status) {
        //     return setToast(toast, isEmail.message, 'error');
        // }

        // const isPinCode = validatePinCode(form.pinCode);
        // if (!isPinCode.status) {
        //     return setToast(toast, isPinCode.message, 'error');
        // }

        // const isMobile = validateMobile(form.mobile);
        // if (!isMobile.status) {
        //     return setToast(toast, isMobile.message, 'error');
        // }

        displayRazorpay(form, orderSummary.total);
        
        console.log(form);
    };



    return (
        <>
            <Box
                maxW={'500px'}
                m={'20px auto 80px'}
            >
                <Text
                    fontSize={'20px'}
                    fontWeight={600}
                    mb={'20px'}
                >
                    Enter your name and address:
                </Text>

                <form onSubmit={handleFormSubmit}>
                    <Flex flexDirection={'column'} gap={'20px'}>
                        <Input onChange={handleInputChange} type={'text'} name={'firstName'} placeholder={'First Name*'} />
                        <Input onChange={handleInputChange} type={'text'} name={'lastName'} placeholder={'Last Name*'} />
                        <Input onChange={handleInputChange} type={'text'} name={'addressLine1'} placeholder={'Address Line 1*'} />
                        <Input onChange={handleInputChange} type={'text'} name={'addressLine2'} placeholder={'Address Line 2'} />
                        <Flex gap={'20px'}>
                            <Input onChange={handleInputChange} type={'text'} name={'locality'} placeholder={'City/Locality*'} />
                            <Input onChange={handleInputChange} type={'number'} name={'pinCode'} placeholder={'Pin Code*'} />
                        </Flex>
                        <Flex gap={'20px'}>
                            <Input onChange={handleInputChange} type={'text'} name={'state'} placeholder={'State/Territory*'} />
                            <Input onChange={handleInputChange} type={'text'} name={'country'} placeholder={'Country*'} />
                        </Flex>
                        <Text fontSize={'20px'} fontWeight={600} mt={'30px'}>What's your contact information?</Text>
                        <Input onChange={handleInputChange} type={'email'} name={'email'} placeholder={'Email*'} />
                        <Input onChange={handleInputChange} type={'number'} name={'mobile'} placeholder={'Mobile*'} />

                        <ContinueBtn />
                    </Flex>
                </form>

            </Box>
        </>
    );
};