import React, { useEffect, useState } from "react";
import { Container, Box, Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { IoPrintOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import ModalAddData from "../component/ModalAddData";
import ItemData from "../component/ItemData";
import ModalEditData from "../component/ModalEditData";
import { Domain } from "../setting/Domain";

const Data = () => {
    const [activeModalAdd, setActiveModalAdd] = useState(false);
    const [activeModalEdit, setActiveModalEdit] = useState();
    const [dataSumbangan, setDataSumbangan] = useState([]);
    const [idDataSumbangan, setIdDataSumbangan] = useState();

    const getdataSumbangan = async () => {
        try {
            let response = await fetch(
                `${Domain}/api/sumbanganPesta`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let getData = await response.json();

            setDataSumbangan(getData.data_sumbangan);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getdataSumbangan();
    }, []);

    const printSumbangan = () => {
        window.location.href = `${Domain}/api/print-sumbangan`;
    }

    return (
        <Container maxW="md" centerContent>
            <Box w="100%" padding="4" textAlign="center">
                <Heading>Sumbangan Panganten</Heading>
            </Box>
            <Flex justifyContent='space-between' padding="4" w='100%'>
                <Button
                    onClick={() => setActiveModalAdd(true)}
                    colorScheme="blue"
                >
                    Add
                </Button>
                <IconButton
                    onClick={() => printSumbangan()}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Call Sage"
                    fontSize="20px"
                    icon={<IoPrintOutline />}
                />
            </Flex>
            <Box>
                {dataSumbangan.map((item, index) => (
                    <div key={index}>
                        <ItemData
                            data={item}
                            setActiveModalEdit={setActiveModalEdit}
                            getdataSumbangan={getdataSumbangan}
                            setIdDataSumbangan={setIdDataSumbangan}
                        />
                    </div>
                ))}
            </Box>
            <ModalEditData
                activeModalEdit={activeModalEdit}
                setActiveModalEdit={setActiveModalEdit}
                getDataSumbangan={getdataSumbangan}
                idDataSumbangan={idDataSumbangan}
            />
            <ModalAddData
                activeModalAdd={activeModalAdd}
                setActiveModalAdd={setActiveModalAdd}
                getdataSumbangan={getdataSumbangan}
            />
        </Container>
    );
};

export default Data;
