import React, { useEffect, useRef, useState } from "react";

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    useDisclosure,
} from "@chakra-ui/react";
import { Domain } from "../setting/Domain";

const DATA_EDIT = {
    nama_tamu: "",
    uang: "",
    kopi: "",
    jenis_kopi: "",
    gula: "",
    beras: "",
    jenis_beras: "",
};

const ModalEditData = ({
    activeModalEdit,
    setActiveModalEdit,
    getDataSumbangan,
    idDataSumbangan,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOffModalActive = () => {
        onClose();
        setActiveModalEdit(false);
    };

    useEffect(() => {
        getOneDataSumbangan(idDataSumbangan);

        if (activeModalEdit) {
            onOpen();
            setActiveModalEdit(true);
        } else {
            onClose();
            setActiveModalEdit(false);
        }
    }, [activeModalEdit]);

    const [dataEdit, setDataEdit] = useState(DATA_EDIT);

    const handleChange = (e) => {
        if (e.target.name == "uang") {
            const enteredPhoneNumber = e.target.value.replace(/\D/g, "");

            const formattedNumber = Number(enteredPhoneNumber).toLocaleString(
                "id-ID",
                {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                }
            );
            setDataEdit({ ...dataEdit, [e.target.name]: formattedNumber });
        } else {
            setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
        }
    };

    const getOneDataSumbangan = async () => {
        try {
            let response = await fetch(
                `${Domain}/API/sumbanganPesta/${idDataSumbangan}`,
                {
                    method: "GET",
                }
            );

            let getData = await response.json();

            if (response.status == 200) {
                setDataEdit(getData.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formRef = useRef(null);

    const editDataSumbangan = async (event) => {
        event.preventDefault();

        try {
            let response = await fetch(
                `${Domain}/API/sumbanganPesta/${idDataSumbangan}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataEdit),
                    // body: dataForm,
                }
            );

            let getData = await response.json();

            if (response.status == 200) {
                getDataSumbangan();
                handleOffModalActive();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => handleOffModalActive()}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={editDataSumbangan} action="" ref={formRef}>
                        <ModalHeader>Edit Data</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel>Nama Tamu</FormLabel>
                                <Input
                                    name="nama_tamu"
                                    placeholder="Nama Tamu"
                                    value={dataEdit && dataEdit.nama_tamu}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Duit</FormLabel>
                                <Input
                                    name="uang"
                                    placeholder="Masukan jumlah uang"
                                    value={dataEdit && dataEdit.uang}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Kopi</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type="number"
                                        placeholder="Jumlah Kopi"
                                        name="kopi"
                                        value={dataEdit && dataEdit.kopi}
                                        onChange={handleChange}
                                    />
                                    <InputRightAddon>Bks</InputRightAddon>
                                </InputGroup>
                                <InputGroup size="md" mt="2">
                                    <Select
                                        name="jenis_kopi"
                                        placeholder="Jenis Kopi"
                                        value={dataEdit && dataEdit.jenis_kopi}
                                        onChange={handleChange}
                                    >
                                        <option value="Jangkar">Jangkar</option>
                                        <option value="Layang Merah">
                                            Layang Merah
                                        </option>
                                        <option value="Layang Biru">
                                            Layang Biru
                                        </option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gula Pasir</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        name="gula"
                                        type="number"
                                        step="0.01"
                                        placeholder="Gula"
                                        value={dataEdit && dataEdit.gula}
                                        onChange={handleChange}
                                    />
                                    <InputRightAddon>Kg</InputRightAddon>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Beras</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        name="beras"
                                        type="number"
                                        step="0.01"
                                        placeholder="Beras"
                                        value={dataEdit && dataEdit.beras}
                                        onChange={handleChange}
                                    />
                                    <InputRightAddon>Kg</InputRightAddon>
                                </InputGroup>
                                <InputGroup size="md" mt="2">
                                    <Select
                                        name="jenis_beras"
                                        placeholder="Jenis Beras"
                                        value={dataEdit && dataEdit.jenis_beras}
                                        onChange={handleChange}
                                    >
                                        <option value="Sunguh">Sunguh</option>
                                        <option value="Poek">Poek</option>
                                        <option value="Biasa">Biasa</option>
                                    </Select>
                                </InputGroup>
                            </FormControl><FormControl mb="3">
                                <FormLabel>Amplop</FormLabel>
                                <Input
                                    name="amplop"
                                    type="number"
                                    placeholder="Masukan dalam bentuk angka"
                                    value={dataEdit && dataEdit.amplop}
                                    onChange={handleChange}
                                />
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme="blue">
                                Update
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalEditData;
