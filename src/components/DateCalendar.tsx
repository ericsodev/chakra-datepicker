import { Box, Center, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { DatePickerContext } from "../DatetimePicker";
import { WeekRow } from "./WeekRow";

export function DateCalendar(): JSX.Element {
    return (
        <Flex w="full" direction={"column"} alignItems="center">
            <HStack w="full" mb="1rem">
                {Array.from(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], (day: string) => (
                    <Text
                        key={`calendar-heading-${day}`}
                        w="2rem"
                        textAlign={"center"}
                        color="gray.500"
                        fontWeight={"medium"}
                    >
                        {day}
                    </Text>
                ))}
            </HStack>
            <VStack gap="0.05rem">
                {Array.from({ length: 6 }, (_, i) => {
                    return <WeekRow week={i} key={`week-row-${i}`}></WeekRow>;
                })}
            </VStack>
        </Flex>
    );
}
