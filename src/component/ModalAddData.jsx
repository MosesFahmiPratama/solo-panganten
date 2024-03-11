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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputGroup,
    InputRightAddon,
    Select,
    useDisclosure
} from "@chakra-ui/react";
import { Domain } from "../setting/Domain";
import { useConvertToRupiah } from "../utils/useConvertToRupiah";

const ModalAddData = ({ activeModalAdd, setActiveModalAdd, getdataSumbangan }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formattedMoneyInput, setFormattedMoneyInput] = useState("");

    const handleOffModalActive = () => {
        onClose();
        setActiveModalAdd(false);
    }

    useEffect(() => {
        if (activeModalAdd) {
            onOpen();
            setActiveModalAdd(true);
        }else{
            onClose();
            setActiveModalAdd(false);
        }
    }, [activeModalAdd])

    const formRef = useRef(null);

    const handleMoneyInputChange = (event) => {
        const enteredPhoneNumber = event.target.value.replace(/\D/g, '');

        const formattedNumber = Number(enteredPhoneNumber).toLocaleString('id-ID', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

        setFormattedMoneyInput(formattedNumber);
    };

    const addDataSumbangan = async (event) => {
        event.preventDefault();

        const dataForm = new FormData(formRef.current);
        try {
            let response = await fetch(`${Domain}/api/sumbanganPesta`, {
                method: "POST",
                body: dataForm,
            });

            let getData = await response.json();

            if (response.status == 201) {
                getdataSumbangan();
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
                    <form onSubmit={addDataSumbangan} action="" ref={formRef}>
                        <ModalHeader>Tambah Data</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired mb="3">
                                <FormLabel>Nama Tamu</FormLabel>
                                <Input
                                    name="nama_tamu"
                                    placeholder="Nama Tamu"
                                />
                            </FormControl>
                            <FormControl mb="3">
                                <FormLabel>Duit</FormLabel>
                                <Input
                                    name="uang"
                                    placeholder="Masukan jumlah uang"
                                    onChange={handleMoneyInputChange}
                                    value={formattedMoneyInput}
                                />
                            </FormControl>
                            <FormControl mb="3">
                                <FormLabel>Kopi</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type="text"
                                        placeholder="Jumlah Kopi"
                                        name="kopi"
                                    />
                                    <InputRightAddon>Bks</InputRightAddon>
                                </InputGroup>
                                <InputGroup size="md" mt="2">
                                    <Select
                                        name="jenis_kopi"
                                        placeholder="Jenis Kopi"
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
                            <FormControl mb="3">
                                <FormLabel>Gula Pasir</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        name="gula"
                                        type="text"
                                        placeholder="Gula"
                                    />
                                    <InputRightAddon>Kg</InputRightAddon>
                                </InputGroup>
                            </FormControl>
                            <FormControl mb="3">
                                <FormLabel>Beras</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        name="beras"
                                        type="number"
                                        placeholder="Beras"
                                    />
                                    <InputRightAddon>Kg</InputRightAddon>
                                </InputGroup>
                                <InputGroup size="md" mt="2">
                                    <Select
                                        name="jenis_beras"
                                        placeholder="Jenis Beras"
                                    >
                                        <option value="Sunguh">Sunguh</option>
                                        <option value="Poek">Poek</option>
                                        <option value="Biasa">Biasa</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <FormControl mb="3">
                                <FormLabel>Amplop</FormLabel>
                                <Input
                                    name="amplop"
                                    type="number"
                                    placeholder="Masukan dalam bentuk angka"
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme="blue">
                                Simpan
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalAddData;
