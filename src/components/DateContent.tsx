import { TimeIcon } from "@chakra-ui/icons";
import { Button, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { DatePickerContext, DatePickerState } from "../DatetimePicker";
import { DateCalendar } from "./DateCalendar";
import { DateHeader } from "./DateHeader";

export function DateContent(): JSX.Element {
    const {
        pickerState: { showTime },
        setPickerState,
    } = useContext(DatePickerContext);
    return (
        <VStack p={2} gap={2}>
            <DateHeader></DateHeader>
            <DateCalendar></DateCalendar>

            {showTime ? (
                <Button
                    size={"sm"}
                    variant={"outline"}
                    rightIcon={<TimeIcon></TimeIcon>}
                    onClick={() => {
                        setPickerState((prev: DatePickerState) => {
                            return { ...prev, page: "time" };
                        });
                    }}
                >
                    Edit Time
                </Button>
            ) : (
                <></>
            )}
        </VStack>
    );
}
