import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, SimpleGrid, Badge, Flex, useDisclosure } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import axios from 'axios'
import { UserContext } from './AuthProvider'



const BookingRoom = () => {
    const [showStandard, setShowStandard] = useState(false)
    const [showDeluxe, setShowDeluxe] = useState(false)
    const [standardRoomsLeft, setStandardRoomsLeft] = useState()
    const [deluxeRoomsLeft, setDeluxeRoomsLeft] = useState()
    const { SetRoomType } = useContext(UserContext)

    const displayStandard = () => {
        showStandard ? setShowStandard(false) : setShowStandard(true)
    }

    const displayDeluxe = () => {
        showDeluxe ? setShowDeluxe(false) : setShowDeluxe(true)
    }

    useEffect(() => {
        axios
            .get("/api/booking")
            .then((res) => {
                setStandardRoomsLeft(res.data["Standard Rooms Left"])
                setDeluxeRoomsLeft(res.data["Deluxe Rooms Left"])
            }
            )
            .catch((err) => {
                console.log("Server responded with error: ", err)
            })
    }, [standardRoomsLeft, deluxeRoomsLeft])


    return (
        <div>
            <h4>Select Room </h4>
            <br></br>
            <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            objectFit='cover'
                            boxSize={'350px'}
                            src='./StandardRoom.jpeg'
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='4'>
                            <Heading
                                size='md'
                                textTransform={'uppercase'}
                                fontSize={'19px'}
                                fontWeight={'bold'}
                                color='pink.600'
                            >
                                Standard Room &bull; House B
                            </Heading>
                            <Text mt={2} fontSize='large' fontWeight={'semibold'} lineHeight={1.5}>
                                Modern, newly renovated standard sized room, nature view, 1 - 2 persons
                            </Text>
                            <Flex align={'baseline'}>
                                <Badge colorScheme="red">Popular</Badge>
                                <Badge colorScheme="blue" ml={2}>Private Bathroom</Badge>
                            </Flex>
                            <Flex align={'baseline'}>
                                <Badge colorScheme="green">{standardRoomsLeft} room left!</Badge>
                            </Flex>
                            <Text fontSize='m' mt={2}>
                                300,000 IDR / Night
                            </Text>
                            <Flex align={'baseline'} >
                                <Button onClick={displayStandard}>
                                    {showStandard ? 'Less' : 'More'} Info
                                </Button>
                            </Flex>
                            <Collapse in={showStandard} animateOpacity>
                                <List spacing={3} p={1} fontSize={'m'}>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Assumenda, quia temporibus eveniet a libero incidunt suscipit
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={MdCheckCircle} color='green.500' />
                                        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                    </ListItem>
                                    {/* You can also use custom icons from react-icons */}
                                    <ListItem>
                                        <ListIcon as={MdSettings} color='green.500' />
                                        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Stack>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2' w={'100%'}>
                            <Button variant='outline' colorScheme='blue' w={'100%'} onClick={() => SetRoomType("Standard Room")}>
                                Book Now
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            src='./DeluxeRoom.jpeg'
                            boxSize={'350px'}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='4'>
                            <Heading
                                size='md'
                                textTransform={'uppercase'}
                                fontSize={'19px'}
                                fontWeight={'bold'}
                                color='pink.600'
                            >
                                Deluxe Room &bull; House B
                            </Heading>
                            <Text mt={2} fontSize='large' fontWeight={'semibold'} lineHeight={1.5}>
                                Family sized bedroom, balcony, nature view, 3 - 4 persons
                            </Text>
                            <Flex align={'baseline'}>
                                <Badge colorScheme="red">Popular</Badge>
                                <Badge colorScheme="blue" ml={2}>Private Bathroom</Badge>
                            </Flex>
                            <Flex align={'baseline'}>
                                <Badge colorScheme="green">{deluxeRoomsLeft} room left!</Badge>
                            </Flex>
                            <Text>
                                600,000 IDR / Night
                            </Text>
                            <Flex align={'baseline'} >
                                <Button onClick={displayDeluxe}>
                                    {showDeluxe ? 'Less' : 'More'} Info
                                </Button>
                            </Flex>
                            <Collapse in={showDeluxe} animateOpacity>
                                Testing the collapse feature for web
                            </Collapse>
                        </Stack>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2' w={'100%'}>
                            <Button variant='outline' colorScheme='blue' w={'100%'}  >
                                Book Now
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            src='./BunkBedRoom.jpeg'
                            boxSize={'350px'}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='4'>
                            <Heading
                                size='md'
                                textTransform={'uppercase'}
                                fontSize={'19px'}
                                fontWeight={'bold'}
                                color='pink.600'
                            >
                                Saver Space Room &bull; House D
                            </Heading>
                            <Text mt={2} fontSize='large' fontWeight={'semibold'} lineHeight={1.5}>
                                Bunk Bed, upper window, 1 - 2 persons
                            </Text>
                            <Flex align={'baseline'}>
                                <Badge colorScheme="green">Saver</Badge>
                                <Badge colorScheme="blue" ml={2}>Shared Bathroom</Badge>
                            </Flex>
                            <Text>
                                200,000 IDR / Night
                            </Text>
                        </Stack>
                    </CardBody>
                    <CardFooter>
                        <ButtonGroup spacing='2' w={'100%'}>
                            <Button variant='outline' colorScheme='blue' w={'100%'}  >
                                Book Now
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </div>
    )
}

export default BookingRoom;