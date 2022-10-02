import { Center, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

interface INumberPickerProps {
    options: any[];
    initialValue?: number;
}
export function VerticalCarousel({ options, initialValue = 0 }: INumberPickerProps): JSX.Element {
    const [selected, setSelected] = useState(initialValue);
    const nextVal = mod(selected + 1, options.length);
    const prevVal = mod(selected - 1, options.length);
    console.log(-1 % 9);
    return (
        <VStack style={{ perspective: "200px" }}>
            {options.length > 1 ? (
                <Option
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSelected(prevVal);
                    }}
                    value={options[prevVal]}
                    position="top"
                ></Option>
            ) : (
                <></>
            )}
            <Option
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                value={options[selected]}
                position={"center"}
            ></Option>
            {options.length > 2 ? (
                <Option
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSelected(nextVal);
                    }}
                    value={options[nextVal]}
                    position={"bottom"}
                ></Option>
            ) : (
                <></>
            )}
        </VStack>
    );
}

interface IOptionProps {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    value: any;
    position: "top" | "center" | "bottom";
}
function Option({ onClick, value, position }: IOptionProps): JSX.Element {
    let transform = "";
    switch (position) {
        case "top":
            transform = "rotateX(15deg)";
            break;
        case "center":
            transform = "";
            break;
        case "bottom":
            transform = "rotateX(-15deg)";
            break;
        default:
            break;
    }
    return (
        <Center
            bg={position === "center" ? "gray.100" : "gray.50"}
            p={2}
            minW="3rem"
            rounded="md"
            onClick={onClick}
            cursor="pointer"
            transform={transform}
            opacity={position === "center" ? "1" : "0.75"}
            color={"gray.700"}
            _hover={{ bg: position === "center" ? "gray.200" : "gray.100" }}
            _active={{ bg: position === "center" ? "gray.300" : "gray.200" }}
        >
            <Text fontWeight={"medium"} fontSize={"xl"} userSelect={"none"}>
                {value}
            </Text>
        </Center>
    );
}
