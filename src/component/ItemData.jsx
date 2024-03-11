import React from "react";

import {
    Card,
    Heading,
    Text,
    CardHeader,
    CardBody,
    Box,
    Flex,
    Spacer,
    CardFooter,
    Button,
    Divider,
} from "@chakra-ui/react";

import { useConvertToRupiah } from "../utils/useConvertToRupiah";
import { Domain } from "../setting/Domain";

const ItemData = ({
    data,
    setActiveModalEdit,
    getdataSumbangan,
    setIdDataSumbangan,
}) => {
    const uang = useConvertToRupiah(data.uang);

    const getOneDataSumbangan = (id) => {
        setIdDataSumbangan(id);
        setActiveModalEdit(true);
    };

    const hapusDataSumbangan = async (id) => {
        const confirm = window.confirm("Yakin mau menghapus data ini?");

        if (confirm) {
            try {
                let response = await fetch(
                    `${Domain}/api/sumbanganPesta/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                let getData = await response.json();

                console.log(getData);

                if (response.status == 200) {
                    getdataSumbangan();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Card variant="elevated" maxWidth="lg" mb="5">
            <CardHeader>
                <Heading size="md">{data.nama_tamu}</Heading>
            </CardHeader>
            <CardBody>
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Uang</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{"Rp." + uang}</Text>
                    </Box>
                </Flex>
                <Divider />
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Kopi</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.kopi + " Bks"}</Text>
                    </Box>
                </Flex>
                <Divider />
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Jenis Kopi</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.jenis_kopi}</Text>
                    </Box>
                </Flex>
                <Divider />
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Gula</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.gula + " Kg"}</Text>
                    </Box>
                </Flex>
                <Divider />
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Beras</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.beras + " Kg"}</Text>
                    </Box>
                </Flex>
                <Divider />
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Jenis Beras</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.jenis_beras}</Text>
                    </Box>
                </Flex>
                <Flex mb='2'>
                    <Box flex="1" mr="3">
                        <Text>Amplop</Text>
                    </Box>
                    <Spacer />
                    <Box flex="1">
                        <Text>{data.amplop}</Text>
                    </Box>
                </Flex>
            </CardBody>
            <CardFooter>
                <Flex width="100%">
                    <Button
                        onClick={() =>
                            getOneDataSumbangan(data.id_data_sumbangan)
                        }
                        colorScheme="green"
                    >
                        Edit
                    </Button>
                    <Spacer />
                    <Button
                        onClick={() =>
                            hapusDataSumbangan(data.id_data_sumbangan)
                        }
                        colorScheme="red"
                    >
                        Hapus
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
};

export default ItemData;
