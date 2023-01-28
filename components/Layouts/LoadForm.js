import React from 'react'
import {
    Box,
    SkeletonCircle,
    SkeletonText,
    useColorModeValue

} from '@chakra-ui/react'

const LoadForm = () => {
    return (
        <Box
            padding='6'
            boxShadow='xl'
            rounded='md'
            mt={6}
            bg={useColorModeValue('gray.800', 'gray.50')}
            color={useColorModeValue('black', 'white')}
        >
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' />
        </Box>
    )
}

export default LoadForm