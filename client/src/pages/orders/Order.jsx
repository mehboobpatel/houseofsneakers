import { Box, Center, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import { OrderAddress } from "../../components/orders/OrderAddress";
import { Loading } from "../../components/loading/Loading";
import { Error } from "../../components/loading/Error";
import { Summary } from "../../components/orders/Summary";
import { OrderBox } from "../../components/orders/OrderBox";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";


export const Order = () => {

    const token = useSelector((state) => state.authReducer.token);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);


    const handleOrdersGetRequest = async (token) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('/order', { headers: { 'Authorization': `Bearer ${token}` } });
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
        }
    };

    useEffect(() => {
        handleOrdersGetRequest(token);
    }, [token]);


    return isLoading ? (
        <Loading />
    ) : isError ? (
        <Error />
    ) : (
        <>
            <Box px={'20px'}>
                <Flex justify={'space-between'} maxW={1200} m={'20px auto'}>
                    <Center>
                        <Text fontWeight={600} fontSize={['20px', '25px']}>Orders &nbsp;</Text>
                        <Text fontSize={['16px', '20px']}> ({data.length})</Text>
                    </Center>
                </Flex>

                <Box maxW={1200} m={'40px auto'}>
                    {data.map((item) => (
                        
                        <Box key={item._id}>

                            <Grid
                                templateColumns={['100%', '100%', '48% 48%', '32% 31% 33%', '31% 30% 31%']}
                                gap={['20px', '20px', '4%', '2%', '4%']}
                            >

                                <Box py={'15px'} px={'25px'}>
                                    <Text fontSize={'20px'} fontWeight={600}>Ordered Items</Text>
                                    <Divider mb={'20px'} />

                                    {item.cartProducts.map((product) => (
                                        <OrderBox key={product._id} {...product} />
                                    ))}

                                </Box>

                                <OrderAddress  {...item.shippingDetails} />

                                <Summary
                                    createdAt={item.createdAt}
                                    {...item.paymentDetails}
                                    {...item.orderSummary}
                                />

                            </Grid>

                            <Divider my={'30px'} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};