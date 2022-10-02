import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext } from "react";
import { DatePickerContext } from "../DatetimePicker";

export function TimeHeader(): JSX.Element {
    const {
        pickerState: { selectedDate },
    } = useContext(DatePickerContext);

    return (
        <Box>
            <Text fontSize={"lg"} textAlign="center" fontWeight="medium">
                {dayjs(selectedDate).format("HH:mm A")}
            </Text>
        </Box>
    );
}
