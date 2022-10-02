import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext } from "react";
import { DatePickerContext, DatePickerState } from "../DatetimePicker";

export function DateHeader(): JSX.Element {
    const {
        pickerState: { displayedDate },
        setPickerState,
    } = useContext(DatePickerContext);
    const subMonth = () => {
        setPickerState((prev: DatePickerState): DatePickerState => {
            return {
                ...prev,
                displayedDate: dayjs(prev.displayedDate).subtract(1, "month").toDate(),
            };
        });
    };
    const addMonth = () => {
        setPickerState((prev: DatePickerState): DatePickerState => {
            return {
                ...prev,
                displayedDate: dayjs(prev.displayedDate).add(1, "month").toDate(),
            };
        });
    };
    return (
        <HStack role="group">
            <Button
                size="xs"
                opacity={0}
                _groupHover={{ opacity: 1 }}
                variant={"ghost"}
                onClick={subMonth}
            >
                <ArrowBackIcon></ArrowBackIcon>
            </Button>
            <Text w="16ch" textAlign="center" fontWeight="medium">
                {dayjs(displayedDate).format("MMMM YYYY")}
            </Text>
            <Button
                size="xs"
                opacity={0}
                _groupHover={{ opacity: 1 }}
                variant={"ghost"}
                onClick={addMonth}
            >
                <ArrowForwardIcon></ArrowForwardIcon>
            </Button>
        </HStack>
    );
}
